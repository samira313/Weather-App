import { updateSidebar } from "../src/sidebar/sidebar.js";
import { weatherData } from "../src/index.js";
import { updateBackground } from "../src/utils/updateBg.js";
import { getWeekDay } from "../src/utils/customDate.js";
export function createWeatherView() {
const appDiv = document.createElement('div');
const searchDiv = document.createElement('div');
searchDiv.id = 'search';

const locationImg = document.createElement('img');
locationImg.src = './public/img/location.png';
locationImg.alt = 'location icon';
locationImg.id = 'locationIcon';

const weatherGif = document.createElement('div');
weatherGif.id = 'weather-gif';
searchDiv.appendChild(weatherGif);

const cityInput = document.createElement('input');
cityInput.type = 'text';
cityInput.id = 'input';
cityInput.placeholder = "Enter city name";

const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchButton.id = "search-btn";

const weatherContainer = document.createElement('div');
weatherContainer.id = 'weather-container';
const loader = document.createElement('span');
loader.id = 'weather-loader';
const forecastContainer = document.createElement('div');
forecastContainer.id = 'forecast';

const weather = document.createElement('div');
weather.id = 'weather';
appDiv.appendChild(weather);

const modal = document.createElement('div');
modal.id = 'modal';
const innerDiv1= document.createElement('div');
const innerDiv2 = document.createElement('div');
const modalButton = document.createElement('span');
modalButton.id = 'modal-button';
modalButton.textContent = 'X';
 
const innerDiv3 = document.createElement('div');
const modalText = document.createElement('p');
modalText.id = 'modalText';
modal.appendChild(innerDiv1);
modalText.textContent = 'test';



const menuBtn = document.createElement('button');
menuBtn.id = 'menu-btn';
menuBtn.textContent = '☰';
document.body.appendChild(menuBtn);

innerDiv2.appendChild(modalButton);
innerDiv1.appendChild(innerDiv2);
innerDiv3.appendChild(modalText);
innerDiv1.appendChild(innerDiv3);

searchDiv.appendChild(locationImg);
searchDiv.appendChild(cityInput);
searchDiv.appendChild(searchButton);
appDiv.appendChild(forecastContainer);
appDiv.appendChild(modal);
document.body.appendChild(modal);

return { searchDiv , weatherContainer ,
     forecastContainer , modal, weather, weatherGif , menuBtn};
}

//Function to render weather data
export const renderCurrentWeather = (data) => {
   if (!data) 
      return;
  
    const weatherJSx =`
  
         <h1>${data.name}, ${data.sys.country}</h1>
      <div id = "main">
         <img alt = "weather icon" src = "http://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
         <span>${data.weather[0].main}</span>
         <p>${Math.round(data.main.temp)}°C</p>
      </div>
     <div id="info">
       <p>Humidity: <span> ${data.main.humidity}%</span></p>
       <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
    `;
   //Updating weather container 

   const weatherContainer = document.getElementById('weather-container');

    weatherContainer.innerHTML = weatherJSx;

      updateSidebar(weatherData);
      updateBackground(data.weather[0].main);
      updateBackground(data.weather[0].main, Math.round(data.main.temp));    
 };

 //Function to render weather forecast and generating HTML elements
 export const renderForecastWeather = (data) => {
   if (!data)
      return;
   const forecastContainer = document.getElementById("forecast");
   //forecastContainer.id = 'forecast';
   
   forecastContainer.innerHTML = '';

   data = data.list.filter(obj => obj.dt_txt.endsWith('12:00:00'));
   data.forEach(i => {
      const forecastJsx = `
         <div>
         <img alt = "weather icon" src = "http://openweathermap.org/img/w/${i.weather[0].icon}.png"/>
         <h3>${getWeekDay(i.dt)}</h3>
         <p>${Math.round(i.main.temp)}°C</p>
         <span>${i.weather[0].main}</span>
         </div>
         `;

         forecastContainer.innerHTML += forecastJsx;
   })  
 }