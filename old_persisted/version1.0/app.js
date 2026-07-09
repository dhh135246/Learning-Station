// 日语学习系统业务逻辑与交互 (app.js)

// 1. 初始化应用状态
let appState = {
  streak: 0,
  learnedWords: [], // 存放掌握的单词拼写
  learnedGrammars: [], // 存放掌握的语法ID
  completedTypingCount: 0,
  lastCheckInDate: null,
  currentMode: 'fragment', // 'fragment' 或 'intensive'
  
  // 打字练习状态
  typingIndex: 0,
  typingTypedCount: 0,
  typingErrorsCount: 0,
  typingStartTime: null,
  typingExpectedRomaji: '',
  
  // 50音测试状态
  quizAnswer: ''
};

// 2. 页面加载与数据绑定
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromLocalStorage();
  initNavigation();
  initModeSelector();
  updateDashboardStats();
  renderTodoList();
  
  // 渲染各个模块
  renderGojuonGrid('hiragana');
  renderGrammarList('all');
  renderVocabGrid('all');
  renderResourcesGrid();
  
  // 初始化打字练习
  initTypingPractice();
  
  // 注册全局事件
  document.getElementById('btn-complete-today').addEventListener('click', handleCheckIn);
  document.getElementById('btn-kana-quiz').addEventListener('click', openKanaQuiz);
  document.getElementById('btn-close-quiz').addEventListener('click', closeKanaQuiz);
  document.getElementById('btn-next-typing').addEventListener('click', skipTypingSentence);
});

// 3. 状态读取与保存
function loadStateFromLocalStorage() {
  const saved = localStorage.getItem('agy_japanese_learning_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appState = { ...appState, ...parsed };
    } catch (e) {
      console.error('读取本地进度出错:', e);
    }
  }
}

function saveStateToLocalStorage() {
  localStorage.setItem('agy_japanese_learning_state', JSON.stringify(appState));
  updateDashboardStats();
}

// 4. 导航切换逻辑
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      
      navItems.forEach(nav => nav.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      item.classList.add('active');
      const targetSection = document.getElementById(targetTab);
      if (targetSection) {
        targetSection.classList.add('active');
      }
      
      // 如果切到打字练习，自动聚焦输入框
      if (targetTab === 'typing') {
        setTimeout(() => {
          document.getElementById('typing-input').focus();
        }, 100);
      }
    });
  });
}

// 5. 模式选择与今日清单
function initModeSelector() {
  const btnFragment = document.getElementById('btn-mode-fragment');
  const btnIntensive = document.getElementById('btn-mode-intensive');
  
  btnFragment.addEventListener('click', () => {
    appState.currentMode = 'fragment';
    btnFragment.classList.add('active');
    btnIntensive.classList.remove('active');
    renderTodoList();
    saveStateToLocalStorage();
  });
  
  btnIntensive.addEventListener('click', () => {
    appState.currentMode = 'intensive';
    btnIntensive.classList.add('active');
    btnFragment.classList.remove('active');
    renderTodoList();
    saveStateToLocalStorage();
  });
}

function renderTodoList() {
  const container = document.getElementById('todo-list-container');
  container.innerHTML = '';
  
  const fragmentTasks = [
    { text: '在「输入练习」中敲完 3 句日语经典台词', time: '10分钟' },
    { text: '利用「単語帳」翻卡学习 15 个词汇', time: '10分钟' },
    { text: '在「語法工房」精读 1 个初级语法点', time: '5分钟' },
    { text: '进行一次「50音道场」快速自测', time: '5分钟' }
  ];
  
  const intensiveTasks = [
    { text: '精学 3 个核心语法，抄写并理解其接续逻辑', time: '40分钟' },
    { text: '结合《蓝色监狱》或轻小说精读，积累并查阅 20 个生词', time: '45分钟' },
    { text: '进行 20 分钟的高速罗马字键入特训，重点练习促音与长音', time: '20分钟' },
    { text: '使用在线声调辞典(OJAD)朗读并跟读动漫经典片段', time: '15分钟' }
  ];
  
  const currentTasks = appState.currentMode === 'fragment' ? fragmentTasks : intensiveTasks;
  
  currentTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" id="todo-${index}">
      <span class="todo-text">
        ${task.text}
        <span class="todo-time-badge">${task.time}</span>
      </span>
    `;
    container.appendChild(li);
  });
}

function updateDashboardStats() {
  document.getElementById('stat-streak').innerText = appState.streak;
  document.getElementById('stat-words').innerText = appState.learnedWords.length;
  document.getElementById('stat-grammar').innerText = appState.learnedGrammars.length;
  document.getElementById('stat-typing').innerText = appState.completedTypingCount;
}

// 今日打卡逻辑
function handleCheckIn() {
  const todayStr = new Date().toDateString();
  if (appState.lastCheckInDate === todayStr) {
    alert('你今天已经打过卡啦！明天再来吧，干得漂亮！');
    return;
  }
  
  // 检查是否所有任务都勾选了
  const checkboxes = document.querySelectorAll('.todo-checkbox');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  
  if (!allChecked) {
    if (!confirm('你还有任务没有勾选，确定要直接完成今日打卡吗？')) {
      return;
    }
  }
  
  appState.streak += 1;
  appState.lastCheckInDate = todayStr;
  saveStateToLocalStorage();
  
  alert('🎉 打卡成功！连续学习天数 +1。继续保持！');
}

// 6. 五十音道场逻辑
function renderGojuonGrid(type) {
  const container = document.getElementById('gojuon-grid-container');
  container.innerHTML = '';
  
  // 别名高亮
  const filterBtns = document.querySelectorAll('[data-kana-type]');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-kana-type') === type);
  });
  
  GOJUON_DATA.forEach(item => {
    const card = document.createElement('div');
    card.className = 'kana-card';
    const primaryChar = type === 'hiragana' ? item.hiragana : item.katakana;
    const secondaryChar = type === 'hiragana' ? item.katakana : item.hiragana;
    
    card.innerHTML = `
      <span class="kana-char">${primaryChar}</span>
      <span class="kana-romaji">${item.romaji}</span>
      <span class="kana-sub">${secondaryChar}</span>
    `;
    
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.9)';
      setTimeout(() => card.style.transform = 'none', 100);
      
      const synth = window.speechSynthesis;
      if (synth) {
        const utter = new SpeechSynthesisUtterance(primaryChar);
        utter.lang = 'ja-JP';
        synth.speak(utter);
      }
    });
    
    container.appendChild(card);
  });
  
  filterBtns.forEach(btn => {
    if (!btn.onclick) {
      btn.onclick = () => renderGojuonGrid(btn.getAttribute('data-kana-type'));
    }
  });
}

// 50音测试
function openKanaQuiz() {
  const panel = document.getElementById('kana-quiz-panel');
  panel.classList.remove('hidden');
  loadNextQuizQuestion();
}

function closeKanaQuiz() {
  document.getElementById('kana-quiz-panel').classList.add('hidden');
}

function loadNextQuizQuestion() {
  const feedback = document.getElementById('quiz-feedback-text');
  feedback.innerText = '';
  feedback.className = 'quiz-feedback';
  
  const randomKana = GOJUON_DATA[Math.floor(Math.random() * GOJUON_DATA.length)];
  const isHiragana = Math.random() > 0.5;
  const questionChar = isHiragana ? randomKana.hiragana : randomKana.katakana;
  
  document.getElementById('quiz-question-char').innerText = questionChar;
  
  let options = [randomKana.romaji];
  while (options.length < 4) {
    const wrongKana = GOJUON_DATA[Math.floor(Math.random() * GOJUON_DATA.length)];
    if (!options.includes(wrongKana.romaji)) {
      options.push(wrongKana.romaji);
    }
  }
  
  options.sort(() => Math.random() - 0.5);
  
  const optionsContainer = document.getElementById('quiz-options-container');
  optionsContainer.innerHTML = '';
  
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerText = opt;
    btn.onclick = () => {
      if (opt === randomKana.romaji) {
        feedback.innerText = '✨ 正确！素晴らしい！';
        feedback.style.color = 'var(--success)';
        setTimeout(loadNextQuizQuestion, 1000);
      } else {
        feedback.innerText = `❌ 答错啦，这个是 [${randomKana.romaji}] 哦！`;
        feedback.style.color = 'var(--danger)';
      }
    };
    optionsContainer.appendChild(btn);
  });
}

// 7. 语法列表渲染与折叠
function renderGrammarList(level) {
  const container = document.getElementById('grammar-list-container');
  container.innerHTML = '';
  
  const filterBtns = document.querySelectorAll('[data-grammar-level]');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-grammar-level') === level);
  });
  
  const filtered = level === 'all' ? GRAMMAR_DATA : GRAMMAR_DATA.filter(g => g.level === level);
  
  filtered.forEach(item => {
    const isLearned = appState.learnedGrammars.includes(item.id);
    const card = document.createElement('div');
    card.className = `grammar-card ${isLearned ? 'learned' : ''}`;
    
    card.innerHTML = `
      <div class="grammar-header">
        <span class="g-badge">${item.level}</span>
        <span class="g-title">${item.title}</span>
        <span class="g-meaning">${item.meaning}</span>
        <button class="vocab-learn-btn g-learn-toggle" style="margin-left: 16px;">
          ${isLearned ? '✓ 已掌握' : '标记已学'}
        </button>
      </div>
      <div class="grammar-body hidden">
        <div>
          <div class="g-section-title">句型接续 (接续)</div>
          <div class="g-connection">${item.connection}</div>
        </div>
        <div>
          <div class="g-section-title">语法说明 (说明)</div>
          <p class="g-desc">${item.explanation}</p>
        </div>
        <div>
          <div class="g-section-title">经典例句 (例文)</div>
          <div class="g-example-box">
            <div class="g-ex-jp">${item.exampleJp}</div>
            <div class="g-ex-romaji">${item.exampleRomaji}</div>
            <div class="g-ex-cn">${item.exampleCn}</div>
            <div class="g-ex-source">${item.source}</div>
          </div>
        </div>
      </div>
    `;
    
    const header = card.querySelector('.grammar-header');
    const body = card.querySelector('.grammar-body');
    const toggleBtn = card.querySelector('.g-learn-toggle');
    
    header.addEventListener('click', (e) => {
      if (e.target === toggleBtn || toggleBtn.contains(e.target)) return;
      body.classList.toggle('hidden');
    });
    
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (appState.learnedGrammars.includes(item.id)) {
        appState.learnedGrammars = appState.learnedGrammars.filter(id => id !== item.id);
        toggleBtn.innerText = '标记已学';
        card.classList.remove('learned');
      } else {
        appState.learnedGrammars.push(item.id);
        toggleBtn.innerText = '✓ 已掌握';
        card.classList.add('learned');
      }
      saveStateToLocalStorage();
    });
    
    container.appendChild(card);
  });
  
  filterBtns.forEach(btn => {
    if (!btn.onclick) {
      btn.onclick = () => renderGrammarList(btn.getAttribute('data-grammar-level'));
    }
  });
}

// 8. 单词卡片渲染与翻卡
function renderVocabGrid(category) {
  const container = document.getElementById('vocab-grid-container');
  container.innerHTML = '';
  
  const filterBtns = document.querySelectorAll('[data-vocab-cat]');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-vocab-cat') === category);
  });
  
  const filtered = category === 'all' ? VOCAB_DATA : VOCAB_DATA.filter(v => v.category === category);
  
  filtered.forEach(item => {
    const isLearned = appState.learnedWords.includes(item.word);
    
    const card = document.createElement('div');
    card.className = `vocab-card ${isLearned ? 'learned' : ''}`;
    
    card.innerHTML = `
      <div class="card-face card-front">
        <span class="v-cat-badge cat-${item.category}">
          ${item.category === 'isekai' ? '✨ 种田' : item.category === 'sports' ? '⚽ 竞技' : '🎸 日摇'}
        </span>
        <span class="v-word">${item.word}</span>
        <div class="vocab-card-actions">
          <button class="vocab-learn-btn btn-toggle-word">
            ${isLearned ? '已学会' : '未掌握'}
          </button>
        </div>
      </div>
      <div class="card-face card-back">
        <span class="v-reading">${item.reading}</span>
        <span class="v-romaji">${item.romaji}</span>
        <span class="v-meaning">${item.meaning}</span>
      </div>
    `;
    
    const toggleBtn = card.querySelector('.btn-toggle-word');
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (appState.learnedWords.includes(item.word)) {
        appState.learnedWords = appState.learnedWords.filter(w => w !== item.word);
        toggleBtn.innerText = '未掌握';
        card.classList.remove('learned');
      } else {
        appState.learnedWords.push(item.word);
        toggleBtn.innerText = '已学会';
        card.classList.add('learned');
      }
      saveStateToLocalStorage();
    });
    
    container.appendChild(card);
  });
  
  filterBtns.forEach(btn => {
    if (!btn.onclick) {
      btn.onclick = () => renderVocabGrid(btn.getAttribute('data-vocab-cat'));
    }
  });
}

// 9. 日语键盘打字引擎
function initTypingPractice() {
  loadTypingSentence();
  
  const inputEl = document.getElementById('typing-input');
  
  inputEl.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    
    e.preventDefault();
    
    const typedChar = e.key.toLowerCase();
    const expectedChar = appState.typingExpectedRomaji[appState.typingTypedCount].toLowerCase();
    
    let keyId = `key-${typedChar.toUpperCase()}`;
    if (e.key === ' ') keyId = 'key-SPACE';
    const keyEl = document.getElementById(keyId);
    if (keyEl) {
      keyEl.classList.add('active');
      setTimeout(() => keyEl.classList.remove('active'), 100);
    }
    
    if (!appState.typingStartTime) {
      appState.typingStartTime = Date.now();
    }
    
    if (typedChar === expectedChar) {
      appState.typingTypedCount++;
      updateTypingGuideDisplay();
      calculateTypingStats();
      
      if (appState.typingTypedCount === appState.typingExpectedRomaji.length) {
        handleSentenceCompleted();
      }
    } else {
      appState.typingErrorsCount++;
      calculateTypingStats();
      triggerTypingCardErrorShake();
    }
  });
  
  document.querySelector('.typing-card').addEventListener('click', () => {
    inputEl.focus();
  });
}

function loadTypingSentence() {
  const currentSentence = TYPING_SENTENCES[appState.typingIndex];
  
  document.getElementById('typing-category-tag').innerText = `【${
    currentSentence.category === 'isekai' ? '异世界种田' : currentSentence.category === 'sports' ? '竞技现场' : '日摇歌词'
  }】`;
  
  document.getElementById('typing-jp-text').innerText = currentSentence.jp;
  document.getElementById('typing-cn-text').innerText = currentSentence.meaning;
  
  appState.typingExpectedRomaji = currentSentence.romaji;
  appState.typingTypedCount = 0;
  appState.typingErrorsCount = 0;
  appState.typingStartTime = null;
  
  document.getElementById('typing-input').value = '';
  document.getElementById('typing-cpm').innerText = '0';
  document.getElementById('typing-accuracy').innerText = '100%';
  
  updateTypingGuideDisplay();
}

function updateTypingGuideDisplay() {
  const container = document.getElementById('typing-romaji-guide');
  container.innerHTML = '';
  
  const text = appState.typingExpectedRomaji;
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.innerText = text[i];
    
    if (i < appState.typingTypedCount) {
      span.className = 'char-typed';
    } else if (i === appState.typingTypedCount) {
      span.className = 'char-current';
    } else {
      span.className = 'char-pending';
    }
    container.appendChild(span);
  }
}

function calculateTypingStats() {
  const totalAttempts = appState.typingTypedCount + appState.typingErrorsCount;
  const accuracy = totalAttempts > 0 ? Math.round((appState.typingTypedCount / totalAttempts) * 100) : 100;
  document.getElementById('typing-accuracy').innerText = `${accuracy}%`;
  
  if (appState.typingStartTime) {
    const durationMins = (Date.now() - appState.typingStartTime) / 60000;
    if (durationMins > 0.01) {
      const cpm = Math.round(appState.typingTypedCount / durationMins);
      document.getElementById('typing-cpm').innerText = cpm;
    }
  }
}

function triggerTypingCardErrorShake() {
  const card = document.querySelector('.typing-card');
  card.classList.add('error-shake');
  setTimeout(() => card.classList.remove('error-shake'), 300);
}

function handleSentenceCompleted() {
  appState.completedTypingCount++;
  saveStateToLocalStorage();
  
  const card = document.querySelector('.typing-card');
  card.style.borderColor = 'var(--success)';
  card.style.boxShadow = '0 0 15px rgba(57, 231, 95, 0.4)';
  
  setTimeout(() => {
    card.style.borderColor = 'var(--border-color)';
    card.style.boxShadow = 'none';
    
    appState.typingIndex = (appState.typingIndex + 1) % TYPING_SENTENCES.length;
    loadTypingSentence();
  }, 800);
}

function skipTypingSentence() {
  appState.typingIndex = (appState.typingIndex + 1) % TYPING_SENTENCES.length;
  loadTypingSentence();
  document.getElementById('typing-input').focus();
}

// 10. 资源导航渲染
function renderResourcesGrid() {
  const container = document.getElementById('resources-grid-container');
  container.innerHTML = '';
  
  NAVIGATION_RESOURCES.forEach(item => {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
      <span class="resource-name">${item.name}</span>
      <p class="resource-desc">${item.desc}</p>
      <a href="${item.url}" target="_blank" class="resource-link">
        🔗 点击访问官网 &rarr;
      </a>
    `;
    container.appendChild(card);
  });
}
