import {actualizarNPersonajes, actualizarVivos, actualizarDistribucion, agregarPersonajeALaLista} from './actualizarElementos.service.js';

export function cargarPersonajes() {
    const consulta = fetch("https://api.potterdb.com/v1/characters?filter[house_not_null]=true");

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
