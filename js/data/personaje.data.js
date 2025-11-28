// Fichero que se encarga de recuperar un personaje dado un id
export function obtenerPersonaje(idPersonaje) {
    let url = "https://api.potterdb.com/v1/characters/" + idPersonaje;
    const res = fetch(url);
    return res.then((r) => r.json());
}
