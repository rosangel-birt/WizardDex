/**
 * Muestra en pantalla toda la información de un personaje: su foto, nombre
 * y una lista con sus datos más importantes. Si tiene alias o un enlace a su
 * wiki, también los agrega.
 */

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

    if (personaje.aliases && personaje.aliases.length > 0) {
        // El personaje tiene aliases, los concatenamos para mostrarlos
        agregarDato("Alias", personaje.aliases.join(", ")); // La función join los junta con una coma
    }

    // Agregar el link para ir a la wiki
    if (personaje.link) {
        const elementoLink = document.createElement("li");
        const link = document.createElement("a");
        link.classList.add("link");
        link.href = personaje.link;
        link.innerText = "Ver más info en la wiki ->";
        link.target = "_blank";

        elementoLink.appendChild(link);
        listaDatos.appendChild(elementoLink);
    }

    contenedorFicha.appendChild(listaDatos);
}