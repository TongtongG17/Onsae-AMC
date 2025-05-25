// 병원 시설 갤러리 Swiper 초기화
document.addEventListener('DOMContentLoaded', function() {
  
  // 장비 정보 데이터
  const equipmentData = [
    {
      title: "X-ray – Poskom 400mA",
      description: "엑스레이 검사는 골격, 흉부, 복부 장기의 구조적 이상을 빠르고 정확하게 확인할 수 있는 영상 진단 방법입니다. 특히 골절, 관절 질환, 심장비대, 폐 질환, 방광결석, 장폐색 등의 진단에 필수적인 검사로 정확한 진료 방향을 결정하는 데 큰 역할을 합니다."
    },
    {
      title: "Vcheck 200",
      description: "Vcheck 200은 질병 마커를 빠르고 정밀하게 측정할 수 있는 동물 전용 면역학적 진단 장비입니다. 소량의 혈액만으로 호르몬 (T4, Cortisol 등), 심장 마커 (NT-proBNP, cTnI), 염증 지표 (CRP, SAA), 췌장염 마커 (cPL, fPL) 등 다양한 질환 관련 수치를 10~15분 이내에 정밀하게 분석할 수 있습니다. 국내외 다수의 1차 및 2차 동물병원에서 널리 사용하는 장비로 정확한 수치 기반 진료를 가능하게 합니다."
    },
    {
      title: "초음파 – Samsung V6",
      description: "2차병원 급 초음파 진단기로 간, 담낭, 신장, 방광, 자궁, 췌장, 비장 등 복부 장기는 물론 심장 구조 및 기능 평가(심장 초음파)에도 활용됩니다. 고해상도 영상으로 정밀한 진단이 가능하며, 실시간 검사를 통해 즉시 결과 확인이 가능합니다."
    },
    {
      title: "혈청화학분석기 – FUJI NX600",
      description: "후지 NX600은 고성능 혈청화학 분석기로 간, 신장, 전해질, 췌장, 혈당 등 다양한 항목을 정확하고 빠르게 분석할 수 있는 최신 장비입니다. 현장에서 직접 검사 가능해 응급 환자나 마취 전 검사, 노령견 건강검진 등 다양한 상황에서 즉시 진단과 치료 방향 설정이 가능합니다."
    },
    {
      title: "호흡마취기 – Mindray veta5",
      description: "설계된 최신형 호흡 마취기로 전신마취가 필요한 각종 수술 및 시술 시 정확하고 안전한 마취 관리를 가능하게 합니다. 정밀한 가스 조절 기능과 안정적인 산소 공급 시스템, 소형 동물부터 대형 동물까지 대응 가능한 마취 회로를 갖추고 있어 환자의 체구와 상태에 맞는 맞춤형 마취가 가능합니다. 특히 마취 깊이 조절이 정밀하고 가스 누출 방지 구조와 응급 시 수동 제어 기능도 탑재되어 있어 환자의 안전성을 최우선으로 고려한 장비입니다."
    },
    {
      title: "Dental X-ray – Remex",
      description: "구강 내 엑스레이는 눈에 보이지 않는 치아 뿌리, 턱뼈, 잇몸 속 병변까지 확인할 수 있는 필수 치과 진단 장비입니다. 겉으로는 정상이더라도 치근염, 치아흡수병변, 골소실, 매복치, 턱뼈 병변 등이 엑스레이를 통해 발견되는 경우가 많습니다."
    },
    {
      title: "혈구분석기 – vet ABC plus",
      description: "Vet abc Plus는 동물 전용 자동 혈구 분석기로 적혈구, 백혈구, 혈소판 등 주요 혈액 성분을 정확하고 빠르게 분석할 수 있는 장비입니다. 이 장비는 15가지 이상의 혈액 지표를 수치화하여 빈혈, 감염, 염증, 면역 반응, 출혈 위험성 등을 정확하게 파악할 수 있어 기초 건강검진은 물론 응급진단까지 폭넓게 활용됩니다. 검체 한 방울로 약 1분 내 결과를 도출할 수 있어 특히 마취 전 검사, 노령동물 정기검진, 갑작스러운 증상 평가에 매우 유용합니다."
    },
    {
      title: "초음파 수술기 – sonoblade",
      description: "Sonoblade는 수의용 초음파 수술기로, 초당 55.5kHz의 고주파 진동을 이용하여 조직을 절개하고 동시에 혈관을 밀봉하는 기능을 제공합니다. 이러한 기술은 수술 시간을 단축하고 출혈을 최소화하여 수술의 효율성과 안전성을 높입니다."
    }
  ];

  // 장비 설명 업데이트 함수
  function updateEquipmentDescription(index) {
    const titleElement = document.getElementById('equipmentTitle');
    const descElement = document.getElementById('equipmentDesc');
    const descriptionContainer = document.querySelector('.equipment-description');
    
    if (titleElement && descElement && equipmentData[index]) {
      // 애니메이션 효과
      descriptionContainer.classList.add('updating');
      
      setTimeout(() => {
        titleElement.textContent = equipmentData[index].title;
        descElement.textContent = equipmentData[index].description;
        
        descriptionContainer.classList.remove('updating');
        descriptionContainer.classList.add('updated');
        
        setTimeout(() => {
          descriptionContainer.classList.remove('updated');
        }, 300);
      }, 200);
    }
  }
  
  // 썸네일 Swiper 초기화 (먼저 생성)
  const thumbSwiper = new Swiper(".thumbGallerySwiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    
    // 반응형 설정
    breakpoints: {
      // 모바일
      320: {
        slidesPerView: 4,
        spaceBetween: 8
      },
      // 태블릿
      768: {
        slidesPerView: 6,
        spaceBetween: 12
      },
      // PC
      1024: {
        slidesPerView: 8,
        spaceBetween: 15
      }
    },
    
    // 키보드 네비게이션
    keyboard: {
      enabled: true,
    },
    
    // 터치 제스처
    touchRatio: 1,
    touchAngle: 45,
    threshold: 5,
  });

  // 메인 갤러리 Swiper 초기화 (썸네일과 연결)
  const mainSwiper = new Swiper(".mainGallerySwiper", {
    loop: true,
    spaceBetween: 10,
    
    // 네비게이션 버튼
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    // 썸네일과 연결
    thumbs: {
      swiper: thumbSwiper,
    },
    
    // 키보드 네비게이션
    keyboard: {
      enabled: true,
    },
    
    // 마우스휠 네비게이션
    mousewheel: {
      releaseOnEdges: true,
    },
    
    // 터치 제스처 설정
    touchRatio: 1,
    touchAngle: 45,
    threshold: 5,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    
    // 슬라이드 전환 효과
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    
    // 속도 설정
    speed: 600,
    
    // 이벤트 핸들러
    on: {
      init: function() {
        console.log('병원 시설 갤러리가 초기화되었습니다.');
        // 초기 장비 설명 표시
        updateEquipmentDescription(0);
      },
      
      slideChange: function() {
        // 슬라이드 변경 시 장비 설명 업데이트
        const realIndex = this.realIndex;
        updateEquipmentDescription(realIndex);
        console.log('현재 슬라이드:', realIndex);
      },
      
      // 이미지 로딩 완료 시
      imagesReady: function() {
        console.log('모든 이미지 로딩 완료');
      }
    }
  });

  // 썸네일 클릭 시 메인 이미지 변경 (추가 이벤트)
  const thumbSlides = document.querySelectorAll('.thumbGallerySwiper .swiper-slide');
  thumbSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      mainSwiper.slideTo(index);
      updateEquipmentDescription(index);
    });
    
    // 키보드 접근성
    slide.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mainSwiper.slideTo(index);
        updateEquipmentDescription(index);
      }
    });
    
    // 탭 접근 가능하도록 설정
    slide.setAttribute('tabindex', '0');
    slide.setAttribute('role', 'button');
    slide.setAttribute('aria-label', `${equipmentData[index]?.title || '시설 이미지'} ${index + 1} 보기`);
  });

  // 메인 슬라이드에 ARIA 레이블 추가 (접근성)
  const mainSlides = document.querySelectorAll('.mainGallerySwiper .swiper-slide');
  mainSlides.forEach((slide, index) => {
    slide.setAttribute('aria-label', `${equipmentData[index]?.title || '병원 시설 이미지'} ${index + 1}`);
  });

  // 창 크기 변경 시 Swiper 재계산
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (mainSwiper && thumbSwiper) {
        mainSwiper.update();
        thumbSwiper.update();
      }
    }, 250);
  });

  // 이미지 지연 로딩 오류 처리
  const images = document.querySelectorAll('.facilities-gallery img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.warn('이미지 로딩 실패:', this.src);
      // 기본 이미지로 대체하거나 오류 처리
      this.style.opacity = '0.5';
      this.alt = '이미지를 불러올 수 없습니다';
    });
    
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  });

  // 터치 디바이스에서 호버 효과 개선
  if ('ontouchstart' in window) {
    const hoverElements = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
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
});