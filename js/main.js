const filterContainer = document.getElementById("filterContainer");
const countriesContainer = document.getElementById("countriesContainer");
const searchContainer = document.getElementById("searchContainer");

let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
  .then((countriesArray) => countriesArray.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterContainer.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterContainer.value}`)
    .then((countriesArray) => countriesArray.json())
    .then(renderCountries);
});

function renderCountries(data) {
  (countriesContainer.innerHTML = ""),
    data.map((country) => {
      const countryCard = document.createElement("a");
      countryCard.classList.add("country--card");
      countryCard.href = `/country.html?name=${country.name.common}`;

      const cardHTML = `
				<img src="${country.flags.svg}" alt="flag" class="country--flag" />
				<div class="country--content">
					<h3 class="country--name country--content-item">${country.name.common}</h3>
					<p class="country--population country--content-item"><b>Population:</b> ${country.population.toLocaleString(
            "en-IN"
          )}</p>
					<p class="country--region country--content-item"><b>Region:</b> ${
            country.region
          }</p>
					<p class="country--capital country--content-item"><b>Capital:</b>  ${
            country.capital
          }</p>
				</div>	`;

      countryCard.innerHTML = cardHTML;

      countriesContainer.append(countryCard);
    });
}

searchContainer.addEventListener("input", (e) => {
  const filterContainer = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filterContainer);
});

