export const updateBackground = (weatherCondition, temp) => {

  const backgroundImages = {
      "Clear": "sunny.gif",
      "Rain": "rainyDay.gif",
      "Drizzle": "rainyDay.gif",
      "Clouds": "clouds2.gif",
      "Haze": "mist.gif",
      "Fog": "mist.gif",
      "Mist": "mist.jpeg",
      "Snow": "snow.gif",
      "Dust": "mist.jpeg",
      "Ash": "mist.jpeg",
      "Sand": "mist.jpeg",
      "Smoke": "mist.jpeg",
      "Thunderstorm": "thunderstorm.gif",
      "Squall": "windyBg.gif",
      "Tornado": "windyBg.gif",
      "Windy": "windyBg.gif",
      "Wind": "windyBg.gif",
  };
  const boxImages = {
    "Clear": "clearCold.gif",
    "Rain": "rainyanimation.gif",
    "Drizzle": "rainyanimation.gif",
    "Clouds": "cold.gif",
    "Mist": "hazeDay.gif",
    "Fog": "hazeDay.gif",
    "Haze": "hazeDay.gif",
    "Snow": "snowGif2.gif",
    "Dust": "hazeDay.gif",
    "Thunderstorm": "storm.gif",
    "Windy": "windyGif.gif",
    "Wind": "windyGif.gif",
    "Squall": "windyGif.gif",
    "Tornado": "windyGif.gif",
    "Ash": "maskMist.gif",
    "Smoke": "maskMist.gif",
    "Dust": "maskMist.gif",
    "Sand": "maskMist.gif",
};
 
const backgroundImage = backgroundImages[weatherCondition] || "default.gif"; 
const boxImage = boxImages[weatherCondition] || "defaultBox.gif";

document.body.style.backgroundImage = `url('https://samira313.github.io/Weather-App/public/img/${backgroundImage}')`;
document.body.style.backgroundSize = "cover";

const weatherGif = document.getElementById("weather-gif"); 
  if (weatherGif) {
      weatherGif.style.backgroundImage = `url('https://samira313.github.io/Weather-App/public/img/${boxImage}')`;
      weatherGif.style.backgroundSize = "cover";
  }

  if (temp > 18 && (weatherCondition === "Clear" || weatherCondition === "Clouds")){
    
    document.body.style.backgroundImage = `url('https://samira313.github.io/Weather-App/public/img/sunny.gif')`;
    document.body.style.backgroundSize = "cover";
    weatherGif.style.backgroundImage = `url('https://samira313.github.io/Weather-App/public/img/summerGif.gif')`;
    modalText.textContent = "😍Enjoy the weather!😍";
 } 
};


