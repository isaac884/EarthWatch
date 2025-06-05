const map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  minZoom: 1,
  maxZoom: 10,
  maxBounds: [[-85, -180], [85, 180]],
  maxBoundsViscosity: 1.0
});





  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap 貢獻者'
  }).addTo(map);


  fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
    .then(response => response.json())
    .then(data => {
 
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
            `<strong>Location：</strong>${feature.properties.place}<br/>
             <strong>Scale：</strong>${feature.properties.mag}<br/>
             <strong>Time：</strong>${new Date(feature.properties.time).toLocaleString()}`
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

