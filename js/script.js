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
  countriesSorted.forEach((country) => {
    templateCountry += `
    <div class="countryCard" id="${country.cca2}">
      <img src="${country.flags.svg}" alt="${country.name.common}" class="img-card" />
      <h2>${country.name.common}</h2>
    </div>
    `;
  });
  container.innerHTML = templateCountry;

  const cards = document.querySelectorAll('.countryCard')

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const code = card.id;
      console.log('Aquí está el code: ', code);
      const country = countriesSorted.find(c => c.cca2 === code);
      console.log(country);
      showModal(country);
    })
  })
}

const createModal = () => {
  const modal = document.createElement('div');
  modal.id = "country-modal";
  modal.classList.add('modal', 'hidden');

  modal.innerHTML = `
    <div class="modal-window">
      <div class="modal-content">
        <img id="modal-flag" src="" alt="" class="img-modal">
        <div class="modal-text">
          <h2 id="modal-name"></h2>
          <p><strong>Capital:</strong> <span id="modal-capital"></span></p>
          <p><strong>Población:</strong> <span id="modal-population"></span></p>
          <p><strong>Lado de la carretera:</strong> <span id="modal-car"></span></p>
        </div>
      </div>
      <button id="modal-close">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);
}

const showModal = (country) => {
  const modal = document.getElementById('country-modal');

  document.getElementById('modal-flag').src = country.flags.svg;
  document.getElementById('modal-name').textContent = country.name.common;
  document.getElementById('modal-capital').textContent = country.capital;
  document.getElementById('modal-population').textContent = country.population;
  document.getElementById('modal-car').textContent = country.car.side;

  modal.classList.remove('hidden');
}

document.addEventListener('click', (e) => {
  if (e.target.id === "modal-close") {
    document.getElementById('country-modal').classList.add('hidden');
  }
});

createModal();
countries().then((data) => template(data));