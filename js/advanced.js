/* 株式会社ゼータプラス - 高度なアニメーションとインタラクション効果 */

document.addEventListener('DOMContentLoaded', function() {
  // 高度なスクロールトリガーアニメーション
  initScrollAnimations();
  
  // スムーズなページ内遷移アニメーションの強化
  enhanceSmoothScrolling();
  
  // FAQセクションをアコーディオン化（あれば）
  initAccordion();
  
  // スクロールスナップ効果
  initScrollSnapping();
  
  // 視差効果の強化
  enhanceParallaxEffects();
  
  // カスタムカーソル効果
  initCustomCursor();
  
  // 文字送りアニメーション強化
  enhanceTypingEffects();
  
  // SVGアニメーション
  initSvgAnimations();
  
  // スクロールプログレスバー
  initScrollProgressBar();
  
  // 数値カウントアップアニメーション
  initCountUpAnimations();
});

// 高度なスクロールトリガーアニメーション
function initScrollAnimations() {
  // アニメーション対象の要素
  const animElements = document.querySelectorAll('.service-card, .feature-item, .section-title, .btn, .hero-text, .hero-image');
  
  // IntersectionObserverを使ったスクロールアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // クラスごとに異なるアニメーションを適用
        if (entry.target.classList.contains('service-card')) {
          entry.target.classList.add('animated', 'fade-in-up');
          
          // サービスカード内の要素にも連鎖してアニメーション
          setTimeout(() => {
            const image = entry.target.querySelector('.service-image');
            if (image) image.classList.add('pulse-animation');
            
            const title = entry.target.querySelector('.service-title');
            if (title) title.classList.add('highlight-animation');
          }, 300);
        } 
        else if (entry.target.classList.contains('feature-item')) {
          entry.target.classList.add('animated', 'fade-in-left');
          
          // アイコンを回転アニメーション
          const icon = entry.target.querySelector('.feature-icon');
          if (icon) icon.classList.add('rotate-in');
        }
        else if (entry.target.classList.contains('section-title')) {
          entry.target.classList.add('animated', 'fade-zoom-in');
        }
        else if (entry.target.classList.contains('btn')) {
          entry.target.classList.add('animated', 'pulse');
        }
        else if (entry.target.classList.contains('hero-text')) {
          entry.target.classList.add('animated');
          
          // ヒーローテキスト内の要素に連鎖アニメーション
          const title = entry.target.querySelector('.hero-title');
          const subtitle = entry.target.querySelector('.hero-subtitle');
          const buttons = entry.target.querySelectorAll('.btn');
          
          if (title) {
            title.style.opacity = '0';
            title.style.animation = 'fadeInUp 0.8s forwards';
            title.style.animationDelay = '0.2s';
          }
          
          if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.animation = 'fadeInUp 0.8s forwards';
            subtitle.style.animationDelay = '0.5s';
          }
          
          buttons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.animation = 'fadeInUp 0.8s forwards';
            btn.style.animationDelay = `${0.8 + (index * 0.2)}s`;
          });
        }
        else if (entry.target.classList.contains('hero-image')) {
          entry.target.classList.add('animated');
          entry.target.style.animation = 'zoomIn 1.2s ease-out forwards';
        }
        
        // 一度表示されたら監視を解除
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });
  
  // 要素を監視対象に追加
  animElements.forEach(element => {
    observer.observe(element);
  });
}

// スムーズなページ内遷移アニメーションの強化
function enhanceSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // クリックアニメーション
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      this.appendChild(ripple);
      
      // リップルアニメーション終了後に削除
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
      
      // ターゲット要素をハイライト
      const highlight = document.createElement('div');
      highlight.className = 'target-highlight';
      highlight.style.position = 'absolute';
      highlight.style.top = '0';
      highlight.style.left = '0';
      highlight.style.width = '100%';
      highlight.style.height = '100%';
      highlight.style.background = 'rgba(92, 189, 185, 0.1)';
      highlight.style.borderRadius = '4px';
      highlight.style.zIndex = '-1';
      highlight.style.opacity = '0';
      highlight.style.animation = 'fadeInOut 2s ease-in-out forwards';
      
      if (targetElement.style.position !== 'fixed' && targetElement.style.position !== 'absolute') {
        targetElement.style.position = 'relative';
      }
      
      targetElement.appendChild(highlight);
      
      // ハイライト効果を削除
      setTimeout(() => {
        highlight.remove();
      }, 2000);
      
      // スムーズスクロール (カスタムイージング)
      const startPosition = window.pageYOffset;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let startTime = null;
      
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeOutCubic(progress);
        
        window.scrollTo(0, startPosition + (distance * ease));
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      
      // イージング関数
      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }
      
      requestAnimationFrame(animation);
    });
  });
}

// FAQアコーディオン（あれば）
function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', () => {
        // アクティブ状態の切り替え
        const isActive = item.classList.contains('active');
        
        // 他のすべてのアイテムを閉じる
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) {
              otherAnswer.style.maxHeight = '0';
            }
          }
        });
        
        // クリックしたアイテムの状態を切り替え
        item.classList.toggle('active');
        
        if (!isActive) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '0';
        }
      });
    }
  });
}

// スクロールスナップ効果
function initScrollSnapping() {
  /* スクロールスナップ効果を無効化
  const sections = document.querySelectorAll('section');
  let isScrolling = false;
  let currentSectionIndex = 0;
  
  // 現在のセクションインデックスを取得
  function getCurrentSectionIndex() {
    const scrollPosition = window.pageYOffset;
    let index = 0;
    
    sections.forEach((section, i) => {
      const sectionTop = section.offsetTop - 100;
      if (scrollPosition >= sectionTop) {
        index = i;
      }
    });
    
    return index;
  }
  
  // ホイールイベントの処理
  window.addEventListener('wheel', (e) => {
    // すでにスクロール中なら何もしない
    if (isScrolling) return;
    
    currentSectionIndex = getCurrentSectionIndex();
    
    // 上下どちらにスクロールしているか
    if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
      // 下にスクロール
      scrollToSection(currentSectionIndex + 1);
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
      // 上にスクロール
      scrollToSection(currentSectionIndex - 1);
    }
  }, { passive: true });
  
  // 指定したセクションにスクロール
  function scrollToSection(index) {
    isScrolling = true;
    
    const targetPosition = sections[index].offsetTop - 80;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // スクロールアニメーション終了後にフラグをリセット
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
  */
  
  // スクロールスナップ効果を無効化
  console.log('スクロールスナップ効果は無効化されました');
}

// 視差効果の強化
function enhanceParallaxEffects() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // ヘッダー背景の視差効果
    const header = document.querySelector('header');
    if (header) {
      header.style.backgroundPositionY = `${scrollY * 0.05}px`;
    }
    
    // セクション背景の視差効果
    document.querySelectorAll('.section').forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionMiddle = sectionTop + sectionHeight / 2;
      const distanceFromMiddle = scrollY - sectionMiddle;
      const speed = (index % 2 === 0) ? 0.05 : -0.05;
      
      section.style.backgroundPositionY = `${distanceFromMiddle * speed}px`;
    });
  });
}

// カスタムカーソル効果
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorInner = document.createElement('div');
  cursorInner.className = 'custom-cursor-inner';
  document.body.appendChild(cursorInner);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  // ホバー時の効果
  const links = document.querySelectorAll('a, button, .btn, .service-card, .feature-item');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorInner.classList.add('active');
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorInner.classList.remove('active');
    });
  });
}

// 文字送りアニメーション強化
function enhanceTypingEffects() {
  const typingElements = document.querySelectorAll('.typing-effect');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    // 文字を一つずつタイピングする
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        element.classList.add('typing-done');
      }
    }, 100);
  });
}

// SVGアニメーション
function initSvgAnimations() {
  const svgs = document.querySelectorAll('svg');
  
  svgs.forEach(svg => {
    const paths = svg.querySelectorAll('path');
    
    paths.forEach((path, index) => {
      // パスの長さを取得
      const length = path.getTotalLength();
      
      // アニメーション前のスタイル設定
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      
      // アニメーション
      path.style.animation = `draw 1.5s ease-in-out ${index * 0.2}s forwards`;
    });
  });
}

// スクロールプログレスバー
function initScrollProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.width = '0';
  progressBar.style.height = '3px';
  progressBar.style.backgroundColor = 'var(--primary-color)';
  progressBar.style.zIndex = '1000';
  progressBar.style.transition = 'width 0.1s';
  document.body.appendChild(progressBar);
  
  // スクロールイベントでプログレスバーを更新
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = `${scrollPercent}%`;
  });
}

// 数値カウントアップアニメーション
function initCountUpAnimations() {
  const countElements = document.querySelectorAll('.count-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-count'), 10);
        let count = 0;
        const duration = 2000; // 2秒間
        const increment = target / (duration / 16); // 60fpsを想定
        
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(count).toLocaleString();
          }
        }, 16);
        
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.5
  });
  
  countElements.forEach(element => {
    observer.observe(element);
  });
}

// リップルエフェクト用のCSSを動的に追加
const style = document.createElement('style');
style.textContent = `
  .ripple-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    animation: ripple 0.6s ease-out;
  }
  
  @keyframes ripple {
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
  
  @keyframes fadeInOut {
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  
  .custom-cursor {
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, border-color 0.3s;
    z-index: 9999;
    mix-blend-mode: difference;
  }
  
  .custom-cursor.active {
    width: 60px;
    height: 60px;
    border-color: var(--secondary-color);
  }
  
  .custom-cursor-inner {
    position: fixed;
    width: 8px;
    height: 8px;
    background-color: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, background-color 0.3s;
    z-index: 9999;
  }
  
  .custom-cursor-inner.active {
    width: 12px;
    height: 12px;
    background-color: var(--secondary-color);
  }
  
  .pulse-animation {
    animation: pulse 1.5s infinite ease-in-out;
  }
  
  .highlight-animation {
    animation: highlight 1.5s ease;
  }
  
  .rotate-in {
    animation: rotateIn 1s ease forwards;
  }
  
  @keyframes highlight {
    0% { color: var(--text-color); }
    30% { color: var(--primary-color); }
    100% { color: var(--text-color); }
  }
  
  @keyframes rotateIn {
    from {
      transform: rotate(-180deg) scale(0.5);
      opacity: 0;
    }
    to {
      transform: rotate(0) scale(1);
      opacity: 1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(style); 