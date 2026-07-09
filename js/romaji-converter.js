/**
 * 日本語学習ステーション - 罗马字 ➔ 假名 实时转换引擎
 * Romaji-to-Kana Converter (Pure JS, Offline-friendly)
 */

(function() {
  // 1. 全量罗马字到平假名的映射字典
  const ROMAJI_TO_HIRA = {
    "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",
    
    "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
    "sa": "さ", "shi": "し", "si": "し", "su": "す", "se": "せ", "so": "そ",
    "ta": "た", "chi": "ち", "ti": "ち", "tsu": "つ", "tu": "つ", "te": "て", "to": "と",
    "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
    "ha": "は", "hi": "ひ", "fu": "ふ", "hu": "ふ", "he": "へ", "ho": "ほ",
    "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "模", // 修正 "mo": "も"
    "mo": "も", "ya": "や", "yu": "ゆ", "yo": "よ",
    "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
    "wa": "わ", "wo": "を", "nn": "ん", "n": "ん",
    
    // 浊音与半浊音
    "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
    "za": "ざ", "ji": "じ", "zi": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
    "da": "だ", "di": "ぢ", "du": "づ", "de": "で", "do": "ど",
    "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",
    "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",
    
    // 拗音 (三字符 & 双字符)
    "kya": "きゃ", "kyu": "きゅ", "kyo": "きょ",
    "sha": "しゃ", "shu": "しゅ", "sho": "しょ",
    "sya": "しゃ", "syu": "しゅ", "syo": "しょ",
    "cha": "ちゃ", "chu": "ちゅ", "cho": "ちょ",
    "tya": "ちゃ", "tyu": "ちゅ", "tyo": "ちょ",
    "nya": "にゃ", "nyu": "にゅ", "nyo": "にょ",
    "hya": "ひゃ", "hyu": "ひゅ", "hyo": "ひょ",
    "mya": "みゃ", "myu": "みゅ", "myo": "みょ",
    "rya": "りゃ", "ryu": "りゅ", "ryo": "りょ",
    
    "gya": "ぎゃ", "gyu": "ぎゅ", "gyo": "ぎょ",
    "zya": "じゃ", "zyu": "じゅ", "zyo": "じょ",
    "ja": "じゃ", "ju": "じゅ", "jo": "じょ",
    "bya": "びゃ", "byu": "びゅ", "byo": "びょ",
    "pya": "ぴゃ", "pyu": "ぴゅ", "pyo": "ぴょ",
    
    // 额外极少用变体与小假名
    "dya": "ぢゃ", "dyu": "ぢゅ", "dyo": "ぢょ",
    "la": "ぁ", "li": "ぃ", "lu": "ぅ", "le": "ぇ", "lo": "ぉ",
    "xa": "ぁ", "xi": "ぃ", "xu": "ぅ", "xe": "ぇ", "xo": "ぉ",
    "lya": "ゃ", "lyu": "ゅ", "lyo": "ょ",
    "xya": "ゃ", "xyu": "ゅ", "xyo": "ょ",
    "ltu": "っ", "xtu": "っ", "ltsu": "っ", "xtsu": "っ",
    "-": "ー"
  };

  // 2. 平假名转片假名映射算法 (Unicode 偏移 0x60)
  function hiraToKata(str) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
      const chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
  }

  // 3. 核心转换分析算法 (带促音及 n 延迟匹配)
  function convertRomajiToKana(text, toKatakana = false) {
    let result = "";
    let i = 0;
    const len = text.length;
    
    const vowels = ['a', 'i', 'u', 'e', 'o'];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'm', 'p', 'r', 's', 't', 'w', 'x', 'y', 'z'];
    
    while (i < len) {
      // A. 处理促音 (双写非n的辅音)
      if (i + 1 < len) {
        const char1 = text[i].toLowerCase();
        const char2 = text[i + 1].toLowerCase();
        if (char1 === char2 && consonants.includes(char1) && char1 !== 'n') {
          result += toKatakana ? "ッ" : "っ";
          i++; // 跳过第一个辅音，剩下的一个辅音交由后续处理
          continue;
        }
      }
      
      // B. 贪婪匹配：尝试匹配 3、2、1 长度的罗马字
      let matched = false;
      for (let l = 3; l >= 1; l--) {
        if (i + l <= len) {
          const chunk = text.substring(i, i + l).toLowerCase();
          
          // 特殊处理单字母 'n'
          if (chunk === 'n') {
            // 如果 n 处在最后一个，保留不转，防止用户想拼 na, ni
            if (i + 1 === len) {
              result += text[i];
              matched = true;
              i++;
              break;
            } else {
              // 后面还有字母
              const nextChar = text[i + 1].toLowerCase();
              // 如果后面是元音或 y，保留 n 留给较长项 (如 na, nyu)
              if (vowels.includes(nextChar) || nextChar === 'y') {
                continue;
              } else {
                // 如果后面跟着其他辅音，此时末尾 n 可确定为 拨音 ん
                result += toKatakana ? "ン" : "ん";
                matched = true;
                i++;
                break;
              }
            }
          }
          
          // 常规映射表字典匹配
          if (chunk in ROMAJI_TO_HIRA) {
            let kana = ROMAJI_TO_HIRA[chunk];
            if (toKatakana) {
              kana = hiraToKata(kana);
            }
            result += kana;
            matched = true;
            i += l;
            break;
          }
        }
      }
      
      // C. 未匹配的英文字符、标点或中文，原样穿透
      if (!matched) {
        result += text[i];
        i++;
      }
    }
    return result;
  }

  // 4. 清脆的 Web Audio API 蜂鸣音效
  function playBeep(freq, duration) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("提示音播放失败:", e);
    }
  }

  // 5. 绑定器对外暴露对象
  const RomajiConverter = {
    // 核心转换接口
    convert(text, mode = 'hira') {
      if (mode === 'raw') return text;
      return convertRomajiToKana(text, mode === 'kata');
    },

    // 绑定至指定 HTMLInputElement
    bind(inputElement, defaultMode = 'hira') {
      if (!inputElement || inputElement._romajiBound) return;
      
      // A. 创建外包裹层以进行和纸指示徽章的定位
      const wrapper = document.createElement('div');
      wrapper.className = 'romaji-input-wrapper';
      wrapper.style.position = 'relative';
      
      // 智能检测与继承布局样式，防止破坏 Flex / Grid 或居中对齐
      const computedStyle = window.getComputedStyle(inputElement);
      
      // 继承 display 模式
      wrapper.style.display = computedStyle.display === 'block' ? 'block' : 'inline-block';
      
      // 继承宽度 (若无显式宽度则默认 100% 铺满)
      wrapper.style.width = inputElement.style.width || '100%';
      if (computedStyle.maxWidth && computedStyle.maxWidth !== 'none') {
        wrapper.style.maxWidth = computedStyle.maxWidth;
      }
      if (computedStyle.minWidth && computedStyle.minWidth !== 'none') {
        wrapper.style.minWidth = computedStyle.minWidth;
      }
      
      // 继承 flex 伸缩属性 (针对 Flex 布局容器下的 input，如 RPG 容器中的 input)
      const flexGrow = computedStyle.flexGrow;
      const flexShrink = computedStyle.flexShrink;
      const flexBasis = computedStyle.flexBasis;
      if (flexGrow !== '0' || flexShrink !== '1' || flexBasis !== 'auto') {
        wrapper.style.flexGrow = flexGrow;
        wrapper.style.flexShrink = flexShrink;
        wrapper.style.flexBasis = flexBasis;
      }
      
      // 继承外边距 margin，消减 input 本身的外边距防止双重留白
      wrapper.style.margin = computedStyle.margin;
      
      // 节点移位：在 input 的原位置插入 wrapper，并将 input 置于其内部
      inputElement.parentNode.insertBefore(wrapper, inputElement);
      wrapper.appendChild(inputElement);
      
      // input 内部铺满并清空 margin
      inputElement.style.margin = '0';
      inputElement.style.width = '100%';
      inputElement.style.maxWidth = '100%';
      
      // 调整 input 本身的 padding 防止被右侧绝对定位 of Badge 遮挡
      inputElement.style.paddingRight = '48px';
      
      // 设置模式
      inputElement.dataset.romajiMode = defaultMode;
      inputElement._romajiBound = true;
      
      // B. 动态创建状态切换 Badge
      const badge = document.createElement('button');
      badge.type = 'button';
      badge.className = 'romaji-status-badge';
      badge.tabIndex = -1; // 避免 tab 键聚焦到徽章上
      wrapper.appendChild(badge);
      
      function updateBadgeUI() {
        const mode = inputElement.dataset.romajiMode;
        if (mode === 'hira') {
          badge.innerText = 'あ';
          badge.title = '当前输入模式: 平假名 [Alt+Q 切换]';
          badge.style.color = 'var(--color-primary)';
          badge.style.borderColor = 'var(--color-primary)';
          badge.style.background = 'rgba(184, 62, 56, 0.05)';
        } else if (mode === 'kata') {
          badge.innerText = 'ア';
          badge.title = '当前输入模式: 片假名 [Alt+Q 切换]';
          badge.style.color = 'var(--color-accent)';
          badge.style.borderColor = 'var(--color-accent)';
          badge.style.background = 'rgba(255, 0, 127, 0.05)';
        } else {
          badge.innerText = 'A';
          badge.title = '当前输入模式: 英文/原始罗马字 [Alt+Q 切换]';
          badge.style.color = 'var(--color-text-muted)';
          badge.style.borderColor = 'var(--color-text-muted)';
          badge.style.background = 'rgba(255, 255, 255, 0.05)';
        }
      }
      
      // 循环切换模式
      function toggleMode(withSound = true) {
        const current = inputElement.dataset.romajiMode;
        let next = 'hira';
        let beepFreq = 880;
        
        if (current === 'hira') {
          next = 'kata';
          beepFreq = 1046; // 高音 C6
        } else if (current === 'kata') {
          next = 'raw';
          beepFreq = 554;  // 低音 C#5
        } else {
          next = 'hira';
          beepFreq = 880;  // 标准音 A5
        }
        
        inputElement.dataset.romajiMode = next;
        updateBadgeUI();
        
        if (withSound) {
          playBeep(beepFreq, 0.08);
        }
        
        // 模式切换后，主动触发一次输入转换，让框里的拼音立刻变假名
        triggerConversion();
        inputElement.focus();
      }
      
      badge.onclick = (e) => {
        e.preventDefault();
        toggleMode(true);
      };
      
      // C. 核心输入拦截与光标位置保持
      function triggerConversion() {
        if (inputElement._converting) return;
        
        const mode = inputElement.dataset.romajiMode;
        if (mode === 'raw') return;
        
        inputElement._converting = true;
        const val = inputElement.value;
        const isKata = mode === 'kata';
        const converted = convertRomajiToKana(val, isKata);
        
        if (converted !== val) {
          const caretPos = inputElement.selectionStart;
          const beforeCaret = val.substring(0, caretPos);
          const convertedBeforeCaret = convertRomajiToKana(beforeCaret, isKata);
          
          inputElement.value = converted;
          
          const newCaretPos = convertedBeforeCaret.length;
          inputElement.setSelectionRange(newCaretPos, newCaretPos);
          
          // 向上派发原生事件，以便兼容 checkTypingProgress 等 oninput 判定函数
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
        inputElement._converting = false;
      }
      
      inputElement.addEventListener('input', triggerConversion);
      
      // D. 失焦 (blur) / 回车 (Enter) 时收尾补全单字母 'n' -> 'ん'
      function finalizePendingN() {
        const mode = inputElement.dataset.romajiMode;
        if (mode === 'raw') return;
        
        let val = inputElement.value;
        if (val.toLowerCase().endsWith('n')) {
          const isKata = mode === 'kata';
          val = val.substring(0, val.length - 1) + (isKata ? 'ン' : 'ん');
          inputElement.value = val;
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      
      inputElement.addEventListener('blur', finalizePendingN);
      
      inputElement.addEventListener('keydown', function(e) {
        // 快捷键: Alt + Q 或 Ctrl + M 切换模式
        if ((e.altKey && e.key.toLowerCase() === 'q') || (e.ctrlKey && e.key.toLowerCase() === 'm')) {
          e.preventDefault();
          toggleMode(true);
        }
        
        // 如果按了回车，在触动判定前先补齐末尾残留的 n
        if (e.key === 'Enter') {
          finalizePendingN();
          
          // 若为 RPG 拼写框，按回车直接触发攻击，提高流畅度
          if (inputElement.id === 'rpg-typed-ans' && typeof window.submitRpgSpelling === 'function') {
            e.preventDefault();
            window.submitRpgSpelling();
          }
        }
      });
      
      // 初始化徽章界面
      updateBadgeUI();
    }
  };

  // 挂载到 window 全局变量，供外部 HTML 进行一键调用
  window.RomajiConverter = RomajiConverter;
})();
