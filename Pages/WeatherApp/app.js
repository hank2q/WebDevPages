// elements
const api =
    "https://api.openweathermap.org/data/2.5/weather?appid=470983ff2969012deb535e1c1e146f74&units=";
let unit = "metric";
const container = document.querySelector(".animator");
const cityInput = document.querySelector("#city");
const submit = document.querySelector("#submit");
const cityName = document.querySelector(".name");
const cityTime = document.querySelector(".date-time");
const status = document.querySelector(".description");
const icon = document.querySelector("#icon");
const tempreture = document.querySelector(".temp");
const cels = document.querySelector(".cel");
const feh = document.querySelector(".feh");
const low = document.querySelector(".low-n");
const high = document.querySelector(".high-n");
const humid = document.querySelector(".humid-n");
const wind = document.querySelector(".wind-n");
const speed = document.querySelector(".speed");
let autoCity;
// events
document.addEventListener("DOMContentLoaded", init);
submit.addEventListener("click", bySearch);
cityInput.addEventListener("keyup", (e) => {
    if (event.keyCode == 13) {
        bySearch();
    }
});
cels.addEventListener("click", toCels);
feh.addEventListener("click", toFeh);
speed.addEventListener("click", convertSpeed);

// functions

// initializing app
function init() {
    // initialize input autocomplete
    TeleportAutocomplete.init(cityInput).on("change", function (city) {
        autoCity = city;
    });
    cels.style.fontWeight = "bold";
    feh.style.color = "grey";
    // displaying current location weather if user allows it
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(byLocation, () => {});
    } else {
        console.log("no geolocation");
    }
}

// get weather data from api
async function getWeather(url) {
    let response = await fetch(api + unit + url);
    let result = await response.json();
    return result;
}

// give user location to api
function byLocation(position) {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let url = `&lat=${lat}&lon=${lon}`;
    getWeather(url).then((data) => {
        setTimeout(updateWeather, 200, data);
    });
}

function bySearch() {
    if (autoCity) {
        let url = `&lat=${autoCity.latitude}&lon=${autoCity.longitude}`;
        container.style.opacity = "0";
        getWeather(url).then((data) => {
            setTimeout(updateWeather, 200, data);
        });
    }
}

function updateWeather(data) {
    let city = data.name;
    let country = data.sys.country;
    let description = capitalize(data.weather[0].description);
    cityName.textContent = city + ", " + codes[country];
    status.textContent = description;
    tempreture.textContent = data.main.temp.toFixed(1);
    cityTime.textContent = currentDate(data.dt + data.timezone);
    low.textContent = data.main.temp_min.toFixed(1);
    high.textContent = data.main.temp_max.toFixed(1);
    wind.textContent = (data.wind.speed * 3.6).toFixed(1);
    humid.textContent = data.main.humidity;
    icon.src = `./icons/${data.weather[0].icon}.png`;
    container.style.opacity = "1";
}

function currentDate(dt) {
    dt = dt - 240 * 60;
    var date = new Date(dt * 1000);
    console.log(date.getTimezoneOffset());
    console.log(date);
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    let time = date.toString().split(" ")[4].split("");
    time.splice(5);
    time = time.join("");
    let hour = time.split(":");
    let af = "AM";
    if (hour[0] > 12) {
        hour[0] -= 12;
        console.log(hour[0]);
        af = "PM";
        if (hour[0] < 10) {
            hour[0] = "0" + hour[0];
        }

        time = hour.join(":");
    }
    return `${day}, ${time} ${af}`;
}

function capitalize(phrase) {
    let capitalized = [];
    let words = phrase.split(" ");
    for (word of words) {
        word = word.split("");
        word[0] = word[0].toUpperCase();
        word = word.join("");
        capitalized.push(word);
    }
    return capitalized.join(" ");
}
function convert(formula) {
    let newTemps = {
        newTemp: formula(tempreture.textContent).toFixed(1),
        newLow: formula(low.textContent).toFixed(1),
        newHigh: formula(high.textContent).toFixed(1),
    };
    for (temp in newTemps) {
        let Temp = newTemps[temp];
        if (Temp[Temp.length - 1] == "0") {
            newTemps[temp] = Math.round(Temp);
        }
    }
    tempreture.textContent = newTemps.newTemp;
    low.textContent = newTemps.newLow;
    high.textContent = newTemps.newHigh;
}
function toFeh() {
    let formula = (temp) => (temp * 9) / 5 + 32;
    convert(formula);
    feh.classList.add("disabled");
    feh.style.fontWeight = "bold";
    feh.style.color = "";
    cels.classList.remove("disabled");
    cels.style.fontWeight = "";
    cels.style.color = "grey";
    unit = "imperial";
}

function toCels() {
    let formula = (temp) => ((temp - 32) * 5) / 9;
    convert(formula);
    cels.classList.add("disabled");
    cels.style.fontWeight = "bold";
    cels.style.color = "";
    feh.classList.remove("disabled");
    feh.style.fontWeight = "";
    feh.style.color = "grey";
    unit = "metric";
}

function convertSpeed() {
    if (speed.id === "k") {
        wind.textContent = (wind.textContent / 1.609).toFixed(1);
        speed.textContent = "mph";
        speed.id = "m";
    } else {
        wind.textContent = (wind.textContent * 1.609).toFixed(1);
        speed.textContent = "km/h";
        speed.id = "k";
    }
}
