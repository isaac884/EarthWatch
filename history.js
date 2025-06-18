// Fetch earthquake data from the USGS Earthquake API and display it in a card format
// This script fetches earthquake data from the USGS Earthquake API and displays it in a card format on a webpage.


 const now = new Date();
 const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
 const startTime = sevenDaysAgo.toISOString();
// Calculate the start time for the query as 7 days ago in ISO format



 const url = new URL('https://earthquake.usgs.gov/fdsnws/event/1/query');
 url.searchParams.set('format', 'geojson');
 url.searchParams.set('starttime', startTime);
 url.searchParams.set('orderby', 'time');
 url.searchParams.set('minmagnitude', '2'); 
 url.searchParams.set('limit', '50');
// Set the parameters for the query, including format, start time, order by time, minimum magnitude, and limit
 
 fetch(url)
   .then(res => res.json())
   .then(data => {
     const container = document.getElementById('container');
     container.innerHTML = ''; 
    // Clear the container before displaying new data
     if (data.features.length === 0) {
       container.innerHTML = '<p>No earthquake records were found.</p>';
       return;
     }
      // If no earthquake records are found, display a message

     data.features.forEach((quake, i) => {
       const p = quake.properties;
       const time = new Date(p.time).toLocaleString();
       const el = document.createElement('div');
       el.className = 'card';
       el.innerHTML = `
         <div class="quake-title" style="color: black;" >#${i + 1} ${p.place}</div>
         <div style="color: black;">Time：${time}</div>

         <div style="color: black;">Magnitude：${p.mag}</div>
       `;
       container.appendChild(el);
     });
     // Create a card for each earthquake and append it to the container
   })
   .catch(err => {
     document.getElementById('container').innerHTML = '<p>Unable to load earthquake data.</p>';
     console.error('Error：', err);
   });
// Fetch earthquake data from the USGS Earthquake API and display it in a card format

   
document.querySelector('.menu-button').addEventListener('click', function () {
document.querySelector('.sidebar').classList.toggle('active');
});
// Toggle the sidebar visibility when the menu button is clicked

