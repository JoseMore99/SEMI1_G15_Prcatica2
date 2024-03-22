

// Obtener los elementos del formulario
const nombre_foto = document.getElementById("photo-name");
const album_selec = document.getElementById("album-select");

document.getElementById("upload-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener los valores ingresados por el usuario
    const name_foto = nombre_foto.value;
    const nombre_album = album_selec.value;

    // Mostrar los valores en la consola
    console.log("Nombre de la foto: ", name_foto);
    console.log("Album seleccionado: ", nombre_album);

    if (name_foto != '') {
        if (nombre_album != '') {
            //Agregar logica para guardar album y nombre de foto en AWS
            alert("Foto: " + name_foto + " se guardo en " + nombre_album);
        }else{
            alert("No se ha seleccionado ningún álbum");
        }
    } else {
        alert('No ha registrado un nombre para la foto');
    }


});

function cargar_datos() {
    //cargarImagen('/img/barca_neon.jpg');
    //Funcion para llenar las opciones de albumes disponibles
    llenarAlbumes()
    
}
// Llama a la función al cargar la página
window.onload = cargar_datos;

//Obtener elemento del input de la imagen seleccionada
const imagen_selec = document.getElementById('avatar-input');


imagen_selec.addEventListener('change', handleImageUpload);

// Función para manejar la imagen
function handleImageUpload(event) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado

    if (file) {
        // Crea un objeto URL para la imagen seleccionada
        const imageUrl = URL.createObjectURL(file);

        // Actualiza la imagen en la sección de avatar
        const avatarImage = document.getElementById('img_user');
        avatarImage.src = imageUrl;

        // Puedes guardar la URL de la imagen en una variable manipulable aquí
        // Por ejemplo:
        // const imageUrlVariable = imageUrl;
    }
}


// Obtener imagen
function cargarImagen(ruta) {
    const rutaImagen = ruta; // Ruta específica de la imagen

    // Obtén el elemento <img> por su id
    const imgElemento = document.getElementById('img_user');

    // Asigna la ruta de la imagen al atributo src
    imgElemento.src = ruta;
}

// Arreglo de nombres de álbumes
const albumes = ["Gatos", "Perros", "Familia", "Universidad"];

// Función para llenar las opciones del select
function llenarAlbumes() {
    const select = document.getElementById("album-select");
    obtener_albumes();
    // Itera sobre el arreglo de albumes y crea una opción para cada uno
    albumes.forEach((album) => {
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
function obtener_albumes(){
    //Logica para llenar el album de albumes en la nube
    albumes.push("Personal");
}
