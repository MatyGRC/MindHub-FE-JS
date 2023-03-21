let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let eventosPasados = []
let eventosFuturos = []
/* async function traerDatos() {
    try {
        const response = await fetch(urlApi)
        console.log(response)
        const data = await response.json()
        console.log(data)
        eventos = data.events
        currentDate = data.currentDate
    } catch (error) {
        console.log(error);
    }
}

traerDatos() */ 

fetch(urlApi)
.then(response => response.json())
.then(data => {
    eventosPasados = eventosPas(data.events, data.currentDate)
    eventosFuturos = eventosFut(data.events, data.currentDate)
    dibujarTabla1(resultados(asistencia(eventosPasados), asistencia(eventosPasados).reverse(), capacidad(eventosPasados)), 'primer-tabla')
    dibujarTabla2(tablaCategorias(eventosFuturos), 'segunda-tabla')
    dibujarTabla2(tablaCategorias(eventosPasados), 'tercer-tabla')

/*  
    let tabl = tablaCategorias(eventosPasados)
    let assist = asistencia(eventosPasados)
    let cap = capacidad(eventosPasados) */
})
.catch(error => {
    console.log(error);
  })

function eventosPas(data, currentDate) {
return data.filter(evento => evento.date < currentDate)
}

function eventosFut(data, currentDate) {
    return data.filter(evento => evento.date > currentDate)
}

function asistencia(array) {
    const arrayPorcentaje = array.map(evento => {
        return {
            porcentajeAsistencia: (evento.assistance / evento.capacity) * 100,
            evento: evento.name
        }
    } )
    arrayPorcentaje.sort((a,b) => b.porcentajeAsistencia - a.porcentajeAsistencia)
    return arrayPorcentaje
}

function capacidad(array) {
    const maxCapacidad = array.reduce((acc, a) => {
        return acc.capacity > a.capacity ? acc : a
    })
    return maxCapacidad  
}

function resultados(mayor, menor, capacidad) {
    let resultado = {
        mayor: mayor[0].evento,
        menor: menor[0].evento,
        capacidad: capacidad.name,
    }
    return resultado
}

function dibujarTabla1(results, contenedor) {
    const table = document.getElementById(contenedor)
    table.innerHTML =  `
    <tr>
        <td>${results.mayor}</td>
        <td>${results.menor}</td>
        <td>${results.capacidad}</td>
    </tr>
    `
}

function tablaCategorias(array) {
    let categorias = Array.from(new Set(array.map(evento => evento.category)));
    let eventosCategorias = categorias.map(categoria => array.filter(evento => evento.category === categoria))
    console.log(eventosCategorias);
    let resultado = eventosCategorias.map(eventCat => {
        let calculo = eventCat.reduce((acc, event) => {
            acc.category = event.category;
            acc.revenues += event.price * (event.assistance || event.estimate);
            acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
            return acc
          }, {
            category: "",
            revenues: 0,
            attendance: 0
          })
          calculo.attendance = (calculo.attendance / eventCat.length).toFixed(2)
          return calculo
        })
        console.log(resultado);
        return resultado;
      }

function dibujarTabla2(array, contenedor) {
    const tablaFuturo = document.getElementById(contenedor)
    let html = array.map(eventos => {
        return `
        <tr>
            <td>${eventos.category}</td>
            <td>${eventos.revenues}</td>
            <td>${eventos.attendance}</td>
        </tr>
        `
    })
    console.log(html);
    tablaFuturo.innerHTML = html.join("")
}
