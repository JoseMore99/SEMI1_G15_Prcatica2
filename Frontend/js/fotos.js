
//Obtener elementos de la pagina
const album_selec = document.getElementById("album-select");
const nom_album = document.getElementById("nomA");

// Obtener las secciones de imágenes
const imagesSection = document.querySelector('.images-section');
const albumsSection = document.querySelector('.albums-section');

// Función para crear y agregar una imagen con un tamaño específico
function addImage(container, src, width, height) {
    const img = document.createElement('img');
    img.src = src;
    img.style.width = width;
    img.style.height = height;
    img.style.marginRight = "10px"
    container.appendChild(img);
}

// Agregar imágenes a la sección de imágenes
const images = ['/img/barca_neon.jpg', '/img/perfil1.jpg', '/img/pefil2.jpg', '/img/perfil3.jpg', '/img/perfil4.jpg'];
images.forEach(ruta => {
    addImage(imagesSection, ruta, '150px', '150px');
});

// Agregar imágenes a la sección de álbumes
const albumImages = ['/img/paisaje1.jpg', '/img/paisaje2.jpg', '/img/paisaje3.jpg', '/img/paisaje4.jpg', '/img/paisaje5.jpg'];
albumImages.forEach(ruta => {
    addImage(albumsSection, ruta, '150px', '150px');
});

// Establecer estilos para las secciones de imágenes
imagesSection.style.display = 'flex';
imagesSection.style.overflowX = 'auto';
imagesSection.style.alignItems = 'center';

albumsSection.style.display = 'flex';
albumsSection.style.overflowX = 'auto';
albumsSection.style.alignItems = 'center';

//Arreglo de albumes de la nube
let albumesAWS = [];

// Mostrar imagen del usuario
function cargarImagen(ruta) {
    const rutaImagen = ruta; // Ruta específica de la imagen

    // Obtén el elemento <img> por su id
    const imgElemento = document.getElementById('img_user');

    // Asigna la ruta de la imagen al atributo src
    imgElemento.src = ruta;
}


// Escucha el evento de cambio en el select
album_selec.addEventListener("change", () => {
    const opcionSeleccionada = album_selec.value;
    nom_album.textContent = `${opcionSeleccionada}`;
});

// Llama a la función al cargar la página
window.onload = cargarImagen('/img/barca_neon.jpg');
window.onload = llenarAlbumes();

// Función para llenar las opciones del select
function llenarAlbumes() {
    const select = document.getElementById("album-select");
    obtener_albumes();
    // Itera sobre el arreglo de albumes y crea una opción para cada uno
    albumesAWS.forEach((album) => {
        const option = document.createElement("option");
        option.value = album.toLowerCase().replace(/\s+/g, "-"); // Convierte a minúsculas y reemplaza espacios por guiones
        option.textContent = album;
        select.appendChild(option);
    });
}

// Función para vaciar todas las opciones del select
function vaciarAlbumes() {
    const select = document.getElementById("album-select");
    while (select.options.length > 0) {
        select.remove(0);
    }
}

//Funcion para obtener los albumes disponibles en AWS
function obtener_albumes() {
    //Logica para llenar el album de albumes en la nube
    albumesAWS.push("Animales");
    albumesAWS.push("Familia");
    albumesAWS.push("Universidad");

}