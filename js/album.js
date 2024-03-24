
//Obtener valores del formulario
const nombre_album = document.getElementById("nom_album");
const album_eliminar = document.getElementById("album-select");


//Obtener datos de usuario logeado
const userId = localStorage.getItem('userId');
const profileImage = localStorage.getItem('profileImage');


//Arreglo de albumes de la nube
let albumesAWS = [];

let primera_vez = true;


// Llama a la función al cargar la página

window.onload = cargarImagen(profileImage);
window.onload = cargar_datos();

//------------------ Funciones para los botones de albumes --------------------
//Funcion para agregar un album 
function agregarAlbum() {
    const nomA = nombre_album.value;
    //Verificar si hay un nombre de album que agregar
    if (nomA != '') {

        fetch('http://balanceador-g15-p1-113688819.us-east-2.elb.amazonaws.com/album/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUser: userId,
                albumName: nomA
            })
        })
            .then(response => {
                if (response.ok) {
                    alert("Album " + nomA + "creado con exito!");
                    return response.json();
                } else {
                    throw new Error('Error al crear el álbum');
                }
            })
            .then(data => {
                console.log('Álbum creado exitosamente:', data.message);
                cargar_datos();
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
    const idA = album_eliminar.value;
    //Verificar si hay un nombre de album que agregar
    if (nomA != '') {
        fetch('http://balanceador-g15-p1-113688819.us-east-2.elb.amazonaws.com/album/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idAlbum: idA,
                albumName: nomA
            })
        })
            .then(response => {
                if (response.ok) {
                    alert("Album " + nomA + "modificado con exito!");
                    cargar_datos();
                    return response.json();
                } else {
                    throw new Error('Error al modificar el álbum');
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
}

function cancelar() {
    document.getElementById("nom_album").value = "";
}

function eliminarAlbum() {
    const nomA = nombre_album.value;
    const idA = album_eliminar.value;
    //Verificar si hay un nombre de album que agregar
    if (idA != null) {


        fetch('http://balanceador-g15-p1-113688819.us-east-2.elb.amazonaws.com/album/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idAlbum: idA
            })
        })
            .then(response => {
                if (response.ok) {
                    alert("Album " + nomA + "eliminado con exito!");
                    cargar_datos();
                    return response.json();
                } else {
                    throw new Error('Error al eliminar el álbum');
                }
            })
            .then(data => {
                console.log('Álbum eliminado exitosamente:', data.message);
                // Puedes realizar otras acciones después de crear el álbum si es necesario
            })
            .catch(error => {
                console.error('Error:', error);
            });

    } else {
        alert("Ingrese un nombre de album para poder agregarlo!");
    }
}

//Funcion para cagar nombres de albumes GET Albums
function cargar_datos() {
    //Obtener datos de usuario logeado
    const userId = localStorage.getItem('userId');
    console.log("Id de Usuario: " + userId)

    fetch('http://balanceador-g15-p1-113688819.us-east-2.elb.amazonaws.com/album/get', {
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
    //Funcion para llenar las opciones de albumes disponibles
    //vaciarAlbumes()
    //llenarAlbumes()

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
    console.log("----- Llenar lista album ----------");
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
    console.log("----- Vaciar lista album ----------");
    const select = document.getElementById("album-select");
    while (select.options.length > 0) {
        select.remove(0);
    }
}
