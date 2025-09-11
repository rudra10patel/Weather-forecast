
let w_city = document.querySelector(".weather_city");
let w_cityinfo = document.querySelector(".city_info");
let city_date = document.querySelector(".city_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temp");
let w_mintemp = document.querySelector(".weather_min");
let w_maxtemp = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".feels_like");
let w_Humidity = document.querySelector(".Humidity");
let w_wind = document.querySelector(".Wind");
let w_pressure = document.querySelector(".Pressure");
let w_search = document.querySelector(".weather_search");
let city = "ahmedabad";
let darkmode = localStorage.getItem('darkmode');
let switchtheme = document.querySelector(".switch-theme"); 

const enabledarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem('darkmode', 'active');
}
const disabledarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem('darkmode', null);
}
if (darkmode === 'active') enabledarkmode();


switchtheme.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active' ? enabledarkmode() : disabledarkmode();
});
// // search functionality
w_search.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityName = w_city;
    console.log(cityName.value);
    city = w_city.value.trim();
    getWeatherData();

});

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0b06669a793506ae54060f7df8a5fb6`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();

        const getcountryname = (code) => {
            return new Intl.DisplayNames([code], { type: "region" }).of(code);
        };


        const getDateTime = (dt) => {
            const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
            console.log(curDate);
            // // const date = new Date();
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            };

            const formatter = new Intl.DateTimeFormat("en-US", options);
            console.log(formatter);
            return formatter.format(curDate);
        };



        const { wind, coords, main, sys, weather, dt, name } = data;
        // console.log(data);

        w_cityinfo.innerText = `${name}, ${getcountryname(sys.country)}`;

        city_date.innerText = getDateTime(dt);

        w_forecast.innerText = weather[0].main;

        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        w_temp.innerHTML = `  Temparature: ${main.temp}&#176f`
        w_mintemp.innerHTML = ` Max : ${main.temp_min.toFixed()}&#176f`
        w_maxtemp.innerHTML = ` Min : ${main.temp_max.toFixed()}&#176f`

        w_feelslike.innerHTML = ` ${main.feels_like.toFixed(2)}&#176f`
        w_Humidity.innerHTML = ` ${main.humidity}%`
        w_wind.innerHTML = ` ${wind.speed} m/s`
        w_pressure.innerHTML = ` ${main.pressure} hpa`




    } catch (error) {
        console.log(error);
    }

};

window.addEventListener("DOMContentLoaded", getWeatherData);



