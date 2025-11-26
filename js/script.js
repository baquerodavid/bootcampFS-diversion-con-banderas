const info = document.getElementById("info");

const countries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital,cca2');

    if (!response.ok) {
      throw new Error('Ha surgido un error ', response.status);
    }

    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log('Error al obtener los datos, ', error);
  }
}

const template = (countries) => {
  const container = document.getElementById('countries-list');
  const countriesSorted = countries.sort((a, b) => {
    const nameA = a.name.common.toUpperCase()
    const nameB = b.name.common.toUpperCase()
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  console.log(countriesSorted)
  let templateCountry = '';
  countriesSorted.map((country) => {
    templateCountry += `
    <div class="countryCard" id="${country.cca2}">
      <img src="${country.flags.svg}" alt="${country.flags.alt}" class="img-card" />
      <h2>${country.name.common}</h2>
    </div>
    `;
  });
  container.innerHTML = templateCountry;

  const cards = document.querySelectorAll('.countryCard')

  //Adapto mi cards.forEach por el de la Live Review
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      const country = countries[i];
      const { name: { common }, flags, car, population, capital } = country;

      info.classList.add("visible");

      const template = `
      <section class="result">
        <div class="info-country">
        <div class="closed" id="closed">X</div>
        <img src=${flags.png} alt="${flags.alt}" />
          <h2>${common}</h2>
          <p>Capital: ${capital[0]}</p>
          <p>Población: ${population}</p>
          <p>Conducción: ${car.side}</p>
        </div>
      </section>
      `
      info.innerHTML = template;
    })
    info.addEventListener("click", (e) => {
      if (e.target.classList.contains("closed")) {
        info.classList.remove("visible")
      }
    })
  })
}

countries().then((data) => template(data));

// 👇 CODIGO DE LA LIVE REVIEW EMPIEZA DESDE AQUÍ 👇

// traernos la info de la API https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital OK
// ponerlas en la pantalla -> name y flag OK
// ordenar por nombre ok
// al clickar saldrá la info por encima con todo (todas las fields) ok
//botón para cerrar el flotante ok
//todo funcione ok

// fetch("https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital")
// .then(response => response.json())
// .then(data => console.log(data))

/* const countriesList = document.getElementById("countries-list")
const info = document.getElementById("info")

async function getCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital")
    const data = await response.json()
    sortedCountries(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

function sortedCountries(countries) {
  countries.sort((a, b) => {
    const nameA = a.name.common.toUpperCase()
    const nameB = b.name.common.toUpperCase()
    return nameA.localeCompare(nameB, "es") //-> compara por idioma
  })
}

getCountries().then(countries => {
  const allCountries = countries.map(country => {
    const { name: { common }, flags } = country
    const template = `
    <li class="card">
      <img src=${flags.png} alt="${flags.alt}" />
      <h2>${common}</h2>
    </li>
    `
    return template
  }).join("")
  countriesList.innerHTML = allCountries

  const cards = document.querySelectorAll(".card")
  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const country = countries[i]
      const { name: { common }, flags, car, population, capital } = country

      info.classList.add("visible")

      const template = `
      <section class="result">
        <div class="info-county">
        <div class="closed" id="closed">X</div>
          <h2>${common}</h2>
          <p>Capital: ${capital[0]}</p>
          <img src=${flags.png} alt="${flags.alt}" />
          <p>Población: ${population}</p>
          <p>Conducción: ${car.side}</p>
        </div>
      </section>
      `
      info.innerHTML = template
    })
    info.addEventListener("click", (e) => {
      if (e.target.classList.contains("closed")) {
        info.classList.remove("visible")
      }
    })
  })
}) */