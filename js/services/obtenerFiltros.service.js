/**
 * Extrae los filtros de los elementos html y devuelve un array que contiene todos
 * estos, de manera que puedan ser utilizados por la capa de data para hacer el filtrado
 * @returns Array con filtros, de esta forma: {tipo: tipo de filtro, valor: valor del filtro}
 */
export function extraerFiltros() {
    const filtros = [];

    const filtroNombreElemento = document.getElementById("filtroNombre");
    if (filtroNombreElemento.value != "") {
        const filtroNombre = {
            tipo: "name_cont",
            valor: filtroNombreElemento.value,
        };
        filtros.push(filtroNombre);
    }

    const filtroCasasElemento = document.getElementById("filtroCasa");
    if (filtroCasasElemento.value != "") {
        const filtroCasa = {
            tipo: "house_cont",
            valor: filtroCasasElemento.value,
        };
        filtros.push(filtroCasa);
    }

    const filtroEstadoElemento = document.getElementById("filtroVivoOMuerto");
    if (filtroEstadoElemento.value !== "") {
        const filtroEstado = {
            tipo: "died_not_null",
            valor: filtroEstadoElemento.value === "muerto" ? "true" : "false",
        };
        filtros.push(filtroEstado);
    }
    return filtros;
}
