let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let profile = []
let evento = []
let params = new URLSearchParams(document.location.search)
let id = params.get("id")
fetch(urlApi)
.then(response => response.json())
.then(data => {
    evento = data.events
    profile = evento.filter(evento => evento._id == id);
    printDetail(profile)
})
.catch(error => {
    console.log(error);
  })

function printDetail(obj) {
    const container = document.getElementById("container-detail");
let html = "";

html += `
    <div class="container d-flex flex-column align-items-center">
        <img src="${obj[0].image}" alt="${obj[0].name}">
        <div class="flex-column align-center">
            <h2>${obj[0].name}</h2>
            <div class="flex-detail-r">
            <p>Date: <span>${obj[0].date}</span></p>
            <p>Description: <span>${obj[0].description}</span></p>
            <p>Place: <span>${obj[0].place}</span></p>
            <p>Capacity: <span>${obj[0].capacity}</span></p>
            <p>Assistance: <span>${obj[0].assistance}</span></p>
            <p>Price: $<span>${obj[0].price}</span></p>
            </div>
        </div>
    </div>
    `
container.innerHTML = html
}
