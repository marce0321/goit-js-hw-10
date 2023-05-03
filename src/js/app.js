
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const input = document.querySelector('#search-box');

const lista = document.querySelector('.country-list');

const handleSearchCountry = e => {
  const inputPais = e.target.value.trim();
  lista.innerHTML = '';
  if (inputPais != '') {
    fetchCountries(inputPais)
      .then(data => {
        if (2 < data.length && data.length <= 10) {
          const elementos = data
            .map(
              country =>
                `<li class="country-elements">
                    <div class="country-img">
                        <img src=${country.flags.png} alt="" width = 80px>
                    </div>
                    <div class="country-content">
                        <h2>${country.name.common}</h2>
                    </div>
                </li>`
            )
            .join('');
          lista.insertAdjacentHTML('beforeend', elementos);
        }

        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (data.length === 1) {
          const countryInfo = data
            .map(
              country =>
                `<li class="country-element">
                    <div class="img-text">
                        <img class="country-limg"src=${
                          country.flags.png
                        } width = 80px> 
                        <h2> ${country.name.common} </h2>
                    </div>

                    <p><b>Capital:</b> ${country.capital}</p>
                    <p><b>Poblacion:</b> ${country.population}</p>
                    <p><b>Idiomas:</b> ${Object.values(country.languages)}</p>
                </li>`
            )
            .join('');

          lista.insertAdjacentHTML('beforeend', countryInfo);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
};
const DEBOUNCE_DELAY = 500;

input.addEventListener('input', debounce(handleSearchCountry, DEBOUNCE_DELAY));
