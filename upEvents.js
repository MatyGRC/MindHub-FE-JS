const tarjetasPs = document.getElementById('cards-up')

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
tarjetasPs.innerHTML = upcoming