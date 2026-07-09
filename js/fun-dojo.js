// ==========================================
// Dim Dojo (趣味次元道场) Interactive Logic
// ==========================================

// Global Game State
let selectedJpQuoteIdx = null;
let selectedCnQuoteIdx = null;
let matchedQuotes = [];

let selectedJpSportIdx = null;
let selectedEnSportIdx = null;
let matchedSports = [];


// Switch Sub-tabs
function switchFunSubTab(subTabId) {
  document.querySelectorAll('#parser .fun-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('#parser .fun-sub-panel').forEach(panel => panel.classList.remove('active'));

  const targetBtn = Array.from(document.querySelectorAll('#parser .fun-tab-btn')).find(btn => btn.getAttribute('onclick').includes(subTabId));
  if (targetBtn) targetBtn.classList.add('active');

  const targetPanel = document.getElementById('fun-panel-' + subTabId);
  if (targetPanel) targetPanel.classList.add('active');

  if (subTabId === 'quotes') {
    initQuotesGame();
  } else if (subTabId === 'sports') {
    initSportsGame();
  } else if (subTabId === 'rpg') {
    initRpgGame();
  }
}

// ------------------------------------------
// 1. Text Parser & Preset loader
// ------------------------------------------
function init_parser() {
  parsedSentences = [];
  currentSentenceIndex = 0;
  totalTypedChars = 0;
  renderPresets();
  // Set initial display
  switchFunSubTab('lyrics');
}

function renderPresets() {
  const container = document.getElementById('presets-container');
  if (!container) return;
  container.innerHTML = '';
  SAMPLE_LYRICS_PRESETS.forEach((preset, idx) => {
    const card = document.createElement('div');
    card.className = 'preset-song-card';
    card.innerText = preset.name;
    card.onclick = () => {
      document.getElementById('parser-raw-text').value = preset.text;
      startTextParsing();
    };
    container.appendChild(card);
  });
}

// ------------------------------------------
// 2. Anime Quotes Matcher
// ------------------------------------------
let jpQuotesShuffled = [];
let cnQuotesShuffled = [];

function initQuotesGame() {
  selectedJpQuoteIdx = null;
  selectedCnQuoteIdx = null;
  matchedQuotes = [];
  
  // Create shuffled copies
  jpQuotesShuffled = ANIME_QUOTES.map((q, idx) => ({ ...q, originalIdx: idx })).sort(() => Math.random() - 0.5);
  cnQuotesShuffled = ANIME_QUOTES.map((q, idx) => ({ ...q, originalIdx: idx })).sort(() => Math.random() - 0.5);

  renderQuotesUI();
}

function renderQuotesUI() {
  const jpCol = document.getElementById('quotes-jp-column');
  const cnCol = document.getElementById('quotes-cn-column');
  const progressText = document.getElementById('quotes-match-progress');
  
  if (!jpCol || !cnCol || !progressText) return;
  
  jpCol.innerHTML = '';
  cnCol.innerHTML = '';
  progressText.innerText = `${matchedQuotes.length} / ${ANIME_QUOTES.length}`;

  jpQuotesShuffled.forEach(item => {
    const card = document.createElement('div');
    card.className = 'quote-card-item';
    if (matchedQuotes.includes(item.originalIdx)) {
      card.classList.add('matched');
    }
    if (selectedJpQuoteIdx === item.originalIdx) {
      card.classList.add('selected');
    }
    card.innerHTML = `<span>🔊</span> ${item.jp}`;
    card.onclick = () => {
      if (matchedQuotes.includes(item.originalIdx)) return;
      AudioCenter.speak(item.jp);
      selectedJpQuoteIdx = item.originalIdx;
      renderQuotesUI();
      checkQuotesMatch();
    };
    jpCol.appendChild(card);
  });

  cnQuotesShuffled.forEach(item => {
    const card = document.createElement('div');
    card.className = 'quote-card-item';
    if (matchedQuotes.includes(item.originalIdx)) {
      card.classList.add('matched');
    }
    if (selectedCnQuoteIdx === item.originalIdx) {
      card.classList.add('selected');
    }
    card.innerHTML = `<strong>${item.char}</strong><br><span style="font-size:0.85rem; color:var(--color-text-muted);">${item.anime}</span><br><p style="margin-top:0.4rem; font-size:0.9rem;">${item.cn}</p>`;
    card.onclick = () => {
      if (matchedQuotes.includes(item.originalIdx)) return;
      selectedCnQuoteIdx = item.originalIdx;
      renderQuotesUI();
      checkQuotesMatch();
    };
    cnCol.appendChild(card);
  });
}

function checkQuotesMatch() {
  if (selectedJpQuoteIdx !== null && selectedCnQuoteIdx !== null) {
    if (selectedJpQuoteIdx === selectedCnQuoteIdx) {
      // Success Match
      matchedQuotes.push(selectedJpQuoteIdx);
      selectedJpQuoteIdx = null;
      selectedCnQuoteIdx = null;
      setTimeout(() => {
        renderQuotesUI();
        if (matchedQuotes.length === ANIME_QUOTES.length) {
          alert('🎉 太棒了！所有的动漫经典台词都完美配对！');
        }
      }, 300);
    } else {
      // Mismatch
      const jpCards = document.querySelectorAll('#quotes-jp-column .quote-card-item.selected');
      const cnCards = document.querySelectorAll('#quotes-cn-column .quote-card-item.selected');
      
      jpCards.forEach(c => {
        c.style.borderColor = '#ff4757';
        c.style.background = 'rgba(255, 71, 87, 0.15)';
      });
      cnCards.forEach(c => {
        c.style.borderColor = '#ff4757';
        c.style.background = 'rgba(255, 71, 87, 0.15)';
      });

      setTimeout(() => {
        selectedJpQuoteIdx = null;
        selectedCnQuoteIdx = null;
        renderQuotesUI();
      }, 1000);
    }
  }
}

function resetQuotesGame() {
  initQuotesGame();
}

// ------------------------------------------
// 3. Sports Terminology Matcher
// ------------------------------------------
let jpSportsShuffled = [];
let enSportsShuffled = [];

function initSportsGame() {
  selectedJpSportIdx = null;
  selectedEnSportIdx = null;
  matchedSports = [];

  jpSportsShuffled = SPORTS_TERMS.map((s, idx) => ({ ...s, originalIdx: idx })).sort(() => Math.random() - 0.5);
  enSportsShuffled = SPORTS_TERMS.map((s, idx) => ({ ...s, originalIdx: idx })).sort(() => Math.random() - 0.5);

  renderSportsUI();
}

function renderSportsUI() {
  const jpCol = document.getElementById('sports-jp-column');
  const enCol = document.getElementById('sports-en-column');
  const progressText = document.getElementById('sports-match-progress');

  if (!jpCol || !enCol || !progressText) return;

  jpCol.innerHTML = '';
  enCol.innerHTML = '';
  progressText.innerText = `${matchedSports.length} / ${SPORTS_TERMS.length}`;

  jpSportsShuffled.forEach(item => {
    const card = document.createElement('div');
    card.className = 'quote-card-item';
    if (matchedSports.includes(item.originalIdx)) {
      card.classList.add('matched');
    }
    if (selectedJpSportIdx === item.originalIdx) {
      card.classList.add('selected');
    }
    card.innerHTML = `<span>🔊</span> <strong style="font-size:1.15rem; color:var(--color-accent);">${item.jp}</strong>`;
    card.onclick = () => {
      if (matchedSports.includes(item.originalIdx)) return;
      AudioCenter.speak(item.jp);
      selectedJpSportIdx = item.originalIdx;
      renderSportsUI();
      checkSportsMatch();
    };
    jpCol.appendChild(card);
  });

  enSportsShuffled.forEach(item => {
    const card = document.createElement('div');
    card.className = 'quote-card-item';
    if (matchedSports.includes(item.originalIdx)) {
      card.classList.add('matched');
    }
    if (selectedEnSportIdx === item.originalIdx) {
      card.classList.add('selected');
    }
    card.innerHTML = `<strong>${item.en}</strong><br><span style="font-size:0.9rem; color:white;">${item.cn}</span>`;
    card.onclick = () => {
      if (matchedSports.includes(item.originalIdx)) return;
      selectedEnSportIdx = item.originalIdx;
      renderSportsUI();
      checkSportsMatch();
    };
    enCol.appendChild(card);
  });
}

function checkSportsMatch() {
  if (selectedJpSportIdx !== null && selectedEnSportIdx !== null) {
    if (selectedJpSportIdx === selectedEnSportIdx) {
      matchedSports.push(selectedJpSportIdx);
      selectedJpSportIdx = null;
      selectedEnSportIdx = null;
      setTimeout(() => {
        renderSportsUI();
        if (matchedSports.length === SPORTS_TERMS.length) {
          alert('🎉 恭喜！所有的体育外来词片假名都已经成功配对！');
        }
      }, 300);
    } else {
      const jpCards = document.querySelectorAll('#sports-jp-column .quote-card-item.selected');
      const enCards = document.querySelectorAll('#sports-en-column .quote-card-item.selected');

      jpCards.forEach(c => {
        c.style.borderColor = '#ff4757';
        c.style.background = 'rgba(255, 71, 87, 0.15)';
      });
      enCards.forEach(c => {
        c.style.borderColor = '#ff4757';
        c.style.background = 'rgba(255, 71, 87, 0.15)';
      });

      setTimeout(() => {
        selectedJpSportIdx = null;
        selectedEnSportIdx = null;
        renderSportsUI();
      }, 1000);
    }
  }
}

function resetSportsGame() {
  initSportsGame();
}

// ------------------------------------------
