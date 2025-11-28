/**
 * Destaca un elemento cuando se pone el ratón encima, y le quita el destacado cuando se quita
 * @param {*} elemento elemento a destacar
 */
export function destacarElemento(elemento) {
    if (elemento) {
        elemento.addEventListener("mouseover", () => {
            elemento.classList.add("destacado");
        });
        elemento.addEventListener("mouseout", () => {
            elemento.classList.remove("destacado");
        });
    }
}
