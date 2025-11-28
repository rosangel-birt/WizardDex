/**
 * 
 * Fichero que procesa los datos de un personaje e incluye valores por defectos 
 * para atributos que puedan venir sin información
 */

export function procesarPersonaje(respuesta) {
    const atributos = respuesta.data.attributes;
    const nombre = atributos.name;
    const tipoDeSangre = atributos.blood_status || "Desconocido";
    const nacimiento = atributos.born;
    const muerte = atributos.died || "Vivo o Desconocido";
    const casa = atributos.house;
    const sexo = atributos.gender;
    const imagen = atributos.image;
    const especie = atributos.species || "Desconocida";
    const nacionalidad = atributos.nationality || "Desconocida";
    const aliases = atributos.alias_names;
    const link = atributos.wiki;
    
    return {
        nombre,
        tipoDeSangre,
        nacimiento,
        muerte,
        casa,
        sexo,
        imagen,
        especie,
        nacionalidad,
        aliases,
        link,
    };
}
