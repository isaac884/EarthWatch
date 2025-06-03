document.querySelector('.menu-button').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
  });



function updateTime() {
  const now = new Date();
  const taiwanTime = now.toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("current-time").textContent = taiwanTime;
}

setInterval(updateTime, 1000); 
updateTime(); 


async function getTaiwanWeather() {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=4701281046de645aaa98836cdd9c9380&units=metric&lang=zh_tw";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // 解析 JSON 結果
    const city = data.name;
    const weather = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;

    // 顯示到網頁上
    document.getElementById("weather-info").textContent =
      `📍 ${city}｜${weather}｜${temp}°C｜濕度：${humidity}%`;
  } catch (error) {
    document.getElementById("weather-info").textContent = "Unable to load weather data";
    console.error("Error", error);
  }
}

// 畫面載入時自動執行
getTaiwanWeather();


async function loadRecentEarthquakes() {
  const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

  try {
    const res = await fetch(url);
    const data = await res.json();

    const quakes = data.features.slice(0, 3); // 前3筆地震

    let html = "";

    quakes.forEach((q, index) => {
      const place = q.properties.place;
      const mag = q.properties.mag;
      const time = new Date(q.properties.time).toLocaleString("zh-TW");
      const depth = q.geometry.coordinates[2];
      const lat = q.geometry.coordinates[1].toFixed(2);
      const lon = q.geometry.coordinates[0].toFixed(2);

      html += `
        <div class="mb-3">
          <strong>Location：</strong> ${place}<br>
          <strong>Time：</strong> ${time}<br>
          <strong>Scale：</strong> M${mag} ｜ 深度：${depth} km<br>
          <strong>Epicenter：</strong> ${lat}°N, ${lon}°E
        </div>
        <hr>
      `;
    });

    document.getElementById("earthquake-list").innerHTML = html;
  } catch (error) {
    document.getElementById("earthquake-list").textContent = "Earthquake data cannot be obtained";
    console.error(error);
  }
}

loadRecentEarthquakes();

const tips = [
 "During an earthquake, immediately drop to the ground, take cover, and hold on.",
"Prepare an emergency shelter bag: water, whistle, medicine, flashlight.",
"Stay away from windows and hanging objects during an earthquake.",
"Families should agree on a meeting place and contact information in advance.",
"Keep the radio or mobile phone connected to the phone and get instant messages.",
"Avoid taking the elevator during a disaster and use the stairs to escape.",
"Keep the phone charged when using it to avoid running out of power.",
"Prepare emergency contact cards at all times and stick them in your wallet or phone.",
"Schools or companies should plan evacuation drills and safe routes.",
"After an earthquake, pay attention to whether there is a gas leak and close the main valve if necessary.",
"Be sure to bring your ID and basic medicines when evacuating.",
"If you are outdoors, stay away from buildings, power lines, and lamp posts.",
"Do not drive immediately during an earthquake. Stay calm and observe the situation.",
"Be familiar with the shelters and open spaces around your home.",
"Pay attention to landslide warnings and flooding risks in low-lying areas during heavy rain."
];


function showRandomTip() {
  const randomIndex = Math.floor(Math.random() * tips.length);
  document.getElementById("tip-text").textContent = tips[randomIndex];
}

showRandomTip();
setInterval(showRandomTip, 5000); 