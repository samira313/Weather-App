// sidebarView.js - Responsible for rendering the sidebar UI
 // Function to create the sidebar UI dynamically
  export function createSidebarView() { 
    
    // Create the main sidebar container 
const sidebar = document.createElement("div"); 
sidebar.id = "sidebar"; 
sidebar.classList.add("sidebar");
 // Create close button
  const closeButton = document.createElement("button"); 
  closeButton.id = "close-sidebar"; 
  closeButton.innerText = "✖"; 
  closeButton.classList.add("close-btn");
   // Sidebar title
  const title = document.createElement("h3");
  title.innerText = "Weather Info"; 
  
  // Location information section 
 const locationInfo = document.createElement("p");
  locationInfo.id = "location-info"; 
  locationInfo.innerText = "Current Location: -";

   // Weather advice (e.g., "Take an umbrella!")
const weatherAdvice = document.createElement("p");
 weatherAdvice.id = "weather-advice";
  weatherAdvice.innerText = "Advice: -"; 
  
  // Search history title
const historyTitle = document.createElement("h4"); 
historyTitle.innerText = "Search History:";

// List for storing search history 
 const searchHistoryList = document.createElement("ul"); 
 searchHistoryList.id = "search-history"; 
 
 // Append all elements to the sidebar
 sidebar.appendChild(closeButton); 
 sidebar.appendChild(title);
 sidebar.appendChild(locationInfo); 
 sidebar.appendChild(weatherAdvice); 
 sidebar.appendChild(historyTitle); 
 sidebar.appendChild(searchHistoryList);
 
 // Append sidebar to the document body
 document.body.appendChild(sidebar); 
 closeButton.addEventListener("click", () => {
  sidebar.classList.remove("open"); 
 });

 return { sidebar, closeButton, locationInfo, weatherAdvice, searchHistoryList };
 }