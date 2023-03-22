const tarjetasUp = document.getElementById('cards-up')
const buscador = document.getElementById('buscador')
const contenedorCheck = document.getElementById('checkContainer')

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let eventosFuturos = []
fetch(urlApi)
.then(response => response.json())
.then(data => {
    eventosFuturos = eventosFut(data.events, data.currentDate)
    crearEventos(eventosFuturos)
    crearCheckboxes(eventosFuturos)
    checkboxFiltro(eventosFuturos)
})
.catch(error => {
  console.log(error);
})

function eventosFut(data, currentDate) {
  return data.filter(evento => evento.date > currentDate)
}
function crearEventos(arrayEventos) {
  if(arrayEventos.length == 0){
    return tarjetasUp.innerHTML = `<h2 class="display-1 fw-bolder">No se encontraron eventos 😥</h2>`
 }
    let eventosUp = ''
    for (const evento of arrayEventos) {
        eventosUp += `<div class="col d-flex align-items-stretch">
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
    tarjetasUp.innerHTML = eventosUp
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

function checkboxFiltro(array) {
  let checkbox = document.querySelectorAll('input[type="checkbox"]')
  let arrayChecks = Array.from(checkbox)
  let checkboxChecks = arrayChecks.filter(check => check.checked)
  let checkboxValue = checkboxChecks.map(check => check.value)
  let checkFilter = array.filter(evento => checkboxValue.includes(evento.category))
  
   if(checkboxChecks.length > 0){
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
  let primerFiltro = buscadorFiltro(eventosFuturos, buscador.value)
  let segundoFiltro = checkboxFiltro(primerFiltro)
  crearEventos(segundoFiltro)
}

buscador.addEventListener('input', dobleFiltro)
contenedorCheck.addEventListener('change',dobleFiltro)

