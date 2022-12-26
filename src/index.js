import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const name = event.target.value.trim();

  if (!name) {
    clearMarkup();
    return;
  }

  fetchCountries(name)
    .then(countries => {
      clearMarkup();
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        refs.list.innerHTML = createCountriesListItemsMarkup(countries);
      } else if (countries.length === 1) {
        refs.info.innerHTML = createCountriesInfoMarkup(countries);
      }
    })
    .catch(error => {
      if (error) {
        Notify.failure('Oops, there is no country with that name');
      }
    });
}

function createCountriesListItemsMarkup(arr) {
  return arr
    .map(
      item =>
        `<li>
          <div class="country-title-box">
            <img src = ${item.flags.svg} width = 47/>
            <h2>${item.name.official}</h2>
          </div>
      </li>`
    )
    .join('');
}

function createCountriesInfoMarkup(arr) {
  let langArr = [];

  for (const key in arr[0].languages) {
    langArr.push(arr[0].languages[key]);
  }

  return arr
    .map(
      item =>
        `<div class="country-title-box">
          <img src = ${item.flags.svg} width = 47/>
          <h2>${item.name.official}</h2>
        </div>
        <h3>Capital: <span>${item.capital}</span></h3>
        <h3>Population: <span>${item.population}</span></h3>
        <h3>Languages: <span>${langArr.join(', ')}</span></h3>`
    )
    .join('');
}

function clearMarkup() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}
