/**
 * 异世界冒险 RPG 核心游戏引擎与音效合成模块
 */

// Web Audio API 8-bit 音效与 BGM 合成器
const RPGSound = {
  audioCtx: null,
  bgmInterval: null,
  bgmGain: null,
  isBgmPlaying: false,
  
  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  
  playBgm() {
    this.init();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    
    const ctx = this.audioCtx;
    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.value = 0.04; // 适中背景音量
    this.bgmGain.connect(ctx.destination);
    
    // 经典的 8bit JRPG 白天/冒险琶音旋律: C -> Am -> F -> G 循环
    const notes = [
      261.63, 329.63, 392.00, 523.25, // C Major
      220.00, 277.18, 329.63, 440.00, // A minor
      174.61, 220.00, 261.63, 349.23, // F Major
      196.00, 246.94, 293.66, 392.00  // G Major
    ];
    
    let noteIdx = 0;
    const noteLength = 0.25; // 16分音符，每个音符 250 毫秒
    
    this.bgmInterval = setInterval(() => {
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      osc.type = 'triangle'; // 三角波，带有怀旧木琴感
      osc.frequency.setValueAtTime(notes[noteIdx], ctx.currentTime);
      osc.connect(this.bgmGain);
      osc.start();
      osc.stop(ctx.currentTime + noteLength - 0.04);
      
      noteIdx = (noteIdx + 1) % notes.length;
    }, noteLength * 1000);
  },
  
  stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.isBgmPlaying = false;
  },
  
  playPlayerHit() {
    this.init();
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth'; // 锯齿波，有被击打的电磁碎屑声
    osc.frequency.setValueAtTime(130, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  },
  
  playMonsterHit() {
    this.init();
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square'; // 方波，模拟经典的砍怪反馈
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  },
  
  playMonsterDefeat() {
    this.init();
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.4);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  },
  
  playPotionUse() {
    this.init();
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine'; // 纯净的正弦波模拟喝水恢复声
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.35);
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  },
  
  playVictory() {
    this.init();
    const ctx = this.audioCtx;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 arpeggio
    const noteTimes = [0, 0.12, 0.24, 0.36];
    const durations = [0.1, 0.1, 0.1, 0.7];
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + noteTimes[i]);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime + noteTimes[i]);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + noteTimes[i] + durations[i]);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + noteTimes[i]);
      osc.stop(ctx.currentTime + noteTimes[i] + durations[i]);
    });
  }
};

// RPG 核心状态变量
let rpgHero = null;
let rpgMonster = null;
let rpgProgress = 0; // 当前进度 (魔王战需要10点)
let rpgActions = 0;   // 行动次数
let rpgSelectedCategory = "异世界";
let rpgWordsList = [];
let rpgRoundCount = 0;

let rpgPotionsCount = 0;       // 生命药水存量
let rpgCurrentLeaderPerfect = true; // 领主关卡是否保持完美无伤状态

// 初始化 RPG 页面 (重新回到开始界面)
function initRpgGame() {
  RPGSound.stopBgm(); // 停止当前 BGM
  
  const stateStr = localStorage.getItem('rpg_player_state');
  if (stateStr) {
    rpgHero = JSON.parse(stateStr);
  } else {
    rpgHero = { name: "日语勇者", lv: 1, exp: 0, hp: 100, maxHp: 100 };
  }
  
  document.getElementById('rpg-start-screen').style.display = 'block';
  document.getElementById('rpg-arena-play').style.display = 'none';
  
  // Update Hero Status on Start Screen
  document.getElementById('rpg-start-lv').innerText = `LV. ${rpgHero.lv} 冒险者`;
  document.getElementById('rpg-start-exp').innerText = `${rpgHero.exp} / ${rpgHero.lv * 100}`;
  
  RPGSound.playBgm(); // 只要在开始界面就开启播放冒险 BGM!
}

function getRpgLeaderboard() {
  const lbStr = localStorage.getItem('rpg_leaderboard');
  if (lbStr) {
    try { return JSON.parse(lbStr); } catch(e) { return []; }
  }
  return [];
}

function saveRpgLeaderboard(lb) {
  localStorage.setItem('rpg_leaderboard', JSON.stringify(lb));
}

// 开始决斗
function startRpgGamePlay() {
  rpgSelectedCategory = document.getElementById('rpg-category-select').value;
  
  let allWords = [];
  try {
    const customList = JSON.parse(localStorage.getItem('vocab_list') || '[]');
    allWords = customList.length > 0 ? customList : VOCAB_DATABASE;
  } catch(e) {
    allWords = VOCAB_DATABASE;
  }
  
  if (rpgSelectedCategory === "所有词汇") {
    rpgWordsList = [...allWords];
  } else {
    rpgWordsList = allWords.filter(w => w.category === rpgSelectedCategory);
  }
  
  if (rpgWordsList.length === 0) {
    rpgWordsList = VOCAB_DATABASE.filter(w => w.category === rpgSelectedCategory);
    if (rpgWordsList.length === 0) {
      rpgWordsList = [...VOCAB_DATABASE];
      rpgSelectedCategory = "所有词汇";
    }
  }
  
  rpgProgress = 0;
  rpgActions = 0;
  rpgRoundCount = 0;
  rpgPotionsCount = 0;
  rpgHero.hp = rpgHero.maxHp;
  
  document.getElementById('rpg-start-screen').style.display = 'none';
  document.getElementById('rpg-arena-play').style.display = 'block';
  
  RPGSound.playBgm(); // 重头播放 8bit 冒险 BGM!
  
  renderRpgState();
  spawnMonster();
}

function renderRpgState() {
  const heroHpBar = document.getElementById('rpg-hero-hp');
  const heroHpText = document.getElementById('rpg-hero-hp-text');
  
  const progDisp = document.getElementById('rpg-progress-display');
  const actDisp = document.getElementById('rpg-actions-display');
  const potDisp = document.getElementById('rpg-potions-display');

  if (heroHpBar) heroHpBar.style.width = `${(rpgHero.hp / rpgHero.maxHp) * 100}%`;
  if (heroHpText) heroHpText.innerText = `HP: ${rpgHero.hp} / ${rpgHero.maxHp}`;
  
  if (progDisp) progDisp.innerText = `${rpgProgress} / 10`;
  if (actDisp) actDisp.innerText = rpgActions;
  if (potDisp) potDisp.innerText = `🧪 药水: ${rpgPotionsCount} 瓶`;

  const suffixMap = {
    "异世界": "冒险家",
    "运动": "运动员",
    "美食": "美食家",
    "出行": "旅行家",
    "日常": "生活家",
    "问候": "外交官",
    "时间": "领航员",
    "自然": "拓荒者",
    "社会": "观察家",
    "职场": "实干家",
    "所有词汇": "博学者"
  };
  const suffix = suffixMap[rpgSelectedCategory] || "冒险家";
  const heroNameEl = document.getElementById('rpg-hero-name');
  if (heroNameEl) heroNameEl.innerText = suffix;
}

// 使用药水
function useRpgPotion() {
  if (rpgPotionsCount > 0) {
    rpgPotionsCount--;
    rpgActions++;
    
    // 恢复 50% 最大生命值
    const healAmount = Math.floor(rpgHero.maxHp * 0.5);
    rpgHero.hp = Math.min(rpgHero.maxHp, rpgHero.hp + healAmount);
    
    RPGSound.playPotionUse(); // 播放喝药水音效
    
    renderRpgState();
    alert(`🧪 咕嘟咕嘟……喝下了生命药水！生命值恢复了 ${healAmount} 点！`);
  } else {
    alert("❌ 您的背包里没有多余的生命药水！\n(击败领主且不答错即可获得)");
  }
}

function spawnMonster() {
  // 达到10点进度开启魔王关卡
  if (rpgProgress >= 10) {
    rpgMonster = {
      name: "👹 【魔王】终极关底BOSS",
      avatar: "👹",
      hp: 500,
      maxHp: 500,
      word: null,
      isBoss: false,
      isFinalBoss: true
    };
  } else {
    // 3小怪 1领主 循环
    const isLeader = (rpgRoundCount % 4 === 3);
    const templates = MONSTER_TEMPLATES.filter(t => t.isBoss === isLeader);
    const temp = templates[Math.floor(Math.random() * templates.length)];
    
    rpgMonster = {
      name: isLeader ? `👿 【领主】${temp.name}` : `👾 ${temp.name}`,
      avatar: temp.avatar,
      hp: temp.hp,
      maxHp: temp.hp,
      word: null,
      isBoss: isLeader,
      isFinalBoss: false
    };
    
    if (isLeader) {
      rpgCurrentLeaderPerfect = true; // 刷新领主，重置完美通关标识
    }
  }
  
  const mName = document.getElementById('rpg-monster-name');
  const mAvatar = document.getElementById('rpg-monster-avatar');
  if (mName) mName.innerText = rpgMonster.name;
  if (mAvatar) mAvatar.innerText = rpgMonster.avatar;
  
  nextBattleQuestion();
}

function nextBattleQuestion() {
  const word = rpgWordsList[Math.floor(Math.random() * rpgWordsList.length)];
  
  const options = [word.meaning];
  let allMeanings = rpgWordsList.map(w => w.meaning).filter(m => m !== word.meaning);
  if (allMeanings.length < 3) {
    allMeanings = VOCAB_DATABASE.map(w => w.meaning).filter(m => m !== word.meaning);
  }
  
  const shuffledMeanings = allMeanings.sort(() => Math.random() - 0.5);
  let count = 0;
  for (let i = 0; i < shuffledMeanings.length; i++) {
    if (!options.includes(shuffledMeanings[i])) {
      options.push(shuffledMeanings[i]);
      count++;
      if (count >= 3) break;
    }
  }
  options.sort(() => Math.random() - 0.5);
  
  rpgMonster.word = {
    kanji: word.word,
    kana: word.kana,
    meaning: word.meaning,
    category: word.category,
    options: options
  };

  if (rpgMonster.isFinalBoss) {
    // 魔王混合题型: 50% 拼写, 50% 选择
    rpgMonster.isBoss = Math.random() < 0.5;
  }
  
  const mHpBar = document.getElementById('rpg-monster-hp');
  const mHpText = document.getElementById('rpg-monster-hp-text');
  if (mHpBar) mHpBar.style.width = `${(rpgMonster.hp / rpgMonster.maxHp) * 100}%`;
  if (mHpText) mHpText.innerText = `HP: ${rpgMonster.hp} / ${rpgMonster.maxHp}`;
  
  const qTitle = document.getElementById('rpg-question-title');
  const targetWord = document.getElementById('rpg-target-word');
  const hintText = document.getElementById('rpg-word-hint');
  
  const optionsBox = document.getElementById('rpg-options-box');
  const inputBox = document.getElementById('rpg-input-box');
  
  optionsBox.style.display = 'none';
  inputBox.style.display = 'none';
  
  if (rpgMonster.isBoss) {
    qTitle.innerText = rpgMonster.isFinalBoss ? `🚨 终极对决！请拼写出该词汇的正确假名：` : `🚨 领主突袭！请拼写出该词汇的正确假名：`;
    targetWord.innerHTML = `${rpgMonster.word.kanji} <button class="dict-search-btn" onclick="openWafuuDict('${rpgMonster.word.kanji}')" title="使用沙盒词典查询" style="font-size:1.1rem; vertical-align: middle;">🔍</button>`;
    hintText.innerText = `提示意思：${rpgMonster.word.meaning}`;
    
    inputBox.style.display = 'flex';
    document.getElementById('rpg-typed-ans').value = '';
    document.getElementById('rpg-typed-ans').focus();
  } else {
    qTitle.innerText = rpgMonster.isFinalBoss ? `⚔️ 终极对决！请选择正确的词意：` : `⚔️ 遭遇野外魔物！请选择正确的词意：`;
    targetWord.innerHTML = `${rpgMonster.word.kanji} <button class="dict-search-btn" onclick="openWafuuDict('${rpgMonster.word.kanji}')" title="使用沙盒词典查询" style="font-size:1.1rem; vertical-align: middle;">🔍</button>`;
    hintText.innerText = `读音提示：${rpgMonster.word.kana}`;
    
    optionsBox.style.display = 'grid';
    optionsBox.innerHTML = '';
    
    rpgMonster.word.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'rpg-option-btn';
      btn.innerText = opt;
      btn.onclick = () => submitRpgChoice(opt);
      optionsBox.appendChild(btn);
    });
  }
}

function submitRpgChoice(selectedOpt) {
  rpgActions++;
  const isCorrect = selectedOpt === rpgMonster.word.meaning;
  processBattleResult(isCorrect);
}

function submitRpgSpelling() {
  rpgActions++;
  const typedVal = document.getElementById('rpg-typed-ans').value.trim();
  
  const targetWord = rpgMonster.word.kanji.trim();
  const rawKana = rpgMonster.word.kana.trim();
  
  let cleanKana = rawKana;
  let cleanRomaji = "";
  const match = rawKana.match(/^([^\s(]+)\s*\(([^)]+)\)/);
  if (match) {
    cleanKana = match[1].trim();
    cleanRomaji = match[2].trim().toLowerCase();
  }
  
  const inputLower = typedVal.toLowerCase();
  const isCorrect = (inputLower === cleanKana) || 
                    (inputLower === cleanRomaji) || 
                    (typedVal === targetWord);
                    
  processBattleResult(isCorrect);
}

function processBattleResult(isCorrect) {
  const heroEntity = document.getElementById('rpg-hero-entity');
  const monsterEntity = document.getElementById('rpg-monster-entity');
  
  if (isCorrect) {
    heroEntity.classList.add('attack-left');
    AudioCenter.speak(rpgMonster.word.kanji);
    RPGSound.playMonsterHit(); // 怪物受击音效
    
    setTimeout(() => {
      heroEntity.classList.remove('attack-left');
      monsterEntity.classList.add('hurt');
      
      const dmg = rpgMonster.isBoss ? 40 : 15;
      rpgMonster.hp = Math.max(0, rpgMonster.hp - dmg);
      
      const mHpBar = document.getElementById('rpg-monster-hp');
      const mHpText = document.getElementById('rpg-monster-hp-text');
      if (mHpBar) mHpBar.style.width = `${(rpgMonster.hp / rpgMonster.maxHp) * 100}%`;
      if (mHpText) mHpText.innerText = `HP: ${rpgMonster.hp} / ${rpgMonster.maxHp}`;
      
      setTimeout(() => {
        monsterEntity.classList.remove('hurt');
        
        if (rpgMonster.hp <= 0) {
          RPGSound.playMonsterDefeat(); // 怪物击杀音效
          
          if (rpgMonster.isFinalBoss) {
            handleVictory();
          } else {
            const ptsGain = rpgMonster.isBoss ? 2 : 1;
            rpgProgress += ptsGain;
            rpgRoundCount++;
            
            let extraMsg = "";
            // 如果是领主怪，且没有答错扣过血
            if (rpgMonster.isBoss && rpgCurrentLeaderPerfect) {
              rpgPotionsCount++;
              extraMsg = "\n🏆 奇迹！你无伤击败了领主！额外掉落了一瓶【生命药水】🧪！";
            }
            
            // 和风音效与庆祝落樱
            if (rpgMonster.isBoss) {
              if (typeof window.SakuraEffect !== 'undefined') window.SakuraEffect.shower(3500);
              if (typeof window.WafuuAudio !== 'undefined') window.WafuuAudio.playKotoVictory();
            } else {
              if (typeof window.WafuuAudio !== 'undefined') window.WafuuAudio.playBamboo();
            }
            
            setTimeout(() => {
              alert(`⚔️ 击败了 ${rpgMonster.name}！\n进度点数 +${ptsGain}${extraMsg}`);
              saveRpgState();
              renderRpgState();
              spawnMonster();
            }, 100);
          }
        } else {
          renderRpgState();
          nextBattleQuestion();
        }
      }, 300);
    }, 200);
  } else {
    monsterEntity.classList.add('attack-right');
    RPGSound.playPlayerHit(); // 玩家受击音效
    
    if (rpgMonster.isBoss) {
      rpgCurrentLeaderPerfect = false; // 答错了，领主无伤掉落资格取消
    }
    
    setTimeout(() => {
      monsterEntity.classList.remove('attack-right');
      heroEntity.classList.add('hurt');
      
      const dmg = rpgMonster.isBoss ? 35 : 15;
      rpgHero.hp = Math.max(0, rpgHero.hp - dmg);
      
      renderRpgState();
      
      setTimeout(() => {
        heroEntity.classList.remove('hurt');
        
        if (rpgHero.hp <= 0) {
          alert('💀 你在战斗中力竭倒下了……返回营地休息（体力回满）。');
          rpgHero.hp = rpgHero.maxHp;
          saveRpgState();
          renderRpgState();
          initRpgGame();
        } else {
          alert(`❌ 回答错误！遭受反击，HP 减少 ${dmg}。正确的答案是：${rpgMonster.word.kanji} (${rpgMonster.word.kana} - ${rpgMonster.word.meaning})`);
          nextBattleQuestion();
        }
      }, 300);
    }, 200);
  }
}

function handleVictory() {
  RPGSound.stopBgm();
  RPGSound.playVictory(); // 播放原本的8bit胜利曲
  
  // 扫落漫天夜樱雨粒子，并奏响悠雅的和风古琴声
  if (typeof window.SakuraEffect !== 'undefined') window.SakuraEffect.shower(6000);
  if (typeof window.WafuuAudio !== 'undefined') window.WafuuAudio.playKotoVictory();
  
  setTimeout(() => {
    alert(`👑 恭喜你成功击杀了最终关底BOSS【魔王】！本轮冒险宣告胜利！\n共消耗行动次数: ${rpgActions} 次🌸`);
    
    const name = prompt("🏆 请留下您的勇者大名进行排行榜登记：") || "匿名勇者";
    const dateStr = new Date().toISOString().slice(0, 10);
    
    const lb = getRpgLeaderboard();
    lb.push({
      name: name,
      actions: rpgActions,
      date: dateStr,
      category: rpgSelectedCategory
    });
    
    lb.sort((a, b) => a.actions - b.actions);
    const top10 = lb.slice(0, 10);
    saveRpgLeaderboard(top10);
    
    initRpgGame();
  }, 200);
}

function showRpgLeaderboardModal() {
  const lb = getRpgLeaderboard();
  let html = `<div style="text-align:left; font-family:var(--font-family);">
    <h3 style="border-bottom:2px solid var(--color-primary); padding-bottom:0.5rem; margin-bottom:1rem; color:var(--color-primary); font-size: 1.3rem;">🏆 异世界冒险历史前十排行榜</h3>`;
  
  if (lb.length === 0) {
    html += `<p style="color:var(--color-text-muted); text-align:center; padding:1.5rem 0;">目前暂无通关记录。快去打倒魔王成为第一名吧！</p>`;
  } else {
    html += `<table style="width:100%; border-collapse:collapse; margin-bottom:1rem;" class="course-table">
      <thead>
        <tr style="border-bottom:2px solid var(--color-primary);">
          <th style="padding:0.6rem; text-align:center; color:var(--color-text-main);">排名</th>
          <th style="padding:0.6rem; text-align:left; color:var(--color-text-main);">勇者姓名</th>
          <th style="padding:0.6rem; text-align:center; color:var(--color-text-main);">消耗行动</th>
          <th style="padding:0.6rem; text-align:center; color:var(--color-text-main);">所选分类</th>
          <th style="padding:0.6rem; text-align:center; color:var(--color-text-main);">通关日期</th>
        </tr>
      </thead>
      <tbody>`;
    lb.forEach((item, index) => {
      html += `<tr style="border-bottom:1px solid rgba(0,0,0,0.08);">
        <td style="padding:0.6rem; text-align:center; font-weight:bold; color:var(--color-accent);">${index + 1}</td>
        <td style="padding:0.6rem; font-weight:bold; color:var(--color-text-main);">${item.name}</td>
        <td style="padding:0.6rem; text-align:center; color:var(--color-primary); font-weight:bold;">${item.actions} 次</td>
        <td style="padding:0.6rem; text-align:center;"><span class="grammar-tag" style="background:rgba(184, 62, 56, 0.1); color:var(--color-primary);">${item.category}</span></td>
        <td style="padding:0.6rem; text-align:center; font-size:0.85rem; color:var(--color-text-muted);">${item.date}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  }
  
  html += `<div style="text-align:right; margin-top:1.5rem;">
    <button class="btn-neon" onclick="closeRpgLeaderboardModal()">关闭</button>
  </div></div>`;
  
  const modal = document.createElement('div');
  modal.id = 'rpg-leaderboard-modal-overlay';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.5)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '9999';
  
  const content = document.createElement('div');
  content.className = 'glass-card';
  content.style.width = '90%';
  content.style.maxWidth = '600px';
  content.style.maxHeight = '90vh';
  content.style.overflowY = 'auto';
  content.innerHTML = html;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
}

function closeRpgLeaderboardModal() {
  const overlay = document.getElementById('rpg-leaderboard-modal-overlay');
  if (overlay) overlay.remove();
}

function saveRpgState() {
  localStorage.setItem('rpg_player_state', JSON.stringify(rpgHero));
}
