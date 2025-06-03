
   const map = L.map('map', {  center: [20, 120],
  zoom: 3,
  minZoom: 2,  // 不讓它變太小
  maxZoom: 10, 
  maxBounds: [
    [-85, -180], // 最南最西
    [85, 180]    // 最北最東
  ],
  maxBoundsViscosity: 1.0}).setView([20, 0], 2);


  // 加入 OpenStreetMap 圖層
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap 貢獻者'
  }).addTo(map);

  // 取得 USGS 的地震資料
  fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
    .then(response => response.json())
    .then(data => {
      // 將地震資料加入地圖
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: feature.properties.mag * 2,
            fillColor: '#f03',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          }).bindPopup(
            `<strong>地點：</strong>${feature.properties.place}<br/>
             <strong>規模：</strong>${feature.properties.mag}<br/>
             <strong>時間：</strong>${new Date(feature.properties.time).toLocaleString()}`
          );
        }
      }).addTo(map);
    });

document.querySelector('.menu-button').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
  });

function scrollNext() {
    document.getElementById('next').scrollIntoView({ behavior: 'smooth' });
  }

