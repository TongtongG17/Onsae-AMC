// main.js
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeOverlay = document.getElementById('close-overlay');
    const headerContainer = document.querySelector('.header-container');
    const menuTitles = document.querySelectorAll('.menu-title');
    const headerIcon = document.querySelector('.logo');
    const headerWrap = document.querySelector('.header-wrap');
    
    // 스크롤 이벤트 - 헤더 색상 변경
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            headerWrap.classList.add('scrolled');
        } else {
            headerWrap.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 햄버거 메뉴 토글
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            closeOverlay.classList.toggle('active');
            headerContainer.classList.toggle('active');
            headerIcon.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // 오버레이 클릭으로 메뉴 닫기
    if (closeOverlay) {
        closeOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }

    // 서브메뉴 토글
    menuTitles.forEach(title => {
        title.addEventListener('click', function() {
            const menuType = this.getAttribute('data-menu');
            const subMenu = document.getElementById(menuType + '-menu');
            
            // 현재 메뉴가 열려있는지 확인
            const isExpanded = this.classList.contains('expanded');
            
            // 모든 메뉴 닫기
            menuTitles.forEach(t => {
                t.classList.remove('expanded');
                const menu = document.getElementById(t.getAttribute('data-menu') + '-menu');
                if (menu) {
                    menu.classList.remove('expanded');
                }
            });
            
            // 클릭한 메뉴가 닫혀있었다면 열기
            if (!isExpanded && subMenu) {
                this.classList.add('expanded');
                subMenu.classList.add('expanded');
            }
        });
    });

    // 서브메뉴 아이템 클릭 이벤트
    document.querySelectorAll('.sub-menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const menuText = this.textContent.trim();
            console.log('선택된 메뉴:', menuText);
            
            // 여기에 실제 페이지 이동 로직 추가
            // 예: window.location.href = '/병원소개/인삿말/';
            
            // 메뉴 닫기
            closeMenu();
        });
    });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // 메뉴 닫기 함수
    function closeMenu() {
        if (menuBtn) menuBtn.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (closeOverlay) closeOverlay.classList.remove('active');
        if (headerContainer) headerContainer.classList.remove('active');
        if (headerIcon) headerIcon.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});