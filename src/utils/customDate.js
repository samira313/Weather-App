
    
const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',   
    'Saturday',  
];

// Function to get the weekday from given timestamp
const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
    }


 export {getWeekDay};