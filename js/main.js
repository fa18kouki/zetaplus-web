/* 株式会社ゼータプラス Webサイト パターン1: モダンでシンプルなデザイン - JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  // ハンバーガーメニューの動作
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const body = document.body;
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // メニュー表示時に背景スクロールを防止
      if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
    
    // ウィンドウサイズが変わった時にメニューを閉じる
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
    
    // メニュー内のリンクをクリックした時にメニューを閉じる
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
      });
    });
    
    // スクロール時にメニューを閉じる
    window.addEventListener('scroll', function() {
      if (menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
    
    // 画面外クリックでメニューを閉じる
    document.addEventListener('click', function(event) {
      const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
      if (!isClickInside && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }
  
  // 高度なスクロールアニメーション
  const animatedElements = document.querySelectorAll('.scroll-animate, .fade-in, .service-card, .feature-item, .faq-item');
  
  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }
  
  function checkAnimations() {
    animatedElements.forEach(element => {
      if (isElementInViewport(element)) {
        element.classList.add('animated');
      }
    });
  }
  

  // 新しいアニメーションの適用と管理
  function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
      // テキストを保存
      const text = element.textContent;
      
      // アニメーション終了後にタイピングエフェクトを消すためのイベントリスナー
      element.addEventListener('animationend', function(e) {
        if (e.animationName === 'typing') {
          element.style.borderRight = 'none';
        }
      });
    });
  }
  
  // 回転アニメーションの非同期化
  function randomizeRotations() {
    const rotatingElements = document.querySelectorAll('.rotate360');
    
    rotatingElements.forEach(element => {
      // 回転速度をランダム化
      const speed = 10 + Math.random() * 10;
      const delay = Math.random() * 2;
      const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
      
      element.style.animation = `rotate360 ${speed}s linear ${delay}s infinite ${direction}`;
    });
  }
  
  // 背景パーティクルアニメーション初期化
  function initParticleBackgrounds() {
    // hero セクションにパーティクルキャンバスを追加
    const heroSections = document.querySelectorAll('.hero');
    
    heroSections.forEach(section => {
      // すでにキャンバスがあれば追加しない
      if (section.querySelector('.particle-canvas')) return;
      
      const canvas = document.createElement('canvas');
      canvas.className = 'particle-canvas';
      canvas.dataset.particleCount = '30';
      canvas.dataset.particleConnect = '150';
      
      // キャンバスをセクションの最初の子要素として挿入
      section.insertBefore(canvas, section.firstChild);
    });
    
    // features セクションにもパーティクルを追加
    const featuresSections = document.querySelectorAll('.features');
    
    featuresSections.forEach(section => {
      if (section.querySelector('.particle-canvas')) return;
      
      const canvas = document.createElement('canvas');
      canvas.className = 'particle-canvas';
      canvas.dataset.particleCount = '20';
      canvas.dataset.particleColor = 'rgba(92, 189, 185, 0.5)';
      canvas.dataset.particleConnect = '120';
      
      section.insertBefore(canvas, section.firstChild);
    });
  }
  
  // スクロール方向検出
  let lastScrollTop = 0;
  let scrollDirection = 'down';

  function detectScrollDirection() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    scrollDirection = (st > lastScrollTop) ? 'down' : 'up';
    lastScrollTop = st <= 0 ? 0 : st;
  }
  
  // パララックス効果
  function applyParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      // 画像要素の場合はパララックス効果を適用しない（車の画像の動きを停止するため）
      if (element.tagName.toLowerCase() === 'img') {
        element.style.transform = 'translateY(0)';
        return;
      }
      
      const speed = element.dataset.parallaxSpeed || 0.2;
      const offset = window.pageYOffset * speed;
      
      element.style.transform = `translateY(${offset}px)`;
    });
  }
  
  // ヘッダー透明度の調整
  function adjustHeaderOpacity() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // スクロールが画面の20%を超えたら徐々に透明度を下げる
    if (scrollPosition > windowHeight * 0.2) {
      const opacity = Math.min(1, 0.85 + (scrollPosition - windowHeight * 0.2) / 500);
      header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
      header.style.boxShadow = 'none';
    }
  }
  
  // サービスカード、特徴アイテムのインタラクティブエフェクト強化
  function enhanceInteractiveElements() {
    const cards = document.querySelectorAll('.service-card, .feature-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('hover-effect');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('hover-effect');
      });
    });
  }
  
  // スクロールが一定位置を超えたら「トップに戻る」ボタンを表示
  function initScrollTopButton() {
    // ボタンがまだ存在しない場合のみ作成
    if (!document.querySelector('.scroll-top-btn')) {
      const scrollTopBtn = document.createElement('button');
      scrollTopBtn.className = 'scroll-top-btn';
      scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
      document.body.appendChild(scrollTopBtn);
      
      scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (window.scrollY > window.innerHeight) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  
  // 初期化関数
  function initAnimations() {
    checkAnimations();
    // applyFloatingAnimation(); // 車の浮遊アニメーションを無効化
    initTypingEffect();
    randomizeRotations();
    initParticleBackgrounds();
    enhanceInteractiveElements();
    adjustHeaderOpacity();
    initScrollTopButton();
  }
  
  // イベントハンドラー
  window.addEventListener('scroll', function() {
    detectScrollDirection();
    checkAnimations();
    applyParallaxEffect();
    adjustHeaderOpacity();
    initScrollTopButton();
  });
  
  window.addEventListener('resize', function() {
    checkAnimations();
  });
  
  // 初期チェック
  initAnimations();
  
  // スムーススクロール
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // ヘッダーの高さを考慮
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // モバイルメニューが開いている場合は閉じる
        if (menuToggle && menuToggle.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }
    });
  });
  
  // お問い合わせフォームのバリデーション
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // 名前のバリデーション
      if (!nameInput.value.trim()) {
        showError(nameInput, 'お名前を入力してください');
        isValid = false;
      } else {
        removeError(nameInput);
      }
      
      // メールのバリデーション
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showError(emailInput, 'メールアドレスを入力してください');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, '有効なメールアドレスを入力してください');
        isValid = false;
      } else {
        removeError(emailInput);
      }
      
      // メッセージのバリデーション
      if (!messageInput.value.trim()) {
        showError(messageInput, 'メッセージを入力してください');
        isValid = false;
      } else {
        removeError(messageInput);
      }
      
      // フォームが有効な場合の処理
      if (isValid) {
        // 実際の送信処理はここに追加
        // この例ではアラートを表示するだけ
        alert('お問い合わせありがとうございます。メッセージが送信されました。');
        contactForm.reset();
      }
    });
  }
  
  // エラーメッセージの表示
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
    }
    
    input.classList.add('error');
  }
  
  // エラーメッセージの削除
  function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error');
  }
});
