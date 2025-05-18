// 네이버 맵 API 콜백 함수로 사용될 전역 함수
window.initMap = function() {
    console.log("네이버 맵 API 로드 완료");
    // 지도 요소가 존재하는지 확인
    if (document.getElementById('map')) {
        // 지도 객체가 존재하는 경우에만 실행
        // 현재 페이지 경로 확인
        var currentPath = window.location.pathname;
        var isLocationPage = currentPath.includes('/location/');
        
        // 지도 옵션 설정
        var mapOptions = {
            center: new naver.maps.LatLng(37.270835, 127.013005), // 온새동물의료센터 좌표
            zoom: isLocationPage ? 17 : 15, // 위치 페이지면 더 확대
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            }
        };
        
        var map = new naver.maps.Map('map', mapOptions);
        
        // 마커 생성
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(37.270835, 127.013005),
            map: map
        });
        
        // 정보창(말풍선) 코드는 완전히 제거됨
    }
};

// 암튼 api도 좀 수정 ㅅㅂ