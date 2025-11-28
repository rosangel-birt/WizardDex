export function procesarPersonajes(respuesta) { 
    const total = respuesta.meta.pagination.records;
    let personajesVivos = 0;
    const personajesPorCasa = {};
    const listaPersonajes = [];

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

        listaPersonajes.push(personaje.attributes);
    });
    
    return {
        total,
        personajesVivos,
        personajesPorCasa,
        listaPersonajes
    }
}