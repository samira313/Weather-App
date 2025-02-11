import { getWeatherData } from "../utils/fetchData.js";
import { createWeatherView } from "../weatherView.js";  
import { createSidebarView } from "./sidebarView.js";
import { getWeekDay } from "../utils/customDate.js";
import { weatherData , setWeatherData , fetchWeatherAndUpdate} from "../index.js";
const { sidebar, closeButton, locationInfo, weatherAdvice, searchHistoryList} = createSidebarView();
const closeSidebarButton = document.getElementById("close-sidebar");



// Function to toggle the sidebar visibility
 export function toggleSidebar() { 
    const sidebar = document.getElementById("sidebar");
// sidebar.classList.toggle("open"); 
   if (!sidebar) {
    return;
   }
   if (sidebar.classList.contains("open")) {
       sidebar.classList.remove("open");
   }
   else {
    sidebar.classList.add("open");
   }
} 
 
if (closeSidebarButton) {
    closeSidebarButton.addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
    });
} else {
    console.log("Close sidebar button not found");
}

// Function to update the sidebar with weather details 

export function updateSidebar(weatherData) { 

     if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
        return; }


document.getElementById("weather-advice").textContent = `
Advice : ${weatherData.weather[0].main}
`;  
document.getElementById("location-info").textContent = ` 
Current Location:📍 ${weatherData.name}
`;

let temp = weatherData.main.temp; 

// If weather data is missing or empty, set this to prevent errors 
let condition =(weatherData.weather && weatherData.weather.length > 0) 
? weatherData.weather[0].main : "No Data Available" ;
     
     
 if (temp < 10 && condition === "Clear" || condition === "Clouds") { 
    weatherAdvice.textContent = "Advice:Wear a jacket!🧣🧤"; 
}else if (condition === "Rain") 
    { weatherAdvice.textContent = "Advice:Take an umbrella!🌂☔"; 

}else if (condition === "Snow") 
        { weatherAdvice.textContent = "Advice:Watch your step, it's slippery!☃️❄️";
        }
else if (condition === "Dust") {
    weatherAdvice.textContent = "Advice:Avoid crowded places!😷";
}
else if (condition === "Thunderstorm") {
    weatherAdvice.textContent = "Advice: Stay calm and take a deep breath!⛈️";
}
    
else { weatherAdvice.textContent = "Advice:Enjoy the weather!😍";

} 
}

export function updateSearchHistory(city) {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    
    searchHistory = searchHistory.filter(c => c !== city);
    
    searchHistory.unshift(city);

    searchHistory = searchHistory.slice(0,20);
    
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    
    displaySearchHistory()
}

export function displaySearchHistory () {
    const searchHistoryList = document.getElementById("search-history");
    
    if (!searchHistoryList) return; 
    searchHistoryList.innerHTML = ""; // Clear previous list
   
    let searchHistory = localStorage.getItem("searchHistory");

 try { 
    searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
 }catch (error) {
    console.error("Error parsing search history:", error);
    searchHistory = []; //Reset if JSON is invalid
    localStorage.removeItem("serachHistory"); // Clear corrupted history
 }

   searchHistory = searchHistory.slice(-20);

   searchHistory.forEach((city) => {
   const li = document.createElement("li"); 
    li.textContent = city; 
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
       
        const cityInput = document.getElementById("cityInput");
        if (cityInput) {
         //   cityInput.value = city; 
         console.error( "erro not found in dom");
         //return;
          //  fetchWeatherAndUpdate(city); //Trigger weather update
    } 
    input.value = city;
    
    fetchWeatherAndUpdate(city); //Trigger weather update

    });
    searchHistoryList.appendChild(li);
 });
 localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

}

