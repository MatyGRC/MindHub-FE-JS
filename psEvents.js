const tarjetasPs = document.getElementById('cards-ps')
const buscador = document.getElementById('buscador')
const checkboxes = document.querySelectorAll('.checkbox')

 let pastEv = []
 
    for (let index = 0; index < eventos.events.length; index++) {
     if (eventos.events[index].date < eventos.currentDate) {
      pastEv.push(eventos.events[index])
     }
    }

function crearEventos(arrayEventos) {
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
          <button type="button" class="btn btn-outline-danger">See more...</button>
        </div>
       </div>
      </div>`
    }
    return eventosPs
}

let past = crearEventos(pastEv)
tarjetasPs.innerHTML = past

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
    eventFiltrado.push(...pastEv.filter((event)=>event.name.toLocaleLowerCase().includes(inputBuscador.toLocaleLowerCase()))
     );  
     tarjetasPs.innerHTML = crearEventos(eventFiltrado);
   }else{
    tarjetasPs.innerHTML = past;
   }
}

let checkInfo = []

for (const checkbox of checkboxes) {
  checkbox.addEventListener("click",() => {
    if (checkbox.checked) {
      checkInfo.push(...pastEv.filter((event)=>event.category == checkbox.value))
      tarjetasPs.innerHTML = crearEventos(checkInfo)
    }
    else {
      tarjetasPs.innerHTML = past;
    }
  });
}