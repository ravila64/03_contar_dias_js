let events=[];
let arr=[]; // cargar informacion

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer");

const json=load();
try {
    arr=JSON.parse(json);
} catch (error) {
    arr=[];
}
// utilizar el operador ternario 
events = arr ? [...arr] : [];  // si esta vacio lo asigna
renderEvents(); // para que coloque la info que fue salvada

buttonAdd.addEventListener('click', (e) => {
    e.preventDefault();
    addEvent();
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    addEvent();
});

function addEvent(){
    //console.log(eventDate.textContent, eventName.textContent);
    if(eventName.value==="" || eventDate.value===""){
        return;
    }else{
        console.log("No esta vacio 2 variables ",eventDate.value, eventName.value);
    };

    if(dateDiff(eventDate.value)<0){
        return;
    }else{
        console.log("Fecha correcta ",eventDate.value);
    };

    //slice(3), quita 3 primeros elementos 
    const newEvent={
        id: (Math.random() * 100).toString(36).slice(3),
        name:eventName.value,
        date:eventDate.value,
    };

    events.unshift(newEvent); // inserta al comienzo del array
    // salvar el evento de tipo string, desde array, con JSON.stringify
    save(JSON.stringify(events));

    eventName.value="";
    renderEvents();
}

function dateDiff(d){
    const targetDate= new Date(d);
    const today= new Date();
    const difference = targetDate.getTime() - today.getTime();
    const days=Math.ceil(difference / (1000*3600*24));
    console.log("Numero de dias ",days);
    return days;
}

// data-id: meta propiedad
function renderEvents() {
    const eventsHTML = events.map(event  => {
    return `
        <div class="task">
            <div class="days"><span class="days-number">${dateDiff(event.date)}
                </span><span class="days-text">días</span>
            </div>
            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="actions">
                <button class="bDelete" data-id="${event.id}">Eliminar</button>
            </div>
        </div>
        `;
    });
    eventsContainer.innerHTML= eventsHTML.join("");
    document.querySelectorAll('.bDelete').forEach(button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            // tomando solo elementos diferentes al  ID. seleccionado para eliminar
            events= events.filter(event => event.id !==id);
            // volver a salvar, para que el eliminado no salga, en el proximo render
            save(JSON.stringify(events));
            renderEvents();
        });
    });
}

// almacenar cada uno de los eventos
function save(data){
    localStorage.setItem("items",data);
}

function load() {
    return localStorage.getItem("items");
}

