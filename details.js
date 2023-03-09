let params = new URLSearchParams(document.location.search)
let id = params.get("id")

let profile = eventos.events.filter(evento => evento._id == id);

const container = document.getElementById("container-detail");
let html = "";

html += `
    <div class="flex-row">
        <img src="${profile[0].image}" alt="${profile[0].name}">
        <div class="flex-column">
            <h2>${profile[0].name}</h2>
            <div class="flex-detail-r">
            <p>Date:<span>${profile[0].date}</span></p>
            <p>Description:<span>${profile[0].description}</span></p>
            <p>Place:<span>${profile[0].place}</span></p>
            <p>Capacity:<span>${profile[0].capacity}</span></p>
            <p>Assistance:<span>${profile[0].assistance}</span></p>
            <p>Price: $<span>${profile[0].price}</span></p>
            </div>
        </div>
    </div>
    `
container.innerHTML = html
