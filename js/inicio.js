

//Carga los datos de usuario
function datos_usuario() {
    //Obtener datos de usuario logeado
    const userId = localStorage.getItem('userId');
    const profileImage = localStorage.getItem('profileImage');
    const full_name = localStorage.getItem('full_name');
    const us_username = localStorage.getItem('us_username');
    cargarImagen(profileImage);

    console.log("User ID: " + userId)

    // Actualizar los elementos <p>
    document.getElementById('nombre_usuario').textContent = us_username;
    document.getElementById('nombre_completo').textContent = full_name;

    //Obtener los tangs de rekognition
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
                throw new Error('Error al obtener tags de Rekognition');
            }
        })
        .then(data => {
            const data_array = data.data; // Accede al arreglo "data"
            if (Array.isArray(data_array)) {
                // Obtener los tags de la respuesta JSON
                const tagsObtenidos = "";
                document.getElementById('tags2').textContent = tagsObtenidos;

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

