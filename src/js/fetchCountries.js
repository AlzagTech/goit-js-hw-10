export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  // const url = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    });
}
// https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages
