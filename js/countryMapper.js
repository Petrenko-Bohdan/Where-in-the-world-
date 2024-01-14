const borderCountries = document.getElementById("borderCountries");
const countryPageFlag = document.getElementById("countryPageFlag");
const countryPageName = document.getElementById("countryPageName");
const countryPagePopulation = document.getElementById("countryPagePopulation");
const countryPageRegion = document.getElementById("countryPageRegion");
const countryPageSubRegion = document.getElementById("countryPageSubRegion");
const countryPageCapital = document.getElementById("countryPageCapital");
const countryPageTopLevelDomain = document.getElementById(
  "countryPageTopLevelDomain"
);
const countryPageCurrencies = document.getElementById("countryPageCurrencies");
const countryPageLanguages = document.getElementById("countryPageLanguages");

export async function fetchBordersData(country) {
  const mappedCountry = mapCountry(country);

  if (country.borders) {
    country.borders.map((border, index) => {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) => {
          console.log(borderCountry.name);

          const borderCountryTag = document.createElement("a");
          borderCountryTag.classList.add("border-countries-link");
          borderCountryTag.innerText = borderCountry.name.common;
          borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;

          if (index < country.borders.length - 1) {
            borderCountryTag.innerText += ", ";
          }

          borderCountries.append(borderCountryTag);
        });
    });
  }
  return mappedCountry;
}

const countryName = new URLSearchParams(location.search).get("name");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([countryName]) => fetchBordersData(countryName))
  .then((mappedCountry) => {
    console.log(mappedCountry);
    (countryPageTitle.innerText = mappedCountry.title),
      (countryPageFlag.src = mappedCountry.flag),
      (countryPageName.innerText = mappedCountry.name),
      (countryPagePopulation.innerText = mappedCountry.population),
      (countryPageRegion.innerText = mappedCountry.region),
      (countryPageSubRegion.innerText = mappedCountry.subRegion),
      (countryPageCapital.innerText = mappedCountry.capital),
      (countryPageTopLevelDomain.innerText = mappedCountry.topLevelDomain),
      (countryPageCurrencies.innerText = mappedCountry.currencies),
      (countryPageLanguages.innerText = mappedCountry.languages),
      (borderCountries.innerText = mappedCountry.borders);
  });

function mapCountry(country) {
  return {
    title: country.name.common,
    flag: country.flags.svg,
    name: country.name
      ? Object.values(country.name.nativeName)[0].common
      : country.name.common,
    population: country.population.toLocaleString("en-IN"),
    region: country.region,
    subRegion: country.subRegion,
    capital: country.capital,
    topLevelDomain: country.tld.join(", "),
    currencies: Object.values(country.currencies)
      .map((currencies) => `${currencies.name} (${currencies.symbol})`)
      .join(", "),
    languages: Object.values(country.languages).join(", "),
    borders: [],
  };
}
