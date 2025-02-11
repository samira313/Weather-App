import { showModal } from "../index.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5"; // Base URL for openWeatherMap API
const API_KEY =  "62faffe5fe398983e589d80625a41622"; // API key for authentication


// Function to fetch weather data from openWeatherMap API based on type and data (city name or coordinates)
export const getWeatherData = async (type, data) => {
    let url = null;

    //Determining the correct API endpoint based on the requested type
  switch (type) {
  case 'current': //Fetching current weather data

  //If the  input data is city name , construct the URL accordingly
    if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
  } else{
  // If the input data is latitude & longitude , construct the URL using coordinates
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
  case 'forecast': // Fetching forecast weather data
    if (typeof data === "string") {
          url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
  } else {
          url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
      default:
    // If no valid type is provided, assume current weather data using city name.
          url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      break;
    }

// If the API request is successful and the status code is 200, return the weather data
  try {      

const response = await fetch(url);
const json = await response.json();
 
if (+json.cod === 200) {
    return json;
}
 else {
    showModal("City not found");
    
 }

} catch (error) {
    showModal("Internet disconnected");
    return null;
 }
}


