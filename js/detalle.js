//Obtener datos de usuario logeado
const userId = localStorage.getItem('userId');
const profileImage = localStorage.getItem('profileImage');
const full_name = localStorage.getItem('full_name');
const us_username = localStorage.getItem('us_username');

const idiomas = document.getElementById("languageSelect");


function cargarDatos(ruta) {
    let descripcion_image = "Esta es una descripcion de prueba para mostrar en el view de detalles de una foto para poder ver como se ve en tiempo real y si muestra la informacion de forma correcta";

    //Mostrar descripcion de la foto
    document.getElementById('descriptionText').value = "";
    document.getElementById('descriptionText').textContent = descripcion_image;

    // Obtén el elemento <img> por su id
    const imgElemento = document.getElementById('avatar');

    // Asigna la ruta de la imagen al atributo src
    imgElemento.src = ruta;
}

function traducir() {
    let idioma_selec = idiomas.value;

    let ingles = "This is a test description to display in the photo details view to see how it looks in real time and if it displays the information correctly.";
    let frances = "Ceci est une description de test à afficher dans la vue détaillée de la photo pour voir comment elle apparaît en temps réel et si elle affiche correctement les informations.";
    let descripcion_image = "Esta es una descripcion de prueba para mostrar en el view de detalles de una foto para poder ver como se ve en tiempo real y si muestra la informacion de forma correcta";

    console.log(idioma_selec);
    if (idioma_selec == "en") {
        document.getElementById('translationText').value = "";
        document.getElementById('translationText').textContent = ingles;
    } else if (idioma_selec == "fr") {
        document.getElementById('translationText').value = "";
        document.getElementById('translationText').textContent = frances;
    }else{
        document.getElementById('translationText').value = "";
        document.getElementById('translationText').textContent = descripcion_image;
    }
}

window.onload = cargarDatos('/img/FotoUsuario.jpg');