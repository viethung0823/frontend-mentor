const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const countriesElm = $('.countries');
const btnToggleElm = $('.btn-toggle');
const bodyElm = $('body');
const allCountriesElm = $('.all-countries');
const singleCountryElm = $('.single-country');

async function init() {
  if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    toggleMode('light');
  }
  const res = await fetch('https://restcountries.com/v2/all');
  const data = await res.json();
  renderData(data);
  tools();
}

function renderData(countries) {
  const numberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const lookup3Code = countries.map(country => country.alpha3Code);
  countries.map(country => {
    const countryFlag = country.flag;
    const countryName = country.name;
    const countryPopulation = country.population;
    const countryRegion = country.region;
    const countryCapital = country.capital;

    const countryElm = document.createElement('div');
    countryElm.classList.add('country');
    countryElm.innerHTML = `
    <img src="${countryFlag}" alt="" class ='country__flag'>
    <div class="country__info">
      <h2 class="country__name">${countryName}</h2>
      <p class="country__info__item">Population: <span>${numberWithCommas(countryPopulation)}</span></p>
      <p class="country__info__item">Region: <span>${countryRegion}</span></p>
      <p class="country__info__item">Capital: <span>${countryCapital}</span></p>
    </div>
    `;
    // ---------------------> display in detail <----------------------------
    countryElm.addEventListener('click', () => {
      allCountriesElm.style.display = 'none';
      singleCountryElm.style.display = 'grid';

      const countryNativeName = country.nativeName;
      const countrySubRegion = country.subregion;
      const countryTopDomain = country.topLevelDomain[0];
      const countryLanguages  = country.languages.map(e => e.name).join(", ");
      const countryBorders = country.borders;
      let countryCurrencies; 
      country.currencies === undefined ? countryCurrencies = "Don't have data" : countryCurrencies = country.currencies.map(e => e.name).join(", ");

      singleCountryElm.innerHTML = `
    <div class="btn btn--back">
      <ion-icon name="arrow-back-outline"></ion-icon>
      <p>Back</p>
    </div>
    <img src="${countryFlag}" alt="" class="single-country__flag">
    <div class="single-country__info">
      <h2 class="country__name">${countryName}</h2>
      <p class="country__info__item">Native Name: <span>${countryNativeName}</span></p>
      <p class="country__info__item">Population: <span>${numberWithCommas(countryPopulation)}</span></p>
      <p class="country__info__item">Region: <span>${countryRegion}</span></p>
      <p class="country__info__item">Sub Region: <span>${countrySubRegion}</span></p>
      <p class="country__info__item">Capital: <span>${countryCapital}</span></p>
      <p class="country__info__item">Top Level Domain: <span>${countryTopDomain}</span></p>
      <p class="country__info__item">Currencies: <span>${countryCurrencies}</span></p>
      <p class="country__info__item">Languages: <span>${countryLanguages}</span></p>
    </div>
    <div class="single-country__border">
      <h3>Border Countries:</h3>
      <div class='border-item-container'>
      </div>
    </div>
      `;
      const borerItemContainer = $('.border-item-container');
      if (countryBorders !==  undefined) {
        countryBorders.forEach(border => {
          const borderItem = document.createElement('span');
          const index = lookup3Code.indexOf(border);
          borderItem.textContent = countries[index].name;
          borerItemContainer.appendChild(borderItem);
        });
      }
      const backBtnElm = $('.btn--back');
      backBtnElm.addEventListener('click', () => {
        allCountriesElm.style.display = 'block';
        singleCountryElm.style.display = 'none';
      })
    })
    // ---------------------> display in detail <----------------------------
    countriesElm.appendChild(countryElm);
  })
}

function tools() {
  const countryElms = $$('.country');
  let validCountryArr = Array.from(countryElms);
  let invalidCountryArr = [];
  let invalidCountryFilterArr = [];

  const search = function () {
    let currentTextLength = 0;
    let previousTextLength;
    const searchElm = $('#search-input');
    const removeWhiteSpace = (str) => str.replace(/\s/g, '');
    searchElm.addEventListener("input", () => {
      isEmptySearch = searchElm.value.trim() === '';
      if (isEmptySearch) { // reset all country
        countryElms.forEach(countryElm => {
          countryElm.style.display = 'block';
        });
        validCountryArr = Array.from(countryElms);
        invalidCountryArr = [];
      } else {
        previousTextLength = currentTextLength;
        currentTextLength = removeWhiteSpace(searchElm.value).length;
        const isRemoveOneCharacter = previousTextLength - currentTextLength === 1;
        let validLength = validCountryArr.length;
        let invalidLength = invalidCountryArr.length;
        let countValidCountry = 0;
        if (isRemoveOneCharacter) { // if isRemoveOneCharacter we only need to search invalidCountryArr; 
          while (invalidLength !== 0) {
            invalidLength--;
            const countryElm = invalidCountryArr[invalidLength];
            const countryName = invalidCountryArr[invalidLength].childNodes[3].childNodes[1].textContent;
            const isFound = countryName.toLowerCase().trim().includes(searchElm.value.toLowerCase().trim());
            if (isFound) {
              countryElm.style.display = 'block';
              invalidCountryArr.splice(invalidLength, 1);
              validCountryArr.push(countryElm);
            }
          }
        } else {
          while (validLength !== 0) {
            validLength--;
            const countryElm = validCountryArr[validLength];
            const countryName = validCountryArr[validLength].childNodes[3].childNodes[1].textContent;
            const isFound = countryName.toLowerCase().trim().includes(searchElm.value.toLowerCase().trim());
            if (!isFound) {
              countryElm.style.display = 'none';
              validCountryArr.splice(validLength, 1);
              invalidCountryArr.push(countryElm);
            }
          }
          while (invalidLength !== 0) {
            invalidLength--;
            const countryElm = invalidCountryArr[invalidLength];
            const countryName = invalidCountryArr[invalidLength].childNodes[3].childNodes[1].textContent;
            const isFound = countryName.toLowerCase().trim().includes(searchElm.value.toLowerCase().trim());
            if (isFound) {
              countryElm.style.display = 'block';
              invalidCountryArr.splice(invalidLength, 1);
              validCountryArr.push(countryElm);
            }
          }
        }
        countValidCountry <= 3 ? countriesElm.style.justifyContent = 'flex-start' : countriesElm.style.justifyContent = 'space-between';
      }
    })
  }();

  const filter = function () {
    const filterBoxElm = $('.filter-box');
    filterBoxElm.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-box__item')) {
        const pElement = $('.filter-box>p');
        const iconElement = $('.filterIcon');
        const filterText = e.target.textContent;
        let validLength = validCountryArr.length;
        pElement.textContent = `Region: ${e.target.textContent}`;
        iconElement.setAttribute('name', 'close-outline');
        iconElement.classList.add('clear');
        iconElement.addEventListener('click', () => {
          let invalidLength = invalidCountryFilterArr.length;
          pElement.textContent = `Filter by Region`;
          iconElement.setAttribute('name', 'chevron-down-outline');
          iconElement.classList.remove('clear');
          while (invalidLength !== 0) {
            invalidLength--;
            const countryElm = invalidCountryFilterArr[invalidLength];
            countryElm.style.display = 'block';
            invalidCountryFilterArr.splice(invalidLength, 1);
            validCountryArr.push(countryElm);
          }
        })

        while (validLength !== 0) {
          validLength--;
          const countryElm = validCountryArr[validLength];
          const countryRegion = validCountryArr[validLength].childNodes[3].childNodes[5].textContent;
          const isFound = countryRegion.includes(filterText);
          if (!isFound) {
            countryElm.style.display = 'none';
            validCountryArr.splice(validLength, 1);
            invalidCountryFilterArr.push(countryElm);
          }
        }
      }
    })
  }();
}

function toggleMode(currentMode) {
  if (currentMode === 'light') {
    bodyElm.classList.remove('light');
    bodyElm.classList.add('dark');
    btnToggleElm.innerHTML = `<ion-icon name="moon" id="dark-icon"></ion-icon>Dark Mode`
  }
  if (currentMode === 'dark') {
    bodyElm.classList.remove('dark');
    bodyElm.classList.add('light');
    btnToggleElm.innerHTML = `<ion-icon name="sunny" id="light-icon"></ion-icon>Light Mode`;
  }
}

btnToggleElm.addEventListener('click', () => {
  toggleMode(bodyElm.className);
})

init();