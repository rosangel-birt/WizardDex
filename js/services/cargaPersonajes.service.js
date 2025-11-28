const urlImagenGenerica = "https://potterdb.com/images/missing_character.svg";

/**
 * Actualiza el elemento de NPersonajes con el número de personajes disponibles
 */
function actualizarNPersonajes(personajesDisponibles) {
    const elementoHtml = document.getElementById("nPersonajes");
    elementoHtml.innerText = personajesDisponibles;
}

function actualizarVivos(personajesVivos, totalDePersonajes) {
    const elementoHtml = document.getElementById("porcentajeVivos");
    elementoHtml.innerText = (personajesVivos / totalDePersonajes * 100).toFixed(2);
}

function actualizarDistribucion(personajesPorCasa, totalDePersonajes) {
    const elementoHtml = document.getElementById("proporcionPorEscuela");
    let textoAMostrar = "";
    Object.entries(personajesPorCasa).forEach(([casa, personajes]) => {
        textoAMostrar += casa + ": " + personajes + "\n";
    });
    
    elementoHtml.innerText = textoAMostrar;
}

function agregarPersonajeALaLista(personaje) {
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

export function cargarPersonajes() {
    const consulta = fetch("https://api.potterdb.com/v1/characters");

    consulta
        .then((res) => res.json())
        .then((respuesta) => {
            const personajesDisponibles = respuesta.meta.pagination.records;
            actualizarNPersonajes(personajesDisponibles);
            const personajesPorCasa = {};
            let personajesVivos = 0;
            respuesta.data.forEach((personaje) => {
                const estaVivo = personaje.attributes.died == null;
                if (estaVivo) {
                    personajesVivos += 1;
                }
                
                const casa = personaje.attributes.house;
                if (casa != null) {
                    if (!personajesPorCasa[casa]) {
                        personajesPorCasa[casa] = 0;
                    }
                    personajesPorCasa[casa] += 1;
                } else {
                    if (!personajesPorCasa["Ninguna"]) {
                        personajesPorCasa["Ninguna"] = 0;
                    }
                    personajesPorCasa["Ninguna"] += 1;
                }

                // Se agrega a la lista de personajes visibles
                agregarPersonajeALaLista(personaje.attributes);
            });

            actualizarVivos(personajesVivos, respuesta.data.length);
            actualizarDistribucion(personajesPorCasa, respuesta.data.length);
        });
}
