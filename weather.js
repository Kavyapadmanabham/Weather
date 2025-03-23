const apikey ="40a5a3f8fb045509d839a2b6ac5e9b38";
const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const suggestionsContainer = document.createElement("ul");
suggestionsContainer.classList.add("suggestions");
document.querySelector(".search").appendChild(suggestionsContainer);

async function checkWeather(city){
    const response =await fetch(apiurl + city + `&appid=${apikey}`) ;

    if(response.status == 404){
        document.querySelector(".error").style.display ="block";
        document.querySelector(".weather").style.display ="none";
    }
    else{
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity+ "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src ="clouds.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src ="mist.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src ="drizzle.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src ="clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src ="rain.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display ="none";
    }
}
async function fetchCitySuggestions(query) {
    const url = `https://nominatim.openstreetmap.org/search?city=${query}&format=json&addressdetails=1&limit=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || data.length === 0) {
            return [];
        }

        // Extract city and state
        return data.map(place => {
            const city = place.address.city || place.address.town || place.address.village;
            const state = place.address.state || "";
            return state ? `${city}, ${state}` : city;
        });
    } catch (error) {
        console.error("Error fetching city suggestions:", error);
        return [];
    }
}

// Function to display suggestions
function showSuggestions(suggestions) {
    suggestionsContainer.innerHTML = ""; // Clear old suggestions

    suggestions.forEach(city => {
        const listItem = document.createElement("li");
        listItem.textContent = city;
        listItem.classList.add("suggestion-item");

        listItem.addEventListener("click", () => {
            searchBox.value = city.split(",")[0]; // Only set city name in input
            suggestionsContainer.innerHTML = "";
        });

        suggestionsContainer.appendChild(listItem);
    });
}



// Event listener for input
searchBox.addEventListener("input", async () => {
    const query = searchBox.value.trim();
    if (query.length > 2) {
        const suggestions = await fetchCitySuggestions(query);
        showSuggestions(suggestions);
    } else {
        suggestionsContainer.innerHTML = "";
    }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.innerHTML = "";
    }
});
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() === "") {
        alert("Please enter a city name before searching.");
    } else {
        console.log("Searching for:", searchBox.value);
        // Call your weather function here
    }
});
document.getElementById("searchBtn").addEventListener("click",  ()=> {
        checkWeather(searchBox.value);
    })
