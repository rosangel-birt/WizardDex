/**
 * Actualiza el elemento de NPersonajes con el número de personajes disponibles
 */
export function actualizarNPersonajes(personajesDisponibles) {
    const elementoHtml = document.getElementById("nPersonajes");
    elementoHtml.innerText = personajesDisponibles;
}

export function actualizarVivos(personajesVivos, totalDePersonajes) {
    const elementoHtml = document.getElementById("porcentajeVivos");
    elementoHtml.innerText = (
        (personajesVivos / totalDePersonajes) *
        100
    ).toFixed(2);
}

export function actualizarDistribucion(personajesPorCasa) {
    const elementoHtml = document.getElementById("proporcionPorEscuela");
    elementoHtml.innerHTML = "";
    Object.entries(personajesPorCasa).forEach(([casa, personajes]) => {
        const elementoCasa = document.createElement("span");
        elementoCasa.innerText = casa + ": " + personajes;
        elementoHtml.appendChild(elementoCasa);
    });
}

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
    elementoPersonaje.classList.add("personaje");
    elementoPersonaje.appendChild(elementoImagen);
    elementoPersonaje.appendChild(elementoNombre);
    elementoPersonaje.appendChild(elementoCasa);

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
