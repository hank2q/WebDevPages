let app = {
    result: null,
    cityId: null,
    init: () => {
        app.search.addEventListener("click", () => {
            app.getWeather(app.cityId);
        });
    },
    search: document.querySelector("#submit"),
    autocomplete: TeleportAutocomplete.init("#city").on("change", function (city) {
        app.cityId = city.geonameId;
    }),
    getWeather: async (id) => {
        const api =
            "https://api.openweathermap.org/data/2.5/weather?appid=470983ff2969012deb535e1c1e146f74&id=";

        let response = await fetch(api + id);
        let json = await response.json();
        console.log(json.name);
        console.log(json.weather[0].main);
        console.log(json);
        app.result = json;
    },
};

app.init();
