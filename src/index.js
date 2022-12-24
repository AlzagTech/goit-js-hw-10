import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-infot'),
};

refs.input.addEventListener('input', onInput);

function onInput(event) {
  const name = event.target.value;

  fetchCountries(name).then(countries =>
    refs.list.insertAdjacentHTML('beforeend', renderCountriesList(countries))
  );
}

function renderCountriesList(arr) {
  return arr
    .map(
      item =>
        `<li>
        <svg xmlns=${item.flags.svg}></svg>
        <h2>${item.name.official}</h2>
      </li>`
    )
    .join('');
}
