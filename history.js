const startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();


 const url = new URL('https://earthquake.usgs.gov/fdsnws/event/1/query');
 url.searchParams.set('format', 'geojson');
 url.searchParams.set('starttime', startTime);
 url.searchParams.set('orderby', 'time');
 url.searchParams.set('minmagnitude', '4.5'); 
 url.searchParams.set('limit', '50');

 /
 fetch(url)
   .then(res => res.json())
   .then(data => {
     const container = document.getElementById('quake-container');
     container.innerHTML = ''; 

     if (data.features.length === 0) {
       container.innerHTML = '<p>No earthquake records were found.</p>';
       return;
     }

     data.features.forEach((quake, i) => {
       const p = quake.properties;
       const time = new Date(p.time).toLocaleString();
       const el = document.createElement('div');
       el.className = 'quake-card';
       el.innerHTML = `
         <div class="quake-title" style="color: black;" >#${i + 1} ${p.place}</div>
         <div style="color: black;">Time：${time}</div>

         <div style="color: black;">Magnitude：${p.mag}</div>
         
       `;
       container.appendChild(el);
     });
   })
   .catch(err => {
     document.getElementById('quake-container').innerHTML = '<p>Unable to load earthquake data.</p>';
     console.error('Error：', err);
   });

   
document.querySelector('.menu-button').addEventListener('click', function () {
document.querySelector('.sidebar').classList.toggle('active');
});

function scrollNext() {
document.getElementById('next').scrollIntoView({ behavior: 'smooth' });
}
