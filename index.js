// openweather api
// import { ApiKey } from './config.js';

const myApiKey = '3070eaa7419d6c64f2a80da9e8f61d48';

const domClasses = {
  date: document.querySelector('.currentdate'),
  weather: document.querySelector('.weatherstat'),
  weatherConditions: document.querySelector('.weather_conditions'),
  dailyConditions: document.querySelector('.days_forecast'),
  icon: document.querySelector('.currentweathericon'),
  mychart: document.querySelector('.weather_forecast'),
  searchLocation:document.querySelector('.searchbtn'),
  serachedInput:document.querySelector('.searchinput')
};

const displayDate = () => {
  const months = [
    'January', //28
    'February',
    'March',
    'April', //30 3
    'May',
    'June', //30 5
    'July',
    'August',
    'September', //30 8
    'October',
    'November', //30 10
    'December',
  ];

  const Days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const Day = currentDate.getDay();
  const currentHour = currentDate.getHours();

  const todaysDay = Days[Day];
  const Month = months[currentMonth];

  let daysCount = [];
  const countDown = (n) => {
    if (n <= 0) {
      return; //base
    } else {
      if (Day + n >= 7) {
        daysCount.unshift(Days[Day + n - 7]);
      } else {
        daysCount.unshift(Days[Day + n]);
      }

      countDown(n - 1); //recursive
      return daysCount;
    }
  };
  countDown(5);

  let hourCount = [];
  const countDwn = (n) => {
    if (n <= 0) {
      return; //base
    } else {
      if (currentHour + n >= 24) {
        currentHour + n - 24 < 10
          ? hourCount.unshift(`0${currentHour + n - 24}:00`)
          : hourCount.unshift(`${currentHour + n - 24}:00`);
      } else {
        currentHour + n < 10
          ? hourCount.unshift(`0${currentHour + n}:00`)
          : hourCount.unshift(`${currentHour + n}:00`);
      }

      countDwn(n - 1); //recursive
      return hourCount;
    }
  };
  countDwn(10);

  const currentTimeStamp = {
    currentDay: currentDay,
    todaysDay: todaysDay,
    Month: Month,
    currentYear: currentYear,
    daysCount: daysCount,
    hourCount: hourCount,
  };

  return currentTimeStamp;
};

const uiDate = (currentDay, todaysDay, Month, currentYear) => {
  let year = currentYear.toString();
  const dateHtml = `
                <span> ${todaysDay.slice(0, 3)}, ${currentDay} ${Month.slice(
    0,
    3
  )} '${year.slice(2, 4)}</span>
                `;
  return dateHtml;
};

const weatherUi = (city, temp, condition, date) => {
  const weatherDetails = `
              <div>
              <h4 class="temp">${Math.floor(temp)}&deg;</h4>
            </div>
            <div class="locdate">
                <div class="location">
                    <h2>${city}</h1>
                    <p>${date}</p>
                </div>    
            </div>
            <div>
                <p class="cloud">${condition}</p>
            </div>
              `;

  domClasses.weather.insertAdjacentHTML('afterbegin', weatherDetails);
};

const weatherConds = (wind, humidity, pressure, uv, min) => {
  const condition = `
                        <h4 class="conditions_head">Weather conditions</h4>
                        <div class="conditondiv">
                          <div class="condition wind"><div><img src="img/wind.svg" class="icons">Wind </div><div class="conditionvalue">${wind}m/s</div></div>
                          <div class="condition Precipitation"><div><img src="img/barometer.svg" class="icons">Pressure</div> <div class="conditionvalue">${pressure}atm</div></div>
                          <div class="condition Humidity"><div><img src="img/humidity.svg" class="icons">Humidity</div> <div class="conditionvalue">${humidity}%</div></div>
                          <div class="condition wind"><div><img src="img/uv-protection.svg" class="icons">UV</div> <div class="conditionvalue">${uv}</div></div>
                        </div>
                        `;
  domClasses.weatherConditions.insertAdjacentHTML('afterbegin', condition);
};

const tenTemp = (el) => {
  const arr = el.map((cur) => cur.temp);
  return arr;
};

const lineChart = (hours, hourForecast) => {

  const chart = document.querySelector('#myChart');
  chart.remove();
  domClasses.mychart.innerHTML = ' ';

  domClasses.mychart.insertAdjacentHTML(
    'afterbegin',
    '<canvas id="myChart" height="190" aria-label="weather forecast chart" role="img"></canvas>'
  );

  let lineChart = document.querySelector('#myChart');
  var chartjs = new Chart(lineChart, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [
        {
          label: 'Hourly Weather',
          data: hourForecast,
          backgroundColor: 'rgba(17, 119, 229, 0.6)',
          borderColor: 'rgba(17, 119, 229, 0.3)',
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'rgba(17, 119, 229, 0.7)',
          pointHoverBorderColor: 'rgba(17, 119, 229, 0.9)',
          pointHoverBorderWidth: 3,
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function (tooltipItems, data) {
            return tooltipItems.yLabel + '°C';
          },
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
      legend: {
        // display:false
      },
    },
  });
};

const iconUi = (icon) => {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;

  domClasses.icon.setAttribute('src', iconUrl);
};

const dailyUI = (day, Temperature, weather) => {
  for (let i = 0; i < 6; i++) {
    const UI = `
              <div class="day">
                  <div class="">${day[i]}</div>
                  <div class="dayCondition">
                      <img src="http://openweathermap.org/img/wn/${
                        weather[i]['0'].icon
                      }@2x.png" class="dayIcon">
                      <br>
                      <span class="cond">${weather[i]['0'].description}</span>
                  </div>
                  <div class="daytemp">${Math.floor(
                    Temperature[i].temp.min
                  )}&deg;c/${Math.floor(Temperature[i].temp.max)}&deg;c</div>
              </div>
              `;

    domClasses.dailyConditions.insertAdjacentHTML('beforeend', UI);
  }
};

const HourlyWeather = (lat, long) => {
  async function currentLocation() {
    try {
      //loader

      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${myApiKey}`
      ); //daily and hourly forecast

      // console.log(data)
      const weather = await data.json();
      // console.log(weather)

      weatherConds(
        weather.current.wind_speed,
        weather.current.humidity,
        weather.current.pressure,
        weather.current.uvi,
        weather.current.dew_point
      );
      // console.log(weather.hourly)
      const tempHour = tenTemp(weather.hourly);
      const HourlyW = tempHour.slice(0, 10);
      const dailyW = weather.daily.slice(1, 6);
      const date = displayDate();
      lineChart(date.hourCount, HourlyW);

      const dayWeather = dailyW.map((el) => {
        return el.weather;
      });
      //Prepare UI
      //remove loader

      // console.log(dayWeather);
      dailyUI(date.daysCount, dailyW, dayWeather);

      
    } catch (error) {
      console.log(error);
    }
  }
  currentLocation();
};

/**************************************** window load current weather **********************************************/
const weatherController = () => {
  const weatherData = {};

  //get current location weather
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition); //showPosition function with parameter position
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  getLocation();

  function showPosition(position) {
    var locationlat = position.coords.latitude;
    var locationlong = position.coords.longitude;
    // console.log(locationlat, locationlong)
    currentLocation(locationlat, locationlong);
    HourlyWeather(locationlat, locationlong);
  }

  async function currentLocation(lat, long) {
    try {
      // loader

      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myApiKey}&units=metric`
      ); //current weather

      const currentWeather = await data.json();
      // console.log(currentWeather)
      weatherData.cityName = currentWeather.name;
      weatherData.weather = currentWeather.weather;
      weatherData.temperature = currentWeather.main;
      weatherData.wind = currentWeather.wind;
      // console.log(weatherData)

      //prepare UI
      //remove loader

      //display current weather
      const date = displayDate();
      weatherUi(
        weatherData.cityName,
        weatherData.temperature.temp,
        weatherData.weather[0].description,
        uiDate(date.currentDay, date.todaysDay, date.Month, date.currentYear)
      );
      iconUi(weatherData.weather[0].icon);
    } catch (error) {
      console.log(error);
    }
  }
};

window.addEventListener('load', weatherController);

/**************************************search city weather**********************************************************/


const searchedHourlyWeather = (lat,long) => {
  async function searchedLocation() {
    try {
      //loader

      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${myApiKey}`
      ); //daily and hourly forecast

      // console.log(data)
      const weather = await data.json();
      console.log(weather)

      weatherConds(
        weather.current.wind_speed,
        weather.current.humidity,
        weather.current.pressure,
        weather.current.uvi,
        weather.current.dew_point
      );
      // console.log(weather.hourly)
      const tempHour = tenTemp(weather.hourly);
      const HourlyW = tempHour.slice(0, 10);
      const dailyW = weather.daily.slice(1, 6);
      const date = displayDate();
      lineChart(date.hourCount, HourlyW);

      const dayWeather = dailyW.map((el) => {
        return el.weather;
      });
      //Prepare UI
      //remove loader

      // console.log(dayWeather);
      dailyUI(date.daysCount, dailyW, dayWeather);

      
    } catch (error) {
      console.log(error);
    }
  }
  searchedLocation()
};

/**************************************** window load current weather **********************************************/
const searchedWeatherController = (searchInput) => {
  const weatherData = {};



  async function currentLocation() {
    try {
      // loader

      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${myApiKey}&units=metric`
      ); //current weather

      const currentWeather = await data.json();
      // console.log(currentWeather)
      weatherData.cityName = currentWeather.name;
      weatherData.weather = currentWeather.weather;
      weatherData.temperature = currentWeather.main;
      weatherData.wind = currentWeather.wind;
      weatherData.coord = currentWeather.coord
      // console.log(weatherData)
      searchedHourlyWeather(weatherData.coord.lat,weatherData.coord.lon)


      //prepare UI
      //remove loader

      //display current weather
      const date = displayDate();
      weatherUi(
        weatherData.cityName,
        weatherData.temperature.temp,
        weatherData.weather[0].description,
        uiDate(date.currentDay, date.todaysDay, date.Month, date.currentYear)
      );
      iconUi(weatherData.weather[0].icon);
    } catch (error) {
      console.log(error);
    }
  }
  currentLocation()
};

domClasses.searchLocation.addEventListener('click',(e)=>{
  e.preventDefault();

  const Input = domClasses.serachedInput.value
  console.log(Input)
  domClasses.serachedInput.value = ' ';
  domClasses.weather.innerHTML = ' ';
  domClasses.weatherConditions.innerHTML = ' ';
  domClasses.dailyConditions.innerHTML = ' ';
  searchedWeatherController(Input)

})

/**************************************** present location weather **********************************************/
// domClasses.myLocation.addEventListener('click',weatherController);