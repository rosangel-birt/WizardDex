// Fichero que se encarga de recuperar los personajes

export function fetchPersonajes() {
    const res = fetch(
        "https://api.potterdb.com/v1/characters?filter[house_not_null]=true"
    );
    return res.then((r) => r.json());
}
