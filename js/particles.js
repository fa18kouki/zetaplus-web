/* 株式会社ゼータプラス - インタラクティブパーティクル背景システム */

document.addEventListener('DOMContentLoaded', function() {
  // パーティクルシステムの初期化
  initParticleSystem();
  
  // 波形背景アニメーションの初期化 - 不要なため削除
  // initWaveBackground();
  
  // 幾何学模様背景の初期化
  initGeometricBackground();
  
  // 浮遊円形背景の初期化
  initFloatingCircles();
  
  // 3Dティルト効果の初期化
  initTiltEffect();
  
  // パララックスエフェクトの強化
  enhanceParallaxEffect();
  
  // マウストレイル効果の初期化
  initMouseTrailEffect();
});

// パーティクルシステムの初期化
function initParticleSystem() {
  // Hero セクションにパーティクルを追加
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  // パーティクルコンテナの作成
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-js';
  particlesContainer.id = 'hero-particles';
  heroSection.insertBefore(particlesContainer, heroSection.firstChild);
  
  // パーティクルシステムの設定
  particlesJS('hero-particles', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#5cbdb9"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0.3,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#5cbdb9",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "bubble": {
          "distance": 400,
          "size": 4,
          "duration": 2,
          "opacity": 0.8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
  
  // 特徴セクションにもパーティクルを追加
  const featuresSection = document.querySelector('.features');
  if (!featuresSection) return;
  
  const featureParticlesContainer = document.createElement('div');
  featureParticlesContainer.className = 'particles-js';
  featureParticlesContainer.id = 'features-particles';
  featuresSection.insertBefore(featureParticlesContainer, featuresSection.firstChild);
  
  // 特徴セクション用のパーティクル設定（少し異なる設定）
  particlesJS('features-particles', {
    "particles": {
      "number": {
        "value": 40,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": {
        "value": "#333333"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.1,
        "random": true
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#333333",
        "opacity": 0.1,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.5,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      },
      "modes": {
        "bubble": {
          "distance": 200,
          "size": 5,
          "duration": 2,
          "opacity": 0.2,
          "speed": 3
        }
      }
    },
    "retina_detect": true
  });
}

// 波形背景アニメーションの初期化 - 不要なためコメントアウト
/*
function initWaveBackground() {
  const sections = document.querySelectorAll('.hero, .features');
  
  sections.forEach(section => {
    // 波形コンテナの作成
    const waveContainer = document.createElement('div');
    waveContainer.className = 'wave-bg';
    
    // 3つの波を追加
    for (let i = 1; i <= 3; i++) {
      const wave = document.createElement('div');
      wave.className = `wave wave-${i}`;
      waveContainer.appendChild(wave);
    }
    
    // セクションに波形コンテナを追加
    section.appendChild(waveContainer);
  });
}
*/

// 幾何学模様背景の初期化
function initGeometricBackground() {
  const mainSection = document.querySelector('main');
  if (!mainSection) return;
  
  // 幾何学模様コンテナの作成
  const geometricContainer = document.createElement('div');
  geometricContainer.className = 'geometric-bg';
  
  // 幾何学的な形を追加
  for (let i = 0; i < 3; i++) {
    const shape = document.createElement('div');
    shape.className = 'geometric-shape';
    geometricContainer.appendChild(shape);
  }
  
  // セクションに幾何学模様コンテナを追加
  mainSection.insertBefore(geometricContainer, mainSection.firstChild);
  
  // 流れるグラデーション背景の追加
  const gradientFlow = document.createElement('div');
  gradientFlow.className = 'gradient-flow-bg';
  mainSection.insertBefore(gradientFlow, mainSection.firstChild);
}

// 浮遊円形背景の初期化
function initFloatingCircles() {
  const sections = document.querySelectorAll('.section:not(.features)');
  
  sections.forEach(section => {
    // 浮遊円形コンテナの作成
    const circlesContainer = document.createElement('div');
    circlesContainer.className = 'floating-circles-container';
    
    // 浮遊円を追加
    for (let i = 0; i < 4; i++) {
      const circle = document.createElement('div');
      circle.className = 'floating-circle';
      circlesContainer.appendChild(circle);
    }
    
    // セクションに浮遊円形コンテナを追加
    section.insertBefore(circlesContainer, section.firstChild);
  });
}

// 3Dティルト効果の初期化
function initTiltEffect() {
  // サービスカードにティルト効果を適用
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach(card => {
    card.classList.add('tilt-card');
    
    // カード内部の要素をラップする
    const content = card.querySelector('.service-content');
    const image = card.querySelector('.service-image');
    
    if (content) {
      content.classList.add('tilt-card-inner');
    }
    
    if (image) {
      image.classList.add('tilt-card-inner');
    }
    
    // マウス位置に基づいてティルト効果を計算
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // 中心からの距離を計算 (-1 から 1 の範囲)
      const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 10;
      const rotateX = -((mouseY - centerY) / (rect.height / 2)) * 10;
      
      // ティルト効果を適用
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // マウスが離れたら元に戻す
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
  
  // ボタンにホバーアクセント効果を適用
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.classList.add('hover-accent');
  });
}

// パララックスエフェクトの強化
function enhanceParallaxEffect() {
  const parallaxItems = document.querySelectorAll('.parallax');
  const sections = document.querySelectorAll('section');
  
  // 既存のパララックス要素の効果を強化
  window.addEventListener('scroll', function() {
    parallaxItems.forEach(item => {
      const speed = item.dataset.parallaxSpeed || 0.2;
      const rect = item.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportHeight = window.innerHeight;
      const distanceFromCenter = centerY - viewportHeight / 2;
      
      // スクロール位置に基づいてオフセットを計算
      const offset = distanceFromCenter * speed;
      const rotate = distanceFromCenter * speed * 0.05;
      
      // 変形を適用
      item.style.transform = `translateY(${offset}px) rotate(${rotate}deg)`;
    });
    
    // セクションごとの背景パララックス効果
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const speed = -0.05;
      const offset = rect.top * speed;
      
      // 背景位置を変更
      section.style.backgroundPositionY = `${offset}px`;
    });
  });
}

// マウストレイル効果の初期化
function initMouseTrailEffect() {
  const body = document.querySelector('body');
  
  // マウストレイルコンテナの作成
  const trailContainer = document.createElement('div');
  trailContainer.className = 'mouse-trail-container';
  trailContainer.style.position = 'fixed';
  trailContainer.style.pointerEvents = 'none';
  trailContainer.style.top = '0';
  trailContainer.style.left = '0';
  trailContainer.style.width = '100%';
  trailContainer.style.height = '100%';
  trailContainer.style.zIndex = '9999';
  body.appendChild(trailContainer);
  
  // マウス位置を追跡
  let mouseX = 0;
  let mouseY = 0;
  let trailElements = [];
  
  // マウス位置の更新
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // 新しいトレイル要素を作成
    createTrailElement();
  });
  
  // トレイル要素を作成
  function createTrailElement() {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.position = 'absolute';
    trail.style.width = '8px';
    trail.style.height = '8px';
    trail.style.borderRadius = '50%';
    trail.style.backgroundColor = 'rgba(92, 189, 185, 0.4)';
    trail.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    trail.style.transition = 'all 0.8s ease';
    
    trailContainer.appendChild(trail);
    trailElements.push(trail);
    
    // トレイル要素のアニメーション
    setTimeout(() => {
      trail.style.width = '0';
      trail.style.height = '0';
      trail.style.opacity = '0';
    }, 5);
    
    // 古いトレイル要素を削除
    setTimeout(() => {
      if (trailElements.length > 50) {
        const removed = trailElements.shift();
        trailContainer.removeChild(removed);
      }
    }, 800);
  }
} 