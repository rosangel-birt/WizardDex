// Fichero que se encarga de recuperar los personajes
export function fetchConFiltrosDePersonajes(filtros, pagina) {
    let url =
        "https://api.potterdb.com/v1/characters?page[number]=" + pagina + "&filter[house_not_null]=true";
    filtros.forEach((filtro) => {
        url += "&filter[" + filtro.tipo + "]=" + filtro.valor;
    });
    const res = fetch(url);
    return res.then((r) => r.json());
}
