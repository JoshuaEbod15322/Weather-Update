document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "001f8cb9259a45218ba105349242008";
    const searchButton = document.getElementById("searchButton");
    const cityInput = document.getElementById("cityInput");

    async function fetchWeather(cityName) {
        const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`;

        try {
            const response = await fetch(apiEndpoint);
            const weatherData = await response.json();
            console.log(weatherData);

            const weatherContainer = document.getElementById("weather");
            weatherContainer.innerHTML = "";

            const currentData = weatherData.current;
            const forecastDays = weatherData.forecast.forecastday;

            weatherContainer.innerHTML = `
                <div class="weather-current">
                    <div class="city-name-container">
                        <div class="city-name">${cityName}</div>
                        <img class="current-icon" src="https:${currentData.condition.icon}" alt="${currentData.condition.text}" />
                    </div>
                    <div class="current-info">
                        <p><strong>Temperature:</strong> ${currentData.temp_c}°C</p>
                        <p><strong>Weather:</strong> ${currentData.condition.text}</p>
                        <p><strong>Humidity:</strong> ${currentData.humidity}%</p>
                    </div>
                </div>
                <div class="forecast-container"></div>
            `;

            const forecastContainer = document.querySelector(".forecast-container");

            forecastDays.forEach((day) => {
                const date = new Date(day.date).toLocaleDateString("en-PH", {
                    weekday: "short",
                });
                const temperatureInCelsius = day.day.avgtemp_c;
                const weatherDescription = day.day.condition.text;
                const iconUrl = day.day.condition.icon;

                const fullIconUrl = `https:${iconUrl}`;

                const dayDiv = document.createElement("div");
                dayDiv.className = "day";
                dayDiv.innerHTML = `
                    <h3>${date}</h3>
                    <img src="${fullIconUrl}" alt="${weatherDescription}" />
                    <p>${temperatureInCelsius}°C</p>
                `;
                forecastContainer.appendChild(dayDiv);
            });
        } catch (error) {
            const weatherContainer = document.getElementById("weather");
            weatherContainer.innerHTML = `<p>Unable to retrieve weather data: ${error.message}</p>`;
        }
    }

    searchButton.addEventListener("click", () => {
        const cityName = cityInput.value.trim();
        if (cityName) {
            fetchWeather(cityName);
        } else {
            alert("Please enter a city name.");
        }
    });

    fetchWeather("Iligan");
});