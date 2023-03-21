const tarjetasHome = document.getElementById('cards-home')
const buscador = document.getElementById('buscador')
const contenedorCheck = document.getElementById('checkContainer')

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let evento = []
fetch(urlApi)
.then(response => response.json())
.then(data => {
    evento = data.events
    crearEventos(evento)
    crearCheckboxes(evento)
})
.catch(error => {
  console.log(error);
})

function crearEventos(arrayEventos) {
  if(arrayEventos.length == 0){
   return tarjetasHome.innerHTML = `<h2 class="display-1 fw-bolder">No se encontraron eventos 😥</h2>`
}
    let eventosHome = ''
    for (const evento of arrayEventos) {
        eventosHome += `<div class="col d-flex align-items-stretch">
        <div class="card border-secondary shadow">
        <img src="${evento.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${evento.name}</h5>
          <p class="card-text">${evento.description}</p>
        </div>
        <div class="card-footer d-flex flex-column align-items-center">
          <p class="card-text">Price: $ ${evento.price}</p>
          <a type="button" href="./details.html?id=${evento._id}" class="btn btn-outline-danger" value="See more" id="button">Details</a>
        </div>
       </div>
      </div>`
    }
    tarjetasHome.innerHTML = eventosHome
}

function seeDetail(id) {
  window.location.href = `./details.html?id=${id}`
}

function crearCheckboxes(array) {
  let eventsCategories = array.map(event => event.category)
  let arrayCategories = Array.from(new Set(eventsCategories))
  let checkboxes = ''
  arrayCategories.forEach(category => {
    checkboxes += `
  <div class="form-check-inline">
  <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
  <label class="form-check-label" for="${category}">${category}</label>
  </div>`
  })
  contenedorCheck.innerHTML = checkboxes
}

function crearCheckboxes(array) {
  let eventsCategories = array.map(event => event.category)
  let arrayCategories = Array.from(new Set(eventsCategories))
  let checkboxes = ''
  arrayCategories.forEach(category => {
    checkboxes += `
  <div class="form-check-inline">
  <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
  <label class="form-check-label" for="${category}">${category}</label>
  </div>`
  })
  contenedorCheck.innerHTML = checkboxes
}

function checkboxFiltro(array) {
  let checkbox = document.querySelectorAll('input[type="checkbox"]')
  let arrayChecks = Array.from(checkbox)
  let checkboxChecks = arrayChecks.filter(check => check.checked)
  let checkboxValue = checkboxChecks.map(check => check.value)
  let checkFilter = array.filter(evento => checkboxValue.includes(evento.category))
  console.log(checkFilter);
  
   if(checkboxChecks.lenght > 0){
    return checkFilter
   } else {
    return array  
   }
  }

function buscadorFiltro(array, texto) {
  let arrayBuscador = array.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayBuscador
}

function dobleFiltro() {
  let primerFiltro = buscadorFiltro(evento, buscador.value)
  let segundoFiltro = checkboxFiltro(primerFiltro)
  crearEventos(segundoFiltro)
}

buscador.addEventListener('input', dobleFiltro)
contenedorCheck.addEventListener('change', dobleFiltro)



/* checkboxes.addEventListener("change",() => {
  const checkedValues = [] 
  checkedValues.filter(input => input.checked).map(input => input.value);
  const checkInfo = eventos.events.filter(({ category }) => checkedValues.includes(category));
  console.log(checkInfo);
}); */

/* 
checkboxes.forEach((check) => {
  check.addEventListener('click', (event) => {
    let checked = event.target.checked
    if (checked) {
      checkInfo.push(...eventos.events.filter((event)=>event.category == checkboxes.value))
      tarjetasHome.innerHTML = crearEventos(checkInfo)
    }
    else if (unchecked) { 
      checkInfo = checkInfo.filter((uncheck) => uncheck !== event.target.value);
      checkInfo.push(...eventos.events.filter((event)=>event.category == checkboxes.value));
      tarjetasHome.innerHTML = crearEventos(checkInfo)
      } 
    else {
      tarjetasHome.innerHTML = home

    }
  })
 }); */

/* for (const checkbox of checkboxes) {
  checkbox.addEventListener("click",() => {
    if (checkbox.checked) {
      let checkInfo = eventos.events.map((event)=>event.category == checkbox.value)
      tarjetasHome.innerHTML = crearEventos(checkInfo)
    }
    else {
      tarjetasHome.innerHTML = home;
    }
  }
)} */


/* function listaFiltrada(arrayEventos) {
  arrayEventos.forEach(evento => {
    let eventfiltrado += 
  }
} */

/* let eventFilter = function(event) {
  keyword = buscador.value.toLowerCase();
  let eventFiltrado = eventos.events.filter(function(evento) {
    evento = evento.toLowerCase();
    return evento.indexOf(keyword) > -1;
  });
  crearEventos(eventFiltrado);
}

/* buscador.addEventListener('keyup', () => {
  let eventFiltrado = eventos.events.filter((evento)=>evento.name.toLowerCase().includes(buscador.value.toLowerCase()))
  crearEventos(eventFiltrado)
}) */