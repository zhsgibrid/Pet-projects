function initMap() {

    const uluru = { lat: 50.5104, lng: 30.5419 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: uluru,
    });
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
    }

    window.initMap = initMap;
