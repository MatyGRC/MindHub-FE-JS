const tarjetasHome = document.getElementById('cards-home')

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
          <button type="button" class="btn btn-outline-danger">See more...</button>
        </div>
       </div>
      </div>`
    }
    return eventosHome
}

let home = crearEventos(eventos.events)
tarjetasHome.innerHTML = home