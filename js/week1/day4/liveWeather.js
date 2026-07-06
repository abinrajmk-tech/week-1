let weather_url =
    "https://api.open-meteo.com/v1/forecast?latitude=11.86752&longitude=75.35763&hourly=temperature_2m,weather_code,wind_speed_10m&forecast_days=1";
const skeleton = document.querySelector(".skeleton");
const containerDiv = document.querySelector(".container");
const tempSpan = document.querySelector("#temperature");
const windSpan = document.querySelector("#wind");
let windSpeed;
let temperature;
async function fetchWeatherData(url) {
    try {
        const result = await fetch(url);
        return await result.json();
    } catch (error) {
        console.error(error);
    }
}
async function setData(city) {
    skeleton.style.display = "flex";
    containerDiv.style.display = "none";
    if (sessionStorage.getItem(city) !== null) {
        let sessionObject = JSON.parse(sessionStorage.getItem(city));
        console.log(sessionObject.expiresAt - Date.now());
        if (sessionObject.expiresAt - Date.now() > 0) {
            console.log(sessionObject);
            tempSpan.textContent = `${sessionObject.body.temp}`;
            windSpeed = `${sessionObject.body.speed}`;
            temperature = `${sessionObject.body.temp}`;
            windSpan.textContent = `${sessionObject.body.speed}`;
            setWMOStatus(sessionObject.body.wmoCode);
            console.log(data);
            const ttl = 10000;
            const timelimit = Date.now() + ttl;
            // console.log(windSpeed);
            sessionObject = {
                expiresAt: timelimit,
                body: {
                    temp: temperature,
                    speed: windSpeed,
                    // wmoCode: wmoCode,
                },
            };
            sessionStorage.setItem(city, JSON.stringify(sessionObject));
            // console.log(windSpeed);
        }
    } else {
        const data = await fetchWeatherData(weather_url).then((value) => value);
        sessionStorage.removeItem(city);
        const index = new Date().getUTCHours();
        const wmoCode = data.hourly.weather_code[index];
        setWMOStatus(wmoCode);
        temperature = data.hourly.temperature_2m[index];
        windSpeed = data.hourly.wind_speed_10m[index];

        tempSpan.textContent = `${temperature}\u00B0`;
        windSpan.textContent = `${windSpeed}`;
        // console.log(data);
        const ttl = 600000;
        const timelimit = Date.now() + ttl;
        // console.log(windSpeed);
        sessionObject = {
            expiresAt: timelimit,
            body: {
                temp: temperature,
                speed: windSpeed,
                // wmoCode: wmoCode,
            },
        };
        sessionStorage.setItem(city, JSON.stringify(sessionObject));
    }

    setTimeout(() => {
        skeleton.style.display = "none";
        containerDiv.style.display = "flex";
    }, 500);
}

function WMOmap(wmoCode) {
    return wmoCode <= 3
        ? "Clear Sky"
        : wmoCode <= 50
          ? "Cloudy "
          : wmoCode <= 57
            ? "Drizzle"
            : wmoCode <= 67
              ? "Rain"
              : wmoCode <= 77
                ? "Snow grain"
                : wmoCode <= 82
                  ? "Rain Showers"
                  : wmoCode <= 86
                    ? "Snow Showers"
                    : "ThunderStorm";
}
function setWMOStatus(wmoCode) {
    const wmoDiv = document.querySelector(".wmo-status");
    wmoDiv.textContent = WMOmap(wmoCode);
}

const input = document.querySelector("#search");
const searchButton = document.querySelector(".search button");
searchButton.addEventListener("click", async () => {
    getLocation(input.value.trim());
});

function setTime() {
    const now = new Date();
    const currentTimeDate = now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
    });
    const month = now.toDateString("en-IN", {
        month: "short",
    });
    const currentTime = currentTimeDate.split(",")[1];

    const time = document.querySelector("#time");
    time.textContent = `${currentTime}`;
    const date = document.querySelector(".date");
    date.textContent = `${month.split(" ").splice(0, 3)}`;
    date.textContent = date.textContent.replaceAll(",", " ");
}

function getLocation() {
    const place = input.value.trim();
    if (place === "") return;

    const geoCode_url = `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1&language=en&format=json`;
    try {
        const data = fetchWeatherData(geoCode_url).then((response) => {
            const longitude = response.results[0].longitude;
            const latitude = response.results[0].latitude;
            const place = response.results[0].name;
            const country = response.results[0].country;
            weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code,wind_speed_10m&forecast_days=1`;
            setData(place);

            const placePara = document.querySelector(".wmo-status2");
            placePara.textContent = `${place},${country}`;
        });
    } catch (error) {
        console.log(error);
    }
}

setData("Kozhikode");
setInterval(setTime, 1000);
