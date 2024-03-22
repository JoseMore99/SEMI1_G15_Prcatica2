


function datos_usuario() {
    cargarImagen('/img/barca_neon.jpg');
    // Lógica para obtener datos desde AWS
    const usuario = obtenerUsuario(); // Ejemplo
    const nombreCompleto = obtenerNombreCompleto(); // Ejemplo

    // Actualizar los elementos <p>
    document.getElementById('nombre_usuario').textContent = usuario;
    document.getElementById('nombre_completo').textContent = nombreCompleto;


}

// Llama a la función al cargar la página
window.onload = datos_usuario;
//window.onload = cargarImagen('/img/barca_neon.jpg');

function obtenerUsuario() {
    //Consultar nombre de usuario BD AWS
    const user = "UserPrueba"
    return user
}

function obtenerNombreCompleto() {
    //Obtener nombre completo BD AWS
    const nombreC = "Sebastián Jerez"
    return nombreC
}

// Obtener imagen
function cargarImagen(ruta) {
    const rutaImagen = ruta; // Ruta específica de la imagen

    // Obtén el elemento <img> por su id
    const imgElemento = document.getElementById('img_user');

    // Asigna la ruta de la imagen al atributo src
    imgElemento.src = ruta;
}

