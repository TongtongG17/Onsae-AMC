// 외과 페이지 JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // AOS 초기화
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0
    });
  }

  // 수술 과정 단계별 애니메이션
  function initProcessAnimation() {
    const processSteps = document.querySelectorAll('.process-step');
    const arrows = document.querySelectorAll('.process-arrow');
    
    // Intersection Observer를 사용하여 뷰포트에 들어올 때 애니메이션 실행
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // 각 단계에 observer 적용
    processSteps.forEach((step, index) => {
      step.style.animationDelay = `${index * 0.2}s`;
      observer.observe(step);
    });

    // 화살표 애니메이션
    arrows.forEach((arrow, index) => {
      arrow.style.animationDelay = `${(index + 1) * 0.2 + 0.1}s`;
      observer.observe(arrow);
    });
  }

  // 특징 카드 호버 효과
  function initFeatureCardEffects() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        
        const iconCircle = this.querySelector('.icon-circle');
        if (iconCircle) {
          iconCircle.style.transform = 'scale(1.15) rotate(5deg)';
        }
      });

      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
        
        const iconCircle = this.querySelector('.icon-circle');
        if (iconCircle) {
          iconCircle.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }

  // 수술 종류 카테고리 애니메이션
  function initTypesCategoryAnimation() {
    const categories = document.querySelectorAll('.type-category');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });

    categories.forEach(category => {
      category.style.opacity = '0';
      category.style.transform = 'translateY(20px)';
      category.style.transition = 'all 0.6s ease';
      observer.observe(category);
    });
  }

  // 타임라인 아이템 순차 애니메이션
  function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('timeline-animate');
          }, index * 200);
        }
      });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }

  // 특징 이미지 클릭 확대/축소 기능
  function initProcessImageEvents() {
    console.log('이미지 확대 기능 초기화 시작');
    
    const featureImages = document.querySelectorAll('.feature-image');
    console.log('발견된 이미지 개수:', featureImages.length);
    
    featureImages.forEach(function(imageContainer, index) {
      console.log('이미지', index, '이벤트 리스너 추가');
      
      // 클릭 이벤트
      imageContainer.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('이미지 클릭됨:', index);
        
        // 현재 확대 상태 확인
        const isExpanded = this.classList.contains('expanded');
        console.log('현재 확대 상태:', isExpanded);
        
        // 모든 이미지 축소
        featureImages.forEach(function(otherImage) {
          otherImage.classList.remove('expanded');
          console.log('다른 이미지 축소');
        });
        
        // 현재 이미지가 축소 상태였다면 확대
        if (!isExpanded) {

          
          // 확대 시 스크롤
          setTimeout(function() {
            imageContainer.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }, 100);
        } else {
        }
      });

      // 키보드 접근성
      imageContainer.setAttribute('tabindex', '0');
      imageContainer.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // ESC 키로 모든 확대 해제
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        featureImages.forEach(function(imageContainer) {
          imageContainer.classList.remove('expanded');
        });
      }
    });

  }

  // 스크롤 시 헤더 효과 (선택사항)
  function initScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 수술 과정 섹션에서 고정 효과
      const processSection = document.querySelector('.surgery-process');
      if (processSection) {
        const rect = processSection.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          processSection.classList.add('sticky-active');
        } else {
          processSection.classList.remove('sticky-active');
        }
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // 페이지 로딩 애니메이션
  function initPageLoadAnimation() {
    const surgeryIntro = document.querySelector('.surgery-intro');
    if (surgeryIntro) {
      surgeryIntro.style.opacity = '0';
      surgeryIntro.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        surgeryIntro.style.transition = 'all 0.8s ease';
        surgeryIntro.style.opacity = '1';
        surgeryIntro.style.transform = 'translateY(0)';
      }, 200);
    }
  }

  // 터치 디바이스 최적화
  function initTouchOptimization() {
    if ('ontouchstart' in window) {
      // 터치 디바이스에서 호버 효과 개선
      const hoverElements = document.querySelectorAll('.feature-item, .type-category, .timeline-item');
      
      hoverElements.forEach(element => {
        element.addEventListener('touchstart', function() {
          this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
          setTimeout(() => {
            this.classList.remove('touch-active');
          }, 150);
        });
      });
    }
  }

  // 접근성 개선
  function initAccessibility() {
    // 키보드 네비게이션 개선
    const focusableElements = document.querySelectorAll(
      '.process-step, .feature-item, .type-category, .timeline-item, .feature-image'
    );

    focusableElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.style.outline = '2px solid #3b5d3b';
        this.style.outlineOffset = '2px';
      });

      element.addEventListener('blur', function() {
        this.style.outline = 'none';
      });
    });
  }

  // 에러 처리
  function handleErrors() {
    window.addEventListener('error', function(e) {
      console.warn('외과 페이지 스크립트 오류:', e.error);
    });

    // 이미지 로딩 오류 처리
    const images = document.querySelectorAll('.surgery-process img, .feature-image img');
    images.forEach(img => {
      img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = '이미지를 불러올 수 없습니다';
        console.warn('이미지 로딩 실패:', this.src);
      });
      
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
    });
  }

  // 모든 초기화 함수 실행
  try {
    initPageLoadAnimation();
    initProcessAnimation();
    initFeatureCardEffects();
    initTypesCategoryAnimation();
    initTimelineAnimation();
    initProcessImageEvents(); // 이미지 확대 기능
    initScrollEffects();
    initTouchOptimization();
    initAccessibility();
    handleErrors();
    
  } catch (error) {
    console.error('외과 페이지 초기화 중 오류:', error);
  }

  // 창 크기 변경 시 레이아웃 재계산
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // 확대된 이미지가 있다면 리사이즈 시 축소
      const expandedImages = document.querySelectorAll('.feature-image.expanded');
      expandedImages.forEach(img => {
        img.classList.remove('expanded');
      });

    }, 250);
  });
});