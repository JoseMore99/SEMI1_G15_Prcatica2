
//Obtener elementos de la pagina
const album_selec = document.getElementById("album-select");
const nom_album = document.getElementById("nomA");

//Obtener datos de usuario logeado
const userId = localStorage.getItem('userId');
const profileImage = localStorage.getItem('profileImage');

// Obtener las secciones de imágenes
const imagesSection = document.querySelector('.images-section');
const albumsSection = document.querySelector('.albums-section');

//Arreglo de albumes de la nube
let albumesAWS = [];

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
//const images = ['/img/barca_neon.jpg', '/img/perfil1.jpg', '/img/pefil2.jpg', '/img/perfil3.jpg', '/img/perfil4.jpg'];
const profile_images = [];


// Agregar imágenes a la sección de álbumes
//const albumImages = ['/img/paisaje1.jpg', '/img/paisaje2.jpg', '/img/paisaje3.jpg', '/img/paisaje4.jpg', '/img/paisaje5.jpg'];
const albumImages = [];


// Establecer estilos para las secciones de imágenes
imagesSection.style.display = 'flex';
imagesSection.style.overflowX = 'auto';
imagesSection.style.alignItems = 'center';

albumsSection.style.display = 'flex';
albumsSection.style.overflowX = 'auto';
albumsSection.style.alignItems = 'center';


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
    // Obtén el índice del elemento seleccionado
    const indiceSeleccionado = album_selec.selectedIndex;
    // Obtén el elemento seleccionado
    const opcionSeleccionada = album_selec.options[indiceSeleccionado].textContent;
    // Establece el texto del elemento "nom_album"
    nom_album.textContent = `${opcionSeleccionada}`;

    //Mostrar fotos del album seleccionado
    imagenesAlbum(opcionSeleccionada);
});

// Llama a la función al cargar la página
window.onload = cargarImagen(profileImage);
window.onload = cargar_datos();
window.onload = imagenesPerfil();

//Funcion para mostrar imagenes de perfil
function imagenesPerfil() {
    fetch('http://localhost:3000/img/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUser: userId
        })
    })
        .then(response => {
            if (response.ok) {
                alert("Album " + nomA + "modificado con exito!");
                return response.json();
            } else {
                throw new Error('Error al modificar el álbum');
            }
        })
        .then(data => {
            const data_array = data.data; // Accede al arreglo "data"
            if (Array.isArray(data_array)) {
                // Verifica si 'data' es un array
                data_array.forEach(album => {
                    if (album.Album == "default"){
                        profile_images.push(album.picture); // Agrega el objeto al array
                    }
                });
                //Mostrar las imagenes
                profile_images.forEach(ruta => {
                    addImage(imagesSection, ruta, '150px', '150px');
                });
            } else {
                console.error('Error: Los datos no son un array');
            }
            console.log('Fotos perfil:', data.message);
            // Puedes realizar otras acciones después de crear el álbum si es necesario
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//Funcion para mostrar imagenes de album
function imagenesAlbum(nomAlbum){
    while (albumsSection.firstChild) {
        albumsSection.removeChild(albumsSection.firstChild);
    }
    fetch('http://localhost:3000/img/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUser: userId
        })
    })
        .then(response => {
            if (response.ok) {
                alert("Album " + nomA + "modificado con exito!");
                return response.json();
            } else {
                throw new Error('Error al modificar el álbum');
            }
        })
        .then(data => {
            const data_array = data.data; // Accede al arreglo "data"
            if (Array.isArray(data_array)) {
                // Verifica si 'data' es un array
                data_array.forEach(album => {
                    if (album.Album == nomAlbum){
                        albumImages.push(album.picture); // Agrega el objeto al array
                    }
                });
                albumImages.forEach(ruta => {
                    addImage(albumsSection, ruta, '150px', '150px');
                });
            } else {
                console.error('Error: Los datos no son un array');
            }
            console.log('Fotos album: ', data.message);
            // Puedes realizar otras acciones después de crear el álbum si es necesario
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//Funcion para cagar nombres de albumes GET Albums
function cargar_datos() {
    //Obtener datos de usuario logeado
    const userId = localStorage.getItem('userId');
    console.log("Id de Usuario: " + userId)

    fetch('http://localhost:3000/album/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUser: userId
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parsea la respuesta como JSON
            } else {
                throw new Error('Error al obtener albumes');
            }
        })
        .then(data => {
            const data_array = data.data; // Accede al arreglo "data"
            if (Array.isArray(data_array)) {
                // Verifica si 'data' es un array
                data_array.forEach(album => {
                    const albumObject = {
                        albumName: album.albumName,
                        idAlbum: album.idAlbum
                    };
                    albumesAWS.push(albumObject); // Agrega el objeto al array
                });
                console.log(albumesAWS)
                vaciarAlbumes()
                llenarAlbumes()
                console.log('Álbum editado exitosamente:', data.message);
                // Realiza otras acciones después de editar el álbum si es necesario
            } else {
                console.error('Error: Los datos no son un array');
            }
            // Puedes realizar otras acciones después de editar el álbum si es necesario
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

// Función para llenar las opciones del select
function llenarAlbumes() {
    const select = document.getElementById("album-select");
    // Itera sobre el arreglo de albumes y crea una opción para cada uno
    albumesAWS.forEach((album) => {
        const option = document.createElement("option");
        option.value = album.idAlbum
        option.textContent = album.albumName;
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
