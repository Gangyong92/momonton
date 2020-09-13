const topInfo = document.querySelector(".top-info"),
  qsWeather = topInfo.querySelector(".js-weather"),
  qsWind = topInfo.querySelector(".js-wind"),
  qsWindInfo = qsWind.querySelector(".js-windinfo"),
  qsTemperature = topInfo.querySelector(".js-temperature"),
  qsTemperatureInfo = qsTemperature.querySelector(".js-temperatureinfo"),
  qsPlace = topInfo.querySelector(".js-place"),
  qsPlaceInfo = qsPlace.querySelector(".js-placeinfo");

const API_KEY = "3f77e9643364891f97fc49111a712b30";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); // 응답의 json 정보가 필요함
    })
    .then(function (json) {
      console.dir(json);
      const temperature = json.main.temp;
      const placeName = json.name;
      const weather = json.weather[0].description;
      const windDegree = json.wind.deg;
      const windSpeed = json.wind.speed;
      qsWeather.innerText = `${weather}`;
      qsWindInfo.innerText = `${windSpeed}m/s ${windDegree}°`;
      qsTemperatureInfo.innerText = `${temperature}℃`;
      qsPlaceInfo.innerText = `${placeName}`;
    });
  // fetch 작업이 끝날때까지 기다리기 위해 then 함수를 사용
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

/* 위치 확인창에서 허용 누른경우 */
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // key 이름과 넣을 변수 이름이 같으면 한번만 적으면 됨
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

/* 위치 확인창에서 x 누른경우 */
function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
