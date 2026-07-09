/**
 * 日本語学習ステーション - 浮动落樱与樱花雨庆祝粒子系统 (Sakura & Yozakura Fall V3)
 * 基于原生 HTML5 Canvas 开发，轻量高效，自动适配日夜模式，支持全屏庆祝落樱骤雨
 */

(function() {
  let canvas = null;
  let ctx = null;
  let petals = [];
  let isDarkMode = false;
  let baseSpawnCount = 18; // 日常落樱基准数量
  let animationFrameId = null;

  class Petal {
    constructor(isShower = false) {
      this.reset(isShower);
      if (isShower) {
        // 扫落雨效果，随机分布在全屏上方，速度更快
        this.y = Math.random() * -canvas.height;
      } else {
        // 日常飘落，随机初始化在屏幕空间中
        this.y = Math.random() * canvas.height;
      }
    }

    reset(isShower = false) {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.size = Math.random() * 8 + 6; // 6px ~ 14px
      this.speedY = Math.random() * 0.8 + 0.5; // 常规下坠速度
      this.speedX = Math.random() * 0.5 - 0.25; // 常规横向风偏
      
      this.angle = Math.random() * Math.PI * 2; // 三维初始角度
      this.rotateSpeed = Math.random() * 0.02 - 0.01; // 自转速度
      this.swing = Math.random() * 1.5 + 0.5; // 正弦飘移波幅
      this.swingSpeed = Math.random() * 0.01 + 0.005; // 飘移速率
      this.swingOffset = Math.random() * Math.PI * 2;

      isDarkMode = document.body.classList.contains('dark-theme');
      
      // 暗色和明亮色主题的色彩自适应
      if (isDarkMode) {
        // 夜樱：稍微偏粉紫，且带有微弱的光晕
        this.color = `rgba(255, 179, 197, ${Math.random() * 0.45 + 0.35})`; // 0.35 ~ 0.8 透明
        this.hasGlow = true;
      } else {
        // 昼樱：柔和淡粉
        this.color = `rgba(255, 192, 203, ${Math.random() * 0.35 + 0.25})`; // 0.25 ~ 0.6
        this.hasGlow = false;
      }

      if (isShower) {
        // 特效樱花雨加速
        this.speedY = Math.random() * 1.8 + 1.2;
        this.speedX = Math.random() * 1.2 - 0.3; // 偏向右侧的大风效果
        this.size = Math.random() * 10 + 6;
      }
    }

    update() {
      this.y += this.speedY;
      this.swingOffset += this.swingSpeed;
      // 融合风向偏斜与 Sine 波摇摆
      this.x += this.speedX + Math.sin(this.swingOffset) * this.swing * 0.3;
      this.angle += this.rotateSpeed;

      // 溢出屏幕重置
      if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // 夜樱主题发光效果
      if (this.hasGlow) {
        ctx.shadowColor = 'rgba(255, 114, 159, 0.6)';
        ctx.shadowBlur = 8;
      }

      ctx.fillStyle = this.color;
      ctx.beginPath();
      
      // 纯 CSS/Canvas 绘制精致的樱花瓣 (带精细的凹陷缺口，符合极致美学)
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size / 2, -this.size * 1.4, 0, -this.size);
      ctx.bezierCurveTo(this.size / 2, -this.size * 1.4, this.size, -this.size / 2, 0, 0);

      // 绘制瓣尖小裂口
      ctx.moveTo(0, -this.size);
      ctx.lineTo(-this.size * 0.1, -this.size * 0.9);
      ctx.lineTo(0, -this.size * 0.85);
      ctx.lineTo(this.size * 0.1, -this.size * 0.9);
      ctx.closePath();
      
      ctx.fill();
      ctx.restore();
    }
  }

  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(animate);
  }

  const SakuraEffect = {
    init() {
      // 避免重复初始化
      if (document.getElementById('sakura-canvas')) return;

      canvas = document.createElement('canvas');
      canvas.id = 'sakura-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0'; // 位于 body 背景层之上，但排布在页面内容下方 (aside, main 拥有更高 z-index)
      
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');

      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      // 初始化背景樱花粒子
      isDarkMode = document.body.classList.contains('dark-theme');
      for (let i = 0; i < baseSpawnCount; i++) {
        petals.push(new Petal(false));
      }

      animate();
    },

    // 重新校准日夜主题下的樱花颜色
    updateTheme() {
      isDarkMode = document.body.classList.contains('dark-theme');
      petals.forEach(p => {
        if (isDarkMode) {
          p.color = `rgba(255, 180, 200, ${Math.random() * 0.45 + 0.35})`;
          p.hasGlow = true;
        } else {
          p.color = `rgba(255, 192, 203, ${Math.random() * 0.35 + 0.25})`;
          p.hasGlow = false;
        }
      });
    },

    /**
     * JRPG大胜利或打字大通关时，暴落一阵绚丽的樱花雨粒子
     * @param {number} durationMs 持续毫秒数，默认 4500ms
     */
    shower(durationMs = 4500) {
      if (!canvas) this.init();

      // 瞬间增生 120 个快速下坠的风偏樱花雨粒子
      const showerPetals = [];
      const showerCount = 100;
      for (let i = 0; i < showerCount; i++) {
        const p = new Petal(true);
        petals.push(p);
        showerPetals.push(p);
      }

      // 规定时间后，移除这批樱花雨粒子，降回日常飘落量
      setTimeout(() => {
        petals = petals.filter(p => !showerPetals.includes(p));
      }, durationMs);
    }
  };

  // 挂载到全局 window
  window.SakuraEffect = SakuraEffect;
})();
