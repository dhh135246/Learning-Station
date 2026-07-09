/**
 * 歌词打字机与文本解析器模块
 */

let parsedSentences = [];
let currentSentenceIndex = 0;
let totalTypedChars = 0;

function init_parser() {
  // 模块重置
  parsedSentences = [];
  currentSentenceIndex = 0;
  totalTypedChars = 0;
}

// 加载示例歌词
function loadSampleLyrics() {
  const sample = `天体観測 (BUMP OF CHICKEN)
午前二時 フミキリに 望远镜を担いでった
ベルトに结んだラジオ 雨は降らないらしい
二分後に君が来たら 履いてきた长靴
何の話をしようかな`;
  const textarea = document.getElementById('parser-raw-text');
  if (textarea) textarea.value = sample.trim();
}

function startTextParsing() {
  const textVal = document.getElementById('parser-raw-text').value.trim();
  if (!textVal) {
    alert('请先输入内容！');
    return;
  }

  // 过滤掉空白行，按换行切分
  parsedSentences = textVal.split('\n').map(s => s.trim()).filter(s => s.length > 0);
  
  if (parsedSentences.length === 0) {
    alert('未能提取出有效段落！');
    return;
  }

  currentSentenceIndex = 0;
  totalTypedChars = 0;

  document.getElementById('parser-input-box').style.display = 'none';
  document.getElementById('parser-typing-box').style.display = 'flex';
  
  loadTypingSentence();
  extractWordsFromText(textVal);
}

function loadTypingSentence() {
  if (currentSentenceIndex >= parsedSentences.length) {
    // 扫落漫天夜樱雨粒子，并奏响悠雅的和风古琴声
    if (typeof window.SakuraEffect !== 'undefined') window.SakuraEffect.shower(5000);
    if (typeof window.WafuuAudio !== 'undefined') window.WafuuAudio.playKotoVictory();

    setTimeout(() => {
      alert('恭喜你，完成了整篇文本的打字和朗读练习！🌸');
      exitTypingTrack();
    }, 250);
    return;
  }

  const target = parsedSentences[currentSentenceIndex];
  document.getElementById('typing-target-sentence').innerText = target;
  document.getElementById('typing-sentence-index').innerText = `${currentSentenceIndex + 1} / ${parsedSentences.length}`;
  
  const input = document.getElementById('typing-input-field');
  input.value = '';
  input.style.borderColor = 'rgba(255,255,255,0.1)';
  document.getElementById('typing-stat-match').innerText = '0%';
  
  // 自动播放语音
  if (window.AudioCenter) window.AudioCenter.speak(target);
  input.focus();
}

function playCurrentSentenceVoice() {
  const target = parsedSentences[currentSentenceIndex];
  if (target && window.AudioCenter) window.AudioCenter.speak(target);
}

// 判定打字匹配进度
function checkTypingProgress() {
  const target = parsedSentences[currentSentenceIndex];
  const inputVal = document.getElementById('typing-input-field').value;
  const matchPercentEl = document.getElementById('typing-stat-match');
  
  // 计算匹配前缀相似度
  let matchCount = 0;
  const minLen = Math.min(target.length, inputVal.length);
  for (let i = 0; i < minLen; i++) {
    if (target[i] === inputVal[i]) matchCount++;
  }

  const percent = target.length > 0 ? Math.round((matchCount / target.length) * 100) : 0;
  matchPercentEl.innerText = `${percent}%`;

  const inputField = document.getElementById('typing-input-field');
  if (inputVal === target) {
    inputField.style.borderColor = 'var(--color-success)';
  } else if (percent > 50) {
    inputField.style.borderColor = 'var(--color-primary)';
  } else {
    inputField.style.borderColor = 'rgba(255,255,255,0.1)';
  }
}

function handleTypingKeyDown(e) {
  if (e.key === 'Enter') {
    const target = parsedSentences[currentSentenceIndex];
    const inputVal = document.getElementById('typing-input-field').value.trim();

    if (inputVal === target.trim()) {
      totalTypedChars += target.length;
      document.getElementById('typing-stat-chars').innerText = totalTypedChars;
      
      // 单句打字完美匹配：播放一记清脆的和风敲竹声 (Bamboo strike)
      if (typeof window.WafuuAudio !== 'undefined') {
        window.WafuuAudio.playBamboo();
      }

      currentSentenceIndex++;
      loadTypingSentence();
    } else {
      // 若不一致，按下 Enter 播放发音辅助听写
      playCurrentSentenceVoice();
    }
  }
}

function exitTypingTrack() {
  document.getElementById('parser-input-box').style.display = 'block';
  document.getElementById('parser-typing-box').style.display = 'none';
}

// 智能分词生词提取逻辑
function extractWordsFromText(text) {
  const container = document.getElementById('extracted-words-container');
  if (!container) return;
  container.innerHTML = '';

  // 调用轻量级分词引擎进行分词及词库碰撞
  if (typeof window.JapaneseTokenizer === 'undefined') return;
  const extractedList = window.JapaneseTokenizer.tokenizeAndExtract(text);

  const extractedSection = document.getElementById('extracted-section');
  if (extractedList.length === 0) {
    if (extractedSection) extractedSection.style.display = 'none';
    return;
  }

  if (extractedSection) extractedSection.style.display = 'block';

  // 渲染提取到的生词添加面板
  extractedList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'extracted-card';
    
    // 如果是词库已收录的词，提供视觉徽章反馈
    const badgeHtml = item.exists 
      ? `<span style="font-size:0.75rem; padding:1px 6px; border-radius:4px; background:rgba(58, 142, 92, 0.15); color:var(--color-success); font-weight:bold; margin-left:6px;">已匹配</span>` 
      : ``;

    card.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 0.5rem">
        <span style="font-size:1.3rem; font-weight:800; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
          ${item.word}
          <button class="dict-search-btn" onclick="openWafuuDict('${item.word}')" title="使用沙盒词典查询" style="margin-left:2px; font-size:0.85rem">🔍</button>
        </span>
        ${badgeHtml}
      </div>
      <div>
        <input type="text" placeholder="纯假名读音(例：ともだち)" class="input-field" style="padding:0.4rem; font-size:0.85rem;" id="ext-read-${item.word}" value="${item.kana}">
      </div>
      <div>
        <input type="text" placeholder="中文解释(例：朋友)" class="input-field" style="padding:0.4rem; font-size:0.85rem;" id="ext-mean-${item.word}" value="${item.meaning}">
      </div>
      <button class="btn-outline" style="padding:0.4rem; font-size:0.85rem; width:100%" onclick="addExtractedWordToVocab('${item.word}')">${item.exists ? '同步至单词本' : '加入单词本'}</button>
    `;
    container.appendChild(card);
    
    // 对读音输入框进行罗马字转换绑定，录入无匹配单词时也无需开启系统日语输入法！
    const extReadInput = document.getElementById(`ext-read-${item.word}`);
    if (extReadInput && typeof window.RomajiConverter !== 'undefined') {
      window.RomajiConverter.bind(extReadInput, 'hira');
    }
  });
}

function addExtractedWordToVocab(word) {
  const reading = document.getElementById(`ext-read-${word}`).value.trim();
  const meaning = document.getElementById(`ext-mean-${word}`).value.trim();

  if (!reading || !meaning) {
    alert('请先填写读音与释义！');
    return;
  }

  const list = JSON.parse(localStorage.getItem('vocab_list') || '[]');
  
  // 查重
  if (list.some(i => i.word === word)) {
    alert('该单词已在单词本中！');
    return;
  }

  list.push({
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    word: word,
    kana: reading,
    meaning: meaning,
    category: 'custom',
    srs: {
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReviewDate: Date.now()
    }
  });

  localStorage.setItem('vocab_list', JSON.stringify(list));
  alert(`【${word}】成功加入单词本！`);
  if (window.updateDashboardStats) window.updateDashboardStats();
}

// 挂载到全局 window 命名空间以支持 HTML 行内事件与跨模块访问
window.init_parser = init_parser;
window.loadSampleLyrics = loadSampleLyrics;
window.startTextParsing = startTextParsing;
window.loadTypingSentence = loadTypingSentence;
window.playCurrentSentenceVoice = playCurrentSentenceVoice;
window.checkTypingProgress = checkTypingProgress;
window.handleTypingKeyDown = handleTypingKeyDown;
window.exitTypingTrack = exitTypingTrack;
window.addExtractedWordToVocab = addExtractedWordToVocab;
