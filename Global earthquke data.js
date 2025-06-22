// Global earthquake data visualization using Leaflet.js
// This code creates a global map displaying earthquake data from the USGS in real-time.
// This code uses Leaflet.js to create an interactive map that visualizes global earthquake data.
// It fetches the latest earthquake data and visualizes it on a map with circle markers.




const map = L.map('map', {
  center: [20, 0],
  zoom: 2, 
  minZoom: 1, 
  maxZoom: 10, 
  maxBounds: [[-85, -180], [85, 180]], 
  maxBoundsViscosity: 1.0 
});
// Initialize the map with a center point and zoom level
// Prevents the map from panning outside the world.




  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap 貢獻者'
  }).addTo(map);
  // Add OpenStreetMap tile layer to the map for base map visualization

  function chooseColor(depth) {
    return depth > 90 ? "#ff0000" :
           depth > 70 ? "#ff6600" :
           depth > 50 ? "#ff9900" :
           depth > 30 ? "#ffcc00" :
           depth > 10 ? "#ccff33" : "#00ff00";
    }

function markerSize(mag) {
      return mag > 0 ? mag * 1.5 : 1.5;
    }


    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            const depth = feature.geometry.coordinates[2]; 
            const mag = feature.properties.mag;

            return L.circleMarker(latlng, {
              radius: markerSize(mag),
              fillColor: chooseColor(depth),
              color: "#000",
              weight: 0.5,
              opacity: 1,
              fillOpacity: 0.8
            }).bindPopup(
              `<strong>Location：</strong>${feature.properties.place}<br/>
               <strong>Magnitude：</strong>${mag}<br/>
               <strong>Depth：</strong>${depth} km<br/>
               <strong>Time：</strong>${new Date(feature.properties.time).toLocaleString()}`
            );
          }
        }).addTo(map);
      });
// Fetch earthquake data from USGS and visualize it on the map
// The data is fetched in GeoJSON format and displayed as circle markers with popups showing details about each earthquake.


document.querySelector('.menu-button').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
  });
// Toggle the sidebar visibility when the menu button is clicked




