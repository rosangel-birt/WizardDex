export function extraerFiltros() {
    const filtroNombreElemento = document.getElementById("filtroNombre");
    const filtroNombre = {
        tipo: "name_cont",
        valor: filtroNombreElemento.value,
    };

    const filtroCasasElemento = document.getElementById("filtroCasa");
    const filtroCasa = { tipo: "house_cont", valor: filtroCasasElemento.value };

    return [filtroNombre, filtroCasa];
}
