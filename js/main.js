import { obtenerPersonaje } from "./data/personaje.data.js";
import {
    fetchConFiltrosDePersonajes
} from "./data/personajes.data.js";
import { procesarPersonajes } from "./models/personajes.model.js";
import { procesarPersonaje } from "./models/procesarPersonaje.model.js";
import {
    actualizarDistribucion,
    actualizarNPersonajes,
    actualizarVivos,
    actualizarPersonajes,
} from "./services/actualizarDOM.service.js";
import { actualizarPersonaje } from "./services/fichaPersonaje.service.js";
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

function iniciarPersonaje() {
    const parametros = new URLSearchParams(window.location.search);
    const idPersonaje = parametros.get("personaje");
    const respuesta = obtenerPersonaje(idPersonaje);
    respuesta.then(r => {
        const estado = procesarPersonaje(r);
        actualizarPersonaje(estado);
    });
}

if (!window.location.pathname.includes("personaje")){
    window.addEventListener("load", actualizar);
    const botonFiltros = document.getElementById("botonFiltros");
    botonFiltros.addEventListener("click", actualizar);
} else {
    // Página del personaje en concreto, debería mostrar solo la información relevante
    // haciendo la consulta correspondiente para recibir esos datos
    iniciarPersonaje();
}
