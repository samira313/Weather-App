import { createWeatherView , renderCurrentWeather, renderForecastWeather } from "./weatherView.js";  
import { getWeatherData } from "./utils/fetchData.js";
import { getWeekDay } from "./utils/customDate.js";
import { updateBackground } from "./utils/updateBg.js";
import { createSidebarView } from "./sidebar/sidebarView.js";
import {  toggleSidebar, updateSidebar, 
   updateSearchHistory, displaySearchHistory 

} from "./sidebar/sidebar.js";
//Creating main app container
const appDiv = document.getElementById('app');
const { searchDiv, weatherContainer , forecastContainer , modal , weather , menuBtn} = createWeatherView();
appDiv.appendChild(weatherContainer);
appDiv.appendChild(searchDiv);
appDiv.appendChild(forecastContainer);
appDiv.appendChild(modal);
appDiv.appendChild(weather);

//Selecting HTML elements
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('input');
const locationIcon = document.getElementById('locationIcon');
const modalButton = document.getElementById('modal-button');
const weatherGif = document.getElementById('weather-gif');

//Exporting weaother data as an empty objectm to store fetch data
export let weatherData ={};


// Function to fetch weather data and update the UI
export async function fetchWeatherAndUpdate(city) {
    
   const newWeatherData = await getWeatherData ("current", city);
    if (newWeatherData) {
       setWeatherData (newWeatherData);
       updateSidebar(weatherData);
       renderCurrentWeather(weatherData);
 
       const forecastData = await getWeatherData ("forecast", city);
       renderForecastWeather(forecastData);
        
    }else {
       showModal("City not found");
    }
 }
 
// Ensure the new data is valid and has weather information
export function setWeatherData (newData) {
   if (!newData || !newData.weather || !newData.weather.length === 0) {
      showModal("Invalid weather data");
      return;
   }
  weatherData = { ...newData}; //Store new weather data in a variable 
}


//Get the city name from the input
const searchHandler = async () => {
    const cityName = cityInput.value;
    if (!cityName) {
       showModal('Please enter a city name');
        return;
    }
   const currentData = await getWeatherData("current", cityName);
   if (currentData) {
         renderCurrentWeather(currentData, weatherContainer);
  
const forecastData = await getWeatherData("forecast", cityName);
 renderForecastWeather(forecastData);
  if(weatherData) {
   updateSidebar(weatherData);
   
   document.getElementById("sidebar").classList.remove("open");
  }
 }
}
//Handle geolocation data when the user allows location access.
   const positionCallback = async (position) => {
      const { latitude, longitude } = position.coords;
   try {
      const data = await getWeatherData("current" , { latitude, longitude }); 
      
      if (data && data.name) {
         const cityInput = document.getElementById("input");
      if (cityInput){
         cityInput.value = data.name;
         cityInput.dispatchEvent(new Event('input'));
       
      } 
      updateSidebar();
      updateSearchHistory(data.name); 
      searchHandler();

    }
    else {
      showModal('Failed to get location');
    }

 }catch (error) {
    showModal('Failed to get weather location');
 }
}

// Handle user's geolocation request and retrieve their cuurent weather
const errorCallBack = (error) => {
   showModal(error.message);
}


// Check if the geolocation is supported by the browser
const locationHandler = async () => {
 
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(positionCallback, errorCallBack);

    }else {
      showModal('Geolocation is not supported by this browser');
    }   
   }
//Initializes the weather application with the default city
const initHandler = async () => {
   const currentData = await getWeatherData("current", "Dubai");
   renderCurrentWeather(currentData);
   
   
   const forecastData = await getWeatherData("forecast", "Dubai");
   renderForecastWeather(forecastData);
}

// Fetches weather data for a given city and updates the functions 
function getWeather(city) {
   getWeatherData("current", city).then((data) => {
      if (data) {
         updateSidebar(data);
         updateSearchHistory(data.name);
         
    }
 });
}

// Display modal text
const modalText = document.getElementById('modalText');
if (!modal) {
    console.log("No modal element found")
}
 export const showModal = (text) => {
    modalText.innerText = text;
    modal.style.display = 'flex';
};

// Remove modal text
const removeModal = () => {
    modal.style.display = 'none';
};

//Evet listener for UI interactions

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click",locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);

menuBtn.addEventListener('click', toggleSidebar);
displaySearchHistory();

searchButton.addEventListener("click", () => {
   const city = cityInput.value.trim();
   if (city) {
      fetchWeatherAndUpdate(city);
      updateSearchHistory(city);
      displaySearchHistory();
    
   }
   else {
     showModal("Enter city name"); 
   }
   })
     
cityInput.addEventListener("keypress", async (e) => {
   if (e.key === 'Enter') {
         const city = cityInput.value.trim();
       if (city) {
            cityInput.value = city;
            await fetchWeatherAndUpdate(city);
            updateSearchHistory(city);
            updateSidebar();
            displaySearchHistory();
         }
      else {
            showModal("City input is empty");
         }
      }
   });
