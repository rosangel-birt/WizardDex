import { obtenerPersonaje } from "./data/personaje.data.js";
import { fetchConFiltrosDePersonajes } from "./data/personajes.data.js";
import { procesarPersonajes } from "./models/personajes.model.js";
import { procesarPersonaje } from "./models/procesarPersonaje.model.js";
import {
    actualizarDistribucion,
    actualizarNPersonajes,
    actualizarVivos,
    actualizarPersonajes,
    actualizarPaginacion,
} from "./services/actualizarDOM.service.js";
import { actualizarPersonaje } from "./services/fichaPersonaje.service.js";
import { extraerFiltros } from "./services/obtenerFiltros.service.js";


/**
 * 
 * Contiene la lógica principal del proyecto. Carga los personajes, actualiza 
 * la información mostrada por pantalla y gestiona la paginación
 */
function actualizar(pagina = 1) {
    const filtros = extraerFiltros();
    const respuesta = fetchConFiltrosDePersonajes(filtros, pagina);
    respuesta.then((r) => {
        const estado = procesarPersonajes(r);
        actualizarNPersonajes(estado.total);
        actualizarVivos(estado.personajesVivos, estado.listaPersonajes.length);
        actualizarDistribucion(estado.personajesPorCasa);
        actualizarPersonajes(estado.listaPersonajes);

        // Gestionamos los botones de paginación
        const anterior = r.links.prev;
        const siguiente = r.links.next;
        const paginaActual = r.meta.pagination.current;
        const ultimaPagina = r.meta.pagination.last ? r.meta.pagination.last : paginaActual;
        const onClickAnterior = () => {
            actualizar(paginaActual - 1);
        };
        const onClickSiguiente = () => {
            actualizar(paginaActual + 1);
        };
        actualizarPaginacion(
            anterior ? onClickAnterior : null,
            siguiente ? onClickSiguiente : null,
            paginaActual + "/" + ultimaPagina
        );
        console.log(r);
    });
}

function iniciarPersonaje() {
    const parametros = new URLSearchParams(window.location.search);
    const idPersonaje = parametros.get("personaje");
    const respuesta = obtenerPersonaje(idPersonaje);
    respuesta.then((r) => {
        const estado = procesarPersonaje(r);
        actualizarPersonaje(estado);
    });
}

if (!window.location.pathname.includes("personaje")) {
    window.addEventListener("load", actualizar);
    const botonFiltros = document.getElementById("botonFiltros");
    botonFiltros.addEventListener("click", actualizar);
} else {
    // Página del personaje en concreto, debería mostrar solo la información relevante
    // haciendo la consulta correspondiente para recibir esos datos
    iniciarPersonaje();
    const botonVolver = document.getElementById("botonVolver");
    botonVolver.addEventListener("click", () => {
        // Vuelve a la página principal
        window.location.href = "/";
    });
}
