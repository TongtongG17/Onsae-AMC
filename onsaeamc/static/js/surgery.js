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
})