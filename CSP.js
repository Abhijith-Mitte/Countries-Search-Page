let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultCountriesEl = document.getElementById("resultCountries");

let searchInputVal = "";
let countriesList = [];

function createCountryDetails(result) {
    let {
        flag,
        name,
        population
    } = result;

    let eachCountryItemEl = document.createElement("div");
    eachCountryItemEl.classList.add("d-flex", "flex-row", "col-11", "col-md-5", "mr-auto", "ml-auto", "country-card");
    resultCountriesEl.appendChild(eachCountryItemEl);

    let flagEl = document.createElement("img");
    flagEl.src = flag;
    flagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    eachCountryItemEl.appendChild(flagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    eachCountryItemEl.appendChild(countryInfoEl);

    let nameEl = document.createElement("p");
    nameEl.textContent = name;
    nameEl.classList.add("country-name");
    countryInfoEl.appendChild(nameEl);

    let populationEl = document.createElement("p");
    populationEl.textContent = population;
    populationEl.classList.add("country-population");
    countryInfoEl.appendChild(populationEl);
}

function displayCountryDtails() {
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputVal)) {
            createCountryDetails(country);
        }
    }
}

function getContries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };

    resultCountriesEl.textContent = "";

    spinnerEl.classList.remove("d-none");
    resultCountriesEl.classList.add("d-none");

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {

            spinnerEl.classList.add("d-none");
            resultCountriesEl.classList.remove("d-none");

            countriesList = jsonData;
            displayCountryDtails();
        })
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    getContries();
}

searchInputEl.addEventListener("keyup", onChangeSearchInput)
getContries();