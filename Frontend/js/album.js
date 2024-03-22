
//Obtener valores del formulario
const nombre_album = document.getElementById("nom_album");
const album_eliminar = document.getElementById("album-select");



//Arreglo de albumes de la nube
let albumesAWS = [];

let primera_vez = true;


// Llama a la función al cargar la página
window.onload = llenarAlbumes();
window.onload = cargarImagen('/img/barca_neon.jpg');

//------------------ Funciones para los botones de albumes --------------------
//Funcion para agregar un album 
function agregarAlbum() {
    const nomA = nombre_album.value;
    //Verificar si hay un nombre de album que agregar
    if (nomA != '') {
        //Logica para agrrgar albuma la nube
        albumesAWS.push(nomA);
        vaciarAlbumes();
        llenarAlbumes();
        alert("El album " + nomA + " se agregó exitosamente!");

        const idUser = 'your_user_id'; 

        fetch('http://localhost:3000/album/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUser: idUser,
                albumName: nomA
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al crear el álbum');
                }
            })
            .then(data => {
                console.log('Álbum creado exitosamente:', data.message);
                // Puedes realizar otras acciones después de crear el álbum si es necesario
            })
            .catch(error => {
                console.error('Error:', error);
            });

    } else {
        alert("Ingrese un nombre de album para poder agregarlo!");
    }
    console.log("")
}

function modificarAlbum() {
    const nomA = nombre_album.value;
    const albumId =""
    //Modificar album
    fetch('http://localhost:3000/album/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idAlbum: albumId,
            albumName: nomA
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al editar el álbum');
        }
    })
    .then(data => {
        console.log('Álbum editado exitosamente:', data.message);
        // Puedes realizar otras acciones después de editar el álbum si es necesario
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function cancelar() {
    document.getElementById("nom_album").value = "";
}

function eliminarAlbum() {
    const albumE = album_eliminar.value;
    console.log(albumesAWS);
    const nuevoArreglo = albumesAWS.filter((elemento) => elemento.toLowerCase() !== albumE);

    if (nuevoArreglo.length < albumesAWS.length) {
        alert(`El elemento ${albumE} fue elminado con exito.`);
        albumesAWS = nuevoArreglo;
        console.log(albumesAWS);
        vaciarAlbumes();
        llenarAlbumes();

        //Eliminar album del bucket de la nube...

    } else {
        alert(`El elemento ${albumE} no existe.`);
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

// Función para llenar las opciones del select
function llenarAlbumes() {
    const select = document.getElementById("album-select");
    if (primera_vez) {
        obtener_albumes();
        primera_vez = false;
    }

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
    albumesAWS.push("Personal");
}