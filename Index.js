let apiKey = "obcc5d4b0bc4t336609c2f30ba544fa3";

// Function to handle search form submission
function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  // Update the city name in the DOM
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  // Call the function to get weather data for the searched city
  getWeather(city);
}

// Function to get weather data from the API
function getWeather(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Use axios to make the API call
  axios.get(apiUrl).then(displayWeather);
}

// Function to update the DOM with weather data
function displayWeather(response) {
  // Get the necessary data from the response
  let temperature = response.data.temperature.current;
  let description = response.data.condition.description; // Weather description
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let timestamp = response.data.time * 1000; // Convert UNIX timestamp to milliseconds

  // Update temperature
  let temperatureElement = document.querySelector(".current-temperature-value");
  temperatureElement.innerHTML = Math.round(temperature);

  // Update weather description, humidity, and wind
  let descriptionElement = document.querySelector(".current-details");
  descriptionElement.innerHTML = `${formatDate(
    new Date(timestamp)
  )}, ${description} <br />
    Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed} km/h</strong>`;
}

// Function to format the time and day from the timestamp
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

// Event listener for the search form
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Display the current date
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
