import { destacarElemento } from "../../components/destacarElemento.js";

/**
 * Actualiza el elemento de NPersonajes con el número de personajes disponibles
 */
export function actualizarNPersonajes(personajesDisponibles) {
    const elementoHtml = document.getElementById("nPersonajes");
    elementoHtml.innerText = personajesDisponibles;
}
/**
 * 
 *  Actualiza el elemento porcentajeVivos para obtener el porcentaje de los
 *  los personajes vivos mostrados en la pantalla
 */
export function actualizarVivos(personajesVivos, totalDePersonajes) {
    const elementoHtml = document.getElementById("porcentajeVivos");
    elementoHtml.innerText = (
        (personajesVivos / totalDePersonajes) *
        100
    ).toFixed(2);
}

/**
 * 
 * Actualiza la cantidad de personajes que hay por cada casa de Hogwarts
 */
export function actualizarDistribucion(personajesPorCasa) {
    const elementoHtml = document.getElementById("proporcionPorEscuela");
    elementoHtml.innerHTML = "";
    Object.entries(personajesPorCasa).forEach(([casa, personajes]) => {
        const elementoCasa = document.createElement("span");
        elementoCasa.innerText = casa + ": " + personajes;
        elementoHtml.appendChild(elementoCasa);
    });
}

function onClickPersonaje(idPersonaje) {
    window.location.href = "./personaje.html?personaje=" + idPersonaje;
}

/**
 * 
 * Recibe un personaje y crea su ficha de con su nombre, casa e imagen
 * Agrega un click que redirige a la página con los detalles del personaje
 */
function actualizarPersonaje(personaje) {
    const urlImagenGenerica =
        "https://potterdb.com/images/missing_character.svg";
    const nombre = personaje.name;
    const casa = personaje.house;
    const imagen = personaje.image ? personaje.image : urlImagenGenerica;

    const elementoNombre = document.createElement("h2");
    elementoNombre.innerText = nombre;

    const elementoCasa = document.createElement("h2");
    elementoCasa.innerText = casa;

    const elementoImagen = document.createElement("img");
    elementoImagen.setAttribute("src", imagen);

    const elementoPersonaje = document.createElement("div");
    destacarElemento(elementoPersonaje);
    elementoPersonaje.classList.add("personaje");
    elementoPersonaje.appendChild(elementoImagen);
    elementoPersonaje.appendChild(elementoNombre);
    elementoPersonaje.appendChild(elementoCasa);

    elementoPersonaje.addEventListener("click", () => { onClickPersonaje(personaje.slug) });

    const elementoContenedor = document.getElementById("listaPersonajes");
    elementoContenedor.appendChild(elementoPersonaje);
}

export function actualizarPersonajes(personajes) {
    const elementoContenedor = document.getElementById("listaPersonajes");
    elementoContenedor.innerHTML = "";

    personajes.forEach((personaje) => {
        actualizarPersonaje(personaje);
    });
}

/**
 * 
 * Genera y actualiza los botones para el cambio de pantalla.
 * Teniendo un boton para ir a la página anterior y a la siguiente
 * Crea eventos para permitir el cambio de páginas
 */
export function actualizarPaginacion(onClickAnterior, onClickSiguiente, actual) {
    const elementoActual = document.createElement("span");
    elementoActual.id = "paginaActual";
    elementoActual.innerText = actual;
    const elementoAnterior = document.createElement("button");
    elementoAnterior.id = "paginaAnterior";
    elementoAnterior.innerText = "Página anterior";

    const elementoSiguiente = document.createElement("button");
    elementoSiguiente.id = "paginaSiguiente";
    elementoSiguiente.innerText = "Página siguiente"
    if (onClickAnterior) {
        elementoAnterior.disabled = false;
        elementoAnterior.addEventListener("click", onClickAnterior);
    } else {
        elementoAnterior.disabled = true;
    }

    if (onClickSiguiente) {
        elementoSiguiente.disabled = false;
        elementoSiguiente.addEventListener("click", onClickSiguiente);
    } else {
        elementoSiguiente.disabled = true;
    }

    const contenedorPaginacion = document.getElementById("paginacion");
    contenedorPaginacion.innerHTML = "";

    contenedorPaginacion.appendChild(elementoAnterior);
    contenedorPaginacion.appendChild(elementoActual);
    contenedorPaginacion.appendChild(elementoSiguiente);
}