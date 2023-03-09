const tarjetasUp = document.getElementById('cards-up')
const buscador = document.getElementById('buscador')
const checkboxes = document.querySelectorAll('.checkbox')

function eventoUp() {
    let array = []
    for (let index = 0; index < eventos.events.length; index++) {
     if (eventos.events[index].date > eventos.currentDate) {
        array.push(eventos.events[index])
     }
    }
    return array
}

let upEv = eventoUp()

function crearEventos(arrayEventos) {
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
          <button type="button" class="btn btn-outline-danger">See more...</button>
        </div>
       </div>
      </div>`
    }
    return eventosUp
}

let upcoming = crearEventos(upEv)
tarjetasUp.innerHTML = upcoming

function seeDetail(id) {
  window.location.href = `./details.html?id=${id}`
}

let inputBuscador = ""

buscador.addEventListener("keyup",(event)=>{
  inputBuscador = event.target.value;
  buscadorFilter();
});

function buscadorFilter(){ 
  let eventFiltrado = [];
 
   if(inputBuscador !== ""){
    eventFiltrado.push(...upEv.filter((event)=>event.name.toLocaleLowerCase().includes(inputBuscador.toLocaleLowerCase()))
     );  
     tarjetasUp.innerHTML = crearEventos(eventFiltrado);
   }else{
    tarjetasUp.innerHTML = upcoming;
   }
}

let checkInfo = []

for (const checkbox of checkboxes) {
  checkbox.addEventListener("click",() => {
    if (checkbox.checked) {
      checkInfo.push(...upEv.filter((event)=>event.category == checkbox.value))
      tarjetasUp.innerHTML = crearEventos(checkInfo)
    }
    else {
      tarjetasUp.innerHTML = upcoming;
    }
  });
}