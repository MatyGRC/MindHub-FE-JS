const tarjetasHome = document.getElementById('cards-home')
const buscador = document.getElementById('buscador')
const checkboxes = document.querySelectorAll('.checkbox')

function crearEventos(arrayEventos) {
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
    return eventosHome
}

let home = crearEventos(eventos.events)
tarjetasHome.innerHTML = home

function seeDetail(id) {
  window.location.href = `./details.html?id=${id}`
}

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

let inputBuscador = ""

buscador.addEventListener("keyup",(event)=>{
  inputBuscador = event.target.value;
  buscadorFilter();
});

function buscadorFilter(){ 
  let eventFiltrado = [];
 
   if(inputBuscador !== ""){
    eventFiltrado.push(...eventos.events.filter((event)=>event.name.toLocaleLowerCase().includes(inputBuscador.toLocaleLowerCase()))
     );  
     tarjetasHome.innerHTML = crearEventos(eventFiltrado);
   }else{
     tarjetasHome.innerHTML = home;
   }
}

let checkInfo = []

for (const checkbox of checkboxes) {
  checkbox.addEventListener("click",() => {
    if (checkbox.checked) {
      checkInfo.push(...eventos.events.filter((event)=>event.category == checkbox.value))
      tarjetasHome.innerHTML = crearEventos(checkInfo)
    }
    else {
      tarjetasHome.innerHTML = home;
    }
  });
}