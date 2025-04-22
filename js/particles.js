/* 株式会社ゼータプラス - パーティクルアニメーション */

class Particle {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // デフォルト設定とオプションのマージ
    this.options = Object.assign({
      count: 50,
      color: '#5cbdb9',
      radiusRange: [1, 3],
      speedRange: [0.5, 1.5],
      connectDistance: 150,
      connectOpacity: 0.5,
      interactive: true,
      maxInteractiveDistance: 200,
      maxInteractiveForce: 3
    }, options);
    
    // キャンバスサイズの設定
    this.resize();
    
    // パーティクルの初期化
    this.particles = [];
    this.createParticles();
    
    // イベントリスナー
    window.addEventListener('resize', this.resize.bind(this));
    
    if (this.options.interactive) {
      this.mouse = { x: null, y: null };
      this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
      this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }
    
    // アニメーション開始
    this.animate();
  }
  
  // キャンバスのリサイズ
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    
    // リサイズ時にパーティクルを再生成
    if (this.particles && this.particles.length) {
      this.createParticles();
    }
  }
  
  // パーティクルの生成
  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.options.count; i++) {
      const radius = Math.random() * (this.options.radiusRange[1] - this.options.radiusRange[0]) + this.options.radiusRange[0];
      const x = Math.random() * (this.canvas.width - radius * 2) + radius;
      const y = Math.random() * (this.canvas.height - radius * 2) + radius;
      const speed = Math.random() * (this.options.speedRange[1] - this.options.speedRange[0]) + this.options.speedRange[0];
      const direction = Math.random() * Math.PI * 2;
      
      this.particles.push({
        x,
        y,
        radius,
        speed,
        direction,
        vx: Math.cos(direction) * speed,
        vy: Math.sin(direction) * speed,
        originalSpeed: speed
      });
    }
  }
  
  // マウス移動のハンドリング
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }
  
  // マウス離脱のハンドリング
  handleMouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }
  
  // タッチ移動のハンドリング
  handleTouchMove(e) {
    if (e.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
    }
  }
  
  // タッチ終了のハンドリング
  handleTouchEnd() {
    this.mouse.x = null;
    this.mouse.y = null;
  }
  
  // パーティクルの更新
  update() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // インタラクティブ効果
      if (this.options.interactive && this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.options.maxInteractiveDistance) {
          const force = (this.options.maxInteractiveDistance - distance) / this.options.maxInteractiveDistance;
          const angle = Math.atan2(dy, dx);
          
          // マウスから逃げる効果
          p.vx -= Math.cos(angle) * force * this.options.maxInteractiveForce;
          p.vy -= Math.sin(angle) * force * this.options.maxInteractiveForce;
        } else {
          // 通常速度に徐々に戻す
          p.vx *= 0.98;
          p.vy *= 0.98;
          
          const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (Math.abs(currentSpeed - p.originalSpeed) > 0.1) {
            p.vx += (p.vx / currentSpeed) * (p.originalSpeed - currentSpeed) * 0.05;
            p.vy += (p.vy / currentSpeed) * (p.originalSpeed - currentSpeed) * 0.05;
          }
        }
      }
      
      // 位置の更新
      p.x += p.vx;
      p.y += p.vy;
      
      // 画面外に出た場合
      if (p.x < -p.radius) p.x = this.canvas.width + p.radius;
      if (p.x > this.canvas.width + p.radius) p.x = -p.radius;
      if (p.y < -p.radius) p.y = this.canvas.height + p.radius;
      if (p.y > this.canvas.height + p.radius) p.y = -p.radius;
    }
  }
  
  // パーティクルの描画
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 接続線の描画
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.options.connectDistance) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(92, 189, 185, ${(1 - distance / this.options.connectDistance) * this.options.connectOpacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
    
    // パーティクルの描画
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.options.color;
      this.ctx.fill();
    }
  }
  
  // アニメーションループ
  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

// DOMロード完了時にパーティクルアニメーションを初期化
document.addEventListener('DOMContentLoaded', function() {
  // .particle-canvas クラスを持つすべてのキャンバスにパーティクルを適用
  const canvases = document.querySelectorAll('.particle-canvas');
  
  canvases.forEach(canvas => {
    // キャンバス固有のオプションを取得（data 属性から）
    const options = {
      count: parseInt(canvas.dataset.particleCount) || 50,
      color: canvas.dataset.particleColor || '#5cbdb9',
      radiusRange: canvas.dataset.particleRadius ? JSON.parse(canvas.dataset.particleRadius) : [1, 3],
      speedRange: canvas.dataset.particleSpeed ? JSON.parse(canvas.dataset.particleSpeed) : [0.5, 1.5],
      connectDistance: parseInt(canvas.dataset.particleConnect) || 150
    };
    
    new Particle(canvas, options);
  });
}); 