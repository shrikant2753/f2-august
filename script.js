// Constants for API keys and URLs
const OPENWEATHERMAP_API_KEY = '18d461249ac972e325bf7f092649c686';
const OPENWEATHERMAP_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);
    const apiUrl = `${OPENWEATHERMAP_API_URL}?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}`;
    
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Call function to display weather data
            console.log(data);
            displayWeatherInfo(data);
        })
        .catch((error) => {
            console.error('Weather data fetch error:', error);
            // Handle weather data fetch error here
        });
}

// Function to display weather info in the DOM
function displayWeatherInfo(data) {
    const weatherInfoContainer = document.createElement('div');
    weatherInfoContainer.classList.add('weather-info');

    const cityName = document.createElement('p');
    cityName.textContent = `City: ${data.name}`;

    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const timeZone = document.createElement('p');
    timeZone.textContent = `Time Zone: ${data.timezone}`;

    const pressure = document.createElement('p');
    pressure.textContent = `Pressure: ${data.main.pressure} hPa`;

    const windDirection = document.createElement('p');
    windDirection.textContent = `Wind Direction: ${data.wind.deg}°`;

    const uvIndex = document.createElement('p');
    if (data.uv) {
        uvIndex.textContent = `UV Index: ${data.uv}`;
    } else {
        uvIndex.textContent = `UV Index: N/A`;
    }

    const feelsLike = document.createElement('p');
    feelsLike.textContent = `Feels Like: ${data.main.feels_like}°C`;

    weatherInfoContainer.appendChild(cityName);
    weatherInfoContainer.appendChild(windSpeed);
    weatherInfoContainer.appendChild(humidity);
    weatherInfoContainer.appendChild(timeZone);
    weatherInfoContainer.appendChild(pressure);
    weatherInfoContainer.appendChild(windDirection);
    weatherInfoContainer.appendChild(uvIndex);
    weatherInfoContainer.appendChild(feelsLike);

    // Append the weather information to the container
    const container = document.querySelector('.container');
    container.appendChild(weatherInfoContainer);
}
// function displayWeatherInfo(data) {
//     const weatherInfoContainer = document.getElementById('weatherData');

//     // Create an HTML string to hold all the weather information
//     const weatherInfoHTML = document.createElement('div');

//     weatherInfoHTML.innerHTML = `
//         <div>City: ${data.name}</div>
//         <div>Wind Speed: ${data.wind.speed} m/s</div>
//         <div>Humidity: ${data.main.humidity}%</div>
//         <div>Time Zone: ${data.timezone}</div>
//         <div>Pressure: ${data.main.pressure} hPa</div>
//         <div>Wind Direction: ${data.wind.deg}°</div>
//         <div>UV Index: ${data.uv ? data.uv : 'N/A'}</div>
//         <div>Feels Like: ${data.main.feels_like}°C</div>
//     `;

//     // Set the HTML content of the weatherData container
//     weatherInfoContainer.append(weatherInfoHTML);
// }

// Function to fetch geolocation and display Google Map
function fetchGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Display Google Map
            displayGoogleMap(latitude, longitude);

            // Fetch weather data
            fetchWeatherData(latitude, longitude);
        }, (error) => {
            console.error('Geolocation error:', error);
            // Handle geolocation error here
        });
    } else {
        console.error('Geolocation is not available');
        // Handle geolocation not available error here
    }
}

// Function to display Google Map
// Function to display Google Map
function displayGoogleMap(latitude, longitude) {
    const mapIframe = document.createElement('iframe');
    mapIframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    mapIframe.width = '360';
    mapIframe.height = '270';
    mapIframe.frameborder = '0';
    mapIframe.style.border = '0';

    // Append the map to the container
    const head = `<h2>Welcome To The Weather App</h2>
    <h3>Here is your current location</h3>
    <div class='info'>
        <div class="lat">
            <div>lat:</div>
            ${latitude}
        </div>

        <div class="lon">
            <div>long:</div>
            ${longitude}
        </div>
    </div>`


    const container = document.querySelector('.container');
    container.innerHTML = head;
    container.appendChild(mapIframe);
}


// Initial function call to start the application
function fetchData() {
    // Remove any existing weather data and map
    const container = document.querySelector('.container');
    container.innerHTML = '';

    // Call function to fetch geolocation and start the process
    fetchGeolocation();
}

// Event listener for the "Fetch Data" button
const fetchDataButton = document.getElementById('fetchDataButton');
fetchDataButton.addEventListener('click', fetchData);
