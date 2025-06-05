onst startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();


 // 建立 ComCat API URL
 const url = new URL('https://earthquake.usgs.gov/fdsnws/event/1/query');
 url.searchParams.set('format', 'geojson');
 url.searchParams.set('starttime', startTime);
 url.searchParams.set('orderby', 'time');
 url.searchParams.set('minmagnitude', '4.5'); // 顯示震級 4.5 以上
 url.searchParams.set('limit', '50');

 // 拉取資料並顯示
 fetch(url)
   .then(res => res.json())
   .then(data => {
     const container = document.getElementById('quake-container');
     container.innerHTML = ''; // 清空

     if (data.features.length === 0) {
       container.innerHTML = '<p>沒有找到地震紀錄。</p>';
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
     document.getElementById('quake-container').innerHTML = '<p>無法載入地震資料。</p>';
     console.error('錯誤：', err);
   });

   
document.querySelector('.menu-button').addEventListener('click', function () {
document.querySelector('.sidebar').classList.toggle('active');
});

function scrollNext() {
document.getElementById('next').scrollIntoView({ behavior: 'smooth' });
}
