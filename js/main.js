import {
    fetchConFiltrosDePersonajes
} from "./data/personajes.data.js";
import { procesarPersonajes } from "./models/personajes.model.js";
import {
    actualizarDistribucion,
    actualizarNPersonajes,
    actualizarVivos,
    actualizarPersonajes,
} from "./services/actualizarDOM.service.js";
import { extraerFiltros } from "./services/obtenerFiltros.service.js";

function actualizar() {
    const filtros = extraerFiltros();
    const respuesta = fetchConFiltrosDePersonajes(filtros);
    respuesta.then((r) => {
        const estado = procesarPersonajes(r);
        actualizarNPersonajes(estado.total);
        actualizarVivos(estado.personajesVivos, estado.listaPersonajes.length);
        actualizarDistribucion(estado.personajesPorCasa);
        actualizarPersonajes(estado.listaPersonajes);
    });
}

window.addEventListener("load", actualizar);
const botonFiltros = document.getElementById("botonFiltros");
botonFiltros.addEventListener("click", actualizar);
