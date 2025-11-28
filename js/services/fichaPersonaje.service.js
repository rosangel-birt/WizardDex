export function actualizarPersonaje(personaje) {
    const urlImagenGenerica =
        "https://potterdb.com/images/missing_character.svg";

    const imagen = personaje.imagen || urlImagenGenerica;

    const contenedorFicha = document.getElementById("fichaPersonaje");
    contenedorFicha.innerHTML = "";
    const encabezado = document.createElement("div");
    encabezado.classList.add("personaje", "fichaEncabezado");
    const elementoImagen = document.createElement("img");
    elementoImagen.src = imagen;
    
    const nombre = document.createElement("h2");
    nombre.innerText = personaje.nombre;
    
    encabezado.appendChild(elementoImagen);
    encabezado.appendChild(nombre);

    contenedorFicha.appendChild(encabezado);


    const listaDatos = document.createElement("ul");
    listaDatos.classList.add("fichaDatos");

    // Función de utilidad para ir agregando cada dato
    const agregarDato = (dato, valor) => {
        if (valor) {
            const elemento = document.createElement("li");
            elemento.innerHTML = "<strong>" + dato + "</strong>" + ": " + valor;
            listaDatos.appendChild(elemento);
        }
    }

    agregarDato("Género", personaje.sexo);
    agregarDato("Sangre", personaje.tipoDeSangre);
    agregarDato("Nacionalidad", personaje.nacionalidad);
    agregarDato("Casa", personaje.casa);
    agregarDato("Especie", personaje.especie);
    agregarDato("Nacimiento", personaje.nacimiento);
    agregarDato("Muerte", personaje.muerte);

    contenedorFicha.appendChild(listaDatos);
}