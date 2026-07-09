/**
 * 日本語学習ステーション - 词库与规则混合分词引擎
 * Japanese Tokenizer & Word Extractor (Pure JS, Offline-friendly)
 */

(function() {
  // 停用词集：常见无实质意义的助词、虚词、代词、单字符等，避免干扰候选生词
  const STOPWORDS = new Set([
    'は', 'が', 'を', 'に', 'へ', 'で', 'と', 'て', 'の', 'も', 'か', 'よ', 'ね', 'から', 'まで',
    'だ', 'です', 'ある', 'いる', 'する', 'いる', 'きた', 'いく', 'ない', 'これ', 'それ', 'あれ',
    'この', 'その', 'あの', '私', '僕', '俺', '君', 'あなた', '彼', '彼女', 'たち', 'もの', 'こと',
    'よう', 'そう', 'こう', 'どう', 'まし', 'ます', 'た', 'て', 'で', 'り', 'し', 'れ', 'る', 'う', 'お'
  ]);

  // Trie (前缀树) 节点定义
  class TrieNode {
    constructor() {
      this.children = {};
      this.isWord = false;
      this.wordData = null; // 存储该单词在词库中的详情 (kana, meaning, category 等)
    }
  }

  class DictionaryTrie {
    constructor() {
      this.root = new TrieNode();
    }

    // 插入单词
    insert(word, data) {
      if (!word) return;
      let node = this.root;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isWord = true;
      node.wordData = data;
    }

    // 正向最大匹配搜索
    findLongestMatch(text, startIndex) {
      let node = this.root;
      let longestWord = "";
      let longestData = null;
      let currentWord = "";
      
      for (let i = startIndex; i < text.length; i++) {
        const char = text[i];
        if (node.children[char]) {
          currentWord += char;
          node = node.children[char];
          if (node.isWord) {
            longestWord = currentWord;
            longestData = node.wordData;
          }
        } else {
          break;
        }
      }
      return longestWord ? { word: longestWord, data: longestData } : null;
    }
  }

  const JapaneseTokenizer = {
    trie: null,
    dictionaryLoaded: false,

    // 初始化/重新加载词库 Trie 树
    initTrie() {
      this.trie = new DictionaryTrie();
      
      // 1. 读取系统当前的全部生词库 (包括默认装填的 500+ 和用户自定义的词)
      const list = JSON.parse(localStorage.getItem('vocab_list') || '[]');
      list.forEach(item => {
        if (item.word) {
          this.trie.insert(item.word.trim(), item);
        }
      });
      
      // 2. 如果 localStorage 暂时为空，作为后备读取 DEFAULT_VOCABULARY
      if (list.length === 0 && typeof window.DEFAULT_VOCABULARY !== 'undefined') {
        window.DEFAULT_VOCABULARY.forEach(item => {
          this.trie.insert(item.word.trim(), item);
        });
      }
      this.dictionaryLoaded = true;
    },

    // 使用 Trie 树正向最大匹配 (FMM) 对句子进行分词
    segment(text) {
      if (!this.dictionaryLoaded) this.initTrie();
      
      const words = [];
      let i = 0;
      const len = text.length;

      while (i < len) {
        const match = this.trie.findLongestMatch(text, i);
        if (match) {
          words.push(match.word);
          i += match.word.length;
        } else {
          // 未匹配到，按单字符滑行
          words.push(text[i]);
          i++;
        }
      }
      return words;
    },

    // 精准提取并匹配候选词
    tokenizeAndExtract(text) {
      // 保证 Trie 树加载了最新词汇
      this.initTrie();

      const candidates = new Map(); // 用 Map 去重，Key 为词组

      // A. 正则提取：
      // 1. 汉字+送假名组合 (例如: 食べる, 勉強)
      const kanjiRegex = /[一-龠]+[ぁ-ん]*/g;
      let match;
      while ((match = kanjiRegex.exec(text)) !== null) {
        const word = match[0].trim();
        // 剔除单字 (如 “私” 或单汉字，主要为了初学者能多记词组；且单字通常会被 STOPWORDS 过滤)
        if (word.length >= 2 && !STOPWORDS.has(word)) {
          candidates.set(word, { word: word, kana: "", meaning: "", exists: false });
        }
      }

      // 2. 连续的片假名块 (外来语，例如: スローライフ, テレビ)
      const kataRegex = /[\u30A1-\u30F6ー]+/g;
      while ((match = kataRegex.exec(text)) !== null) {
        const word = match[0].trim();
        if (word.length >= 2 && !STOPWORDS.has(word)) {
          candidates.set(word, { word: word, kana: "", meaning: "", exists: false });
        }
      }

      // B. 词库正向最大匹配提取：
      // 如果歌词里有词库里包含的纯平假名高频词 (如 ありがとう)，通过 Trie 也能切分并提取出来
      let i = 0;
      const len = text.length;
      while (i < len) {
        const match = this.trie.findLongestMatch(text, i);
        if (match) {
          const word = match.word.trim();
          if (word.length >= 2 && !STOPWORDS.has(word)) {
            candidates.set(word, { word: word, kana: "", meaning: "", exists: false });
          }
          i += match.word.length;
        } else {
          i++;
        }
      }

      // C. 本地字典碰撞与自动补全
      const list = JSON.parse(localStorage.getItem('vocab_list') || '[]');
      const backupDict = (typeof window.DEFAULT_VOCABULARY !== 'undefined') ? window.DEFAULT_VOCABULARY : [];
      
      const resultList = [];
      candidates.forEach((val, key) => {
        // 先在用户生词本里查
        let found = list.find(item => item.word === key);
        // 如果没找到，去静态预置词库查
        if (!found) {
          found = backupDict.find(item => item.word === key);
        }

        if (found) {
          val.kana = found.kana;
          val.meaning = found.meaning;
          val.exists = true; // 标识词库中已存在该词，前台展示时可以提示用户
        }
        resultList.push(val);
      });

      // 限制返回数量 (最多24个，防止太长的歌词导致卡片铺满)
      return resultList.slice(0, 24);
    }
  };

  // 挂载到全局
  window.JapaneseTokenizer = JapaneseTokenizer;
})();
