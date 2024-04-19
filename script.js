const apiKey = "9e029ee9a12383ed09983199606f91ac"
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`)
    console.log(response)
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        document.querySelector(".error").style.display = "none"

        let data = await response.json()

        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block"
    }
}

searchBtn.addEventListener("click", (event) => {
    checkWeather(searchBox.value)
})
searchBox.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        checkWeather(searchBox.value)
    }
})
