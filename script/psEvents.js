const tarjetasPs = document.getElementById('cards-ps')
const buscador = document.getElementById('buscador')
/* const checkboxes = document.querySelectorAll('.checkbox')
 */
const contenedorCheck = document.getElementById('checkContainer')

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let eventosPasados = []
fetch(urlApi)
.then(response => response.json())
.then(data => {
    eventosPasados = eventosPas(data.events, data.currentDate)
    crearEventos(eventosPasados)
    crearCheckboxes(eventosPasados)
})
.catch(error => {
  console.log(error);
})

function eventosPas(data, currentDate) {
  return data.filter(evento => evento.date < currentDate)
}

function crearEventos(arrayEventos) {
  if(arrayEventos.length == 0){
    return tarjetasPs.innerHTML = `<h2 class="display-1 fw-bolder">No se encontraron eventos 😥</h2>`
 }
    let eventosPs = ''
    for (const evento of arrayEventos) {
        eventosPs += `<div class="col d-flex align-items-stretch">
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
    tarjetasPs.innerHTML = eventosPs
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
  console.log(checkFilter);
  
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
  let primerFiltro = buscadorFiltro(eventosPasados, buscador.value)
  let segundoFiltro = checkboxFiltro(primerFiltro)
  crearEventos(segundoFiltro)
}

buscador.addEventListener('input', dobleFiltro)
contenedorCheck.addEventListener('change', dobleFiltro)

/* let inputBuscador = ""

buscador.addEventListener("keyup",(event)=>{
  inputBuscador = event.target.value;
  buscadorFilter();
});

function buscadorFilter(){ 
  let eventFiltrado = [];
 
   if(inputBuscador !== ""){
    eventFiltrado.push(...pastEv.filter((event)=>event.name.toLocaleLowerCase().includes(inputBuscador.toLocaleLowerCase()))
     );  
     tarjetasPs.innerHTML = crearEventos(eventFiltrado);
   }else{
    tarjetasPs.innerHTML = past;
   }
} */
/* 
let checkInfo = []

for (const checkbox of checkboxes) {
  checkbox.addEventListener("click",() => {
    if (checkbox.checked && !checkInfo.includes(checkbox.value)) {
      checkInfo.push(...pastEv.filter((event)=>event.category == checkbox.value))
      tarjetasPs.innerHTML = crearEventos(checkInfo)
    }
    else {
      tarjetasPs.innerHTML = past;
    }
  });
} */

/* let asistencia = pastEv.map(evento =>  evento.assistance)

maxAssist = Math.max(...asistencia)

              <div class="form-check-inline">
                <input class="form-check-input checkbox" type="checkbox" id="Food Fair" value="Food Fair">
                <label class="form-check-label" for="Food Fair">Food Fair</label>
              </div>
*/