// 치료케이스 슬라이더 클래스
class CaseSlider {
  constructor() {
    this.slider = document.getElementById('caseSlider');
    this.slideWrapper = this.slider?.querySelector('.case-slide-wrapper');
    this.slides = this.slider?.querySelectorAll('.case-slide');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.tabBtns = document.querySelectorAll('.tab-btn');
    
    this.currentSlide = 0;
    this.filteredSlides = [];
    this.currentCategory = 'all';
    this.slideWidth = 0;
    this.containerWidth = 0;
    this.visibleSlides = 1;
    
    this.init();
  }
  
  init() {
    if (!this.slider) return;
    
    this.calculateDimensions();
    this.setupEventListeners();
    this.filterSlides('all');
    this.updateSlider();
    this.updateButtons();
    
    // 윈도우 리사이즈 시 재계산
    window.addEventListener('resize', () => {
      this.calculateDimensions();
      this.updateSlider();
    });
  }
  
  calculateDimensions() {
    const container = this.slider.closest('.case-slider-container');
    this.containerWidth = container.offsetWidth;
    
    // 실제 DOM 요소의 크기를 기반으로 계산
    if (this.filteredSlides.length > 0) {
      this.slideWidth = this.getSlideActualWidth();
    } else {
      // 반응형 슬라이드 크기 계산 (백업)
      if (window.innerWidth >= 1440) {
        this.slideWidth = 470;
      } else if (window.innerWidth >= 1024) {
        this.slideWidth = 420;
      } else if (window.innerWidth >= 768) {
        this.slideWidth = 350;
      } else {
        this.slideWidth = 256; // 240 + margin
      }
    }
    
    // 가시 슬라이드 수 계산 - 모바일에서도 다중 표시
    this.visibleSlides = Math.min(3, this.filteredSlides.length);
  }
  
  setupEventListeners() {
    // 이전/다음 버튼
    this.prevBtn?.addEventListener('click', () => {
      console.log('이전 버튼 클릭');
      this.prevSlide();
    });
    this.nextBtn?.addEventListener('click', () => {
      console.log('다음 버튼 클릭');
      this.nextSlide();
    });
    
    // 탭 버튼
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        console.log('탭 변경:', category);
        this.filterByCategory(category);
      });
    });
    
    // 키보드 네비게이션 (케이스 슬라이더에서만 동작하도록 제한)
    this.slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
      }
    });
    
    // 터치/스와이프 지원
    this.setupTouchEvents();
  }
  
  setupTouchEvents() {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let isHorizontalSwipe = false;
    
    // 터치 시작
    this.slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      isHorizontalSwipe = false;
    }, { passive: true });
    
    // 터치 이동
    this.slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = Math.abs(currentX - startX);
      const diffY = Math.abs(currentY - startY);
      
      // 수평 스와이프인지 판단 (수평 움직임이 수직 움직임보다 클 때)
      if (diffX > diffY && diffX > 10) {
        isHorizontalSwipe = true;
        e.preventDefault(); // 스크롤 방지
      }
    }, { passive: false });
    
    // 터치 종료
    this.slider.addEventListener('touchend', (e) => {
      if (!isDragging || !isHorizontalSwipe) {
        isDragging = false;
        return;
      }
      
      isDragging = false;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      // 최소 30px 이상 스와이프했을 때만 동작
      if (Math.abs(diffX) > 30) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    }, { passive: true });
  }
  
  filterByCategory(category) {
    // 탭 버튼 활성화 상태 업데이트
    this.tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    this.currentCategory = category;
    this.filterSlides(category);
    this.currentSlide = 0;
    this.calculateDimensions();
    this.updateSlider();
    this.updateButtons();
  }
  
  filterSlides(category) {
    this.filteredSlides = [];
    
    this.slides.forEach((slide, index) => {
      if (category === 'all' || slide.dataset.category === category) {
        slide.classList.remove('hidden');
        this.filteredSlides.push({ element: slide, originalIndex: index });
      } else {
        slide.classList.add('hidden');
      }
    });
  }
  
  prevSlide() {
    if (this.filteredSlides.length <= 1) return;
    
    this.currentSlide = this.currentSlide > 0 
      ? this.currentSlide - 1 
      : this.filteredSlides.length - 1;
    
    this.updateSlider();
    this.updateButtons();
  }
  
  nextSlide() {
    if (this.filteredSlides.length <= 1) return;
    
    this.currentSlide = this.currentSlide < this.filteredSlides.length - 1 
      ? this.currentSlide + 1 
      : 0;
    
    this.updateSlider();
    this.updateButtons();
  }
  
  goToSlide(index) {
    if (index >= 0 && index < this.filteredSlides.length) {
      this.currentSlide = index;
      this.updateSlider();
      this.updateButtons();
    }
  }
  
  updateSlider() {
    if (this.filteredSlides.length === 0) return;
    
    // 중앙 정렬을 위한 오프셋 계산 (더 정확한 계산)
    const slideActualWidth = this.getSlideActualWidth();
    const centerOffset = this.containerWidth / 2 - slideActualWidth / 2;
    const translateX = centerOffset - (this.currentSlide * slideActualWidth);
    
    this.slideWrapper.style.transform = `translateX(${translateX}px)`;
    
    // 중앙 슬라이드 강조
    this.filteredSlides.forEach((slideData, index) => {
      const slide = slideData.element;
      if (index === this.currentSlide) {
        slide.classList.add('center');
      } else {
        slide.classList.remove('center');
      }
    });
  }
  
  getSlideActualWidth() {
    // 실제 슬라이드 엘리먼트의 너비를 계산
    if (this.filteredSlides.length > 0) {
      const slide = this.filteredSlides[0].element;
      const slideStyle = window.getComputedStyle(slide);
      const slideWidth = slide.offsetWidth;
      const marginLeft = parseInt(slideStyle.marginLeft);
      const marginRight = parseInt(slideStyle.marginRight);
      return slideWidth + marginLeft + marginRight;
    }
    return this.slideWidth;
  }
  
  updateButtons() {
    if (!this.prevBtn || !this.nextBtn) {
      console.log('버튼을 찾을 수 없습니다');
      return;
    }
    
    // 슬라이드가 하나뿐이거나 없으면 버튼 비활성화
    if (this.filteredSlides.length <= 1) {
      this.prevBtn.disabled = true;
      this.nextBtn.disabled = true;
    } else {
      this.prevBtn.disabled = false;
      this.nextBtn.disabled = false;
    }
  }
  
  // 자동 재생 기능 (선택사항)
  startAutoPlay(interval = 5000) {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, interval);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  // 반응형 대응
  handleResize() {
    this.calculateDimensions();
    this.updateSlider();
  }
}

// 슬라이더 초기화
document.addEventListener('DOMContentLoaded', function() {
  const caseSlider = new CaseSlider();
  
  // 윈도우 리사이즈 이벤트
  window.addEventListener('resize', () => {
    caseSlider.handleResize();
  });
  
  // 자동 재생 시작 (선택사항 - 필요하면 주석 해제)
  // caseSlider.startAutoPlay(7000);
  
  // 마우스 오버 시 자동 재생 정지 (자동 재생 사용 시)
  // const slider = document.getElementById('caseSlider');
  // slider?.addEventListener('mouseenter', () => caseSlider.stopAutoPlay());
  // slider?.addEventListener('mouseleave', () => caseSlider.startAutoPlay(7000));
});