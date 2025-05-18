function initMap() {
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.2533329, 127.0723331), // 온새동물의료센터 좌표
        zoom: 17,
        minZoom: 10,
        maxZoom: 19,
        useStyleMap: true,
        mapTypeControl: false, // 지도 유형 컨트롤 숨김
        zoomControl: true,
        zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT
        }
    });
    
    // 마커 생성
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.2533329, 127.0723331),
        map: map
    });
    
    // 정보창 내용
    var contentString = [
        '<div style="padding:10px;">',
        '   <h4 style="margin:0;">온새동물의료센터</h4>',
        '   <p style="margin:5px 0 0 0;">경기도 수원시 영통구 봉영로 1587<br>2층 201호 (다모아프라자)</p>',
        '</div>'
    ].join('');
    
    // 정보창 생성
    var infowindow = new naver.maps.InfoWindow({
        anchorSize: new naver.maps.Size(15, 5),
        pixelOffset: new naver.maps.Point(0, -10)
    });
    
    // 마커 클릭 이벤트
    naver.maps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });
    
    // 초기에 정보창 열기
    infowindow.open(map, marker);
}