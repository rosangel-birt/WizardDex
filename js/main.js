import { fetchPersonajes } from "./data/personajes.data.js";
import { procesarPersonajes } from "./models/personajes.model.js";
import { actualizarDistribucion, actualizarNPersonajes, actualizarVivos, actualizarPersonajes } from "./services/actualizarDOM.service.js";

function iniciar() {
    const respuesta = fetchPersonajes();
    respuesta.then(r => {
        const estado = procesarPersonajes(r);
        actualizarNPersonajes(estado.total);
        actualizarVivos(estado.personajesVivos, estado.listaPersonajes.length);
        actualizarDistribucion(estado.personajesPorCasa);
        estado.listaPersonajes.forEach(personaje => {
            actualizarPersonajes(personaje);
        });
        console.log(estado);
    });
}

window.addEventListener("load", iniciar);