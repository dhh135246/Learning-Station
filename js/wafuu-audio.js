/**
 * 日本語学習ステーション - 和风物理合成音效系统 (Wafuu Audio Synthesizer)
 * 纯 Web Audio API 代码合成，100% 离线双击运行，零外部文件加载
 */

(function() {
  let audioCtx = null;

  // 惰性初始化 AudioContext
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const WafuuAudio = {
    /**
     * 1. 模拟竹添水 / 鹿威击石声 (Shishi-odoshi / Bamboo Hit)
     * 用于打卡签到成功、假名卡片配对成功或单词添加成功
     */
    playBamboo() {
      try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // A. 模拟竹腔中频空心共鸣 (Sine Wave)
        const oscNode = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscNode.type = 'sine';
        oscNode.frequency.setValueAtTime(145, now);
        // 指数滑落模拟竹腔弹性震动衰减
        oscNode.frequency.exponentialRampToValueAtTime(80, now + 0.12);

        gainNode.gain.setValueAtTime(0.6, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        // B. 模拟敲击石头瞬间的硬接触干脆击打 (高通滤波后的短猝噪声)
        const bufferSize = ctx.sampleRate * 0.02; // 极短 0.02 秒
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1600, now);
        noiseFilter.Q.setValueAtTime(4, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.7, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025); // 极其迅速消失

        // 建立连接
        oscNode.connect(gainNode);
        gainNode.connect(ctx.destination);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        // 启动播放
        oscNode.start(now);
        oscNode.stop(now + 0.15);

        noiseNode.start(now);
        noiseNode.stop(now + 0.03);
      } catch (e) {
        console.warn("WafuuAudio Bamboo Sound error:", e);
      }
    },

    /**
     * 2. 模拟传统和风古琴单弦弹拨声 (Koto Pluck / Shamisen sound)
     * 用于打字大通关、复习全部完成或 JRPG 领主战大胜利
     * @param {number} frequency 基频，默认 D4 键为 293.66Hz
     */
    playKoto(frequency = 293.66) {
      try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // A. 主拨弦音源 (Sawtooth 提供粗糙谐波)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        
        // 微弱的向下弯音 (Koto Slide-down 拨弦张力物理模拟)
        osc.frequency.setValueAtTime(frequency * 1.05, now);
        osc.frequency.quadraticRampToValueAtTime(frequency, now + 0.08);

        // B. 动态低通滤波器 (关键！模拟弹弦后高频谐波因木质阻尼瞬间被吸收的过程)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3500, now);
        filter.frequency.exponentialRampToValueAtTime(frequency * 2, now + 0.15); // 快速闭合截止频率
        filter.Q.setValueAtTime(1.5, now);

        // C. 音量衰减包络
        gain.gain.setValueAtTime(0.8, now);
        // 前 0.05 秒轻微渐入（模拟手指/义甲拨动琴弦接触的过渡）
        gain.gain.linearRampToValueAtTime(0.9, now + 0.03);
        // 指数漫长衰减，模拟余音绕梁
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        // 关联节点
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        // 开始与结束
        osc.start(now);
        osc.stop(now + 1.3);
      } catch (e) {
        console.warn("WafuuAudio Koto Sound error:", e);
      }
    },

    /**
     * 播放三声连贯古琴滑音 (Koto Arpeggio) 表现大胜庆典音效
     */
    playKotoVictory() {
      // 传统五声音阶 (D4, G4, A4) 的快速琶音扫弦
      const notes = [293.66, 392.00, 440.00];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playKoto(freq);
        }, idx * 120); // 间隔扫动
      });
    }
  };

  // 挂载到全局 window
  window.WafuuAudio = WafuuAudio;
})();
