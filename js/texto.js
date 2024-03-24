
//Componentes html
const selec_img = document.getElementById('imageInput');

//Variables globales
let imageContent;
let imageName;

//Funcion para seleccionar una imagen
selec_img.addEventListener('change', handleImageSelection);
function handleImageSelection() {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado

    if (file) {
        // Crea un objeto URL para la imagen seleccionada
        const imageUrl = URL.createObjectURL(file);

        // Actualiza la imagen en la sección de avatar
        const avatarImage = document.getElementById('avatar');
        avatarImage.src = imageUrl;

        // Obtener el contenido de la imagen
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            imageContent = reader.result;
            console.log('Contenido de la imagen:', imageContent);

            // Obtener el nombre de la imagen
            imageName = file.name;
            console.log('Nombre de la imagen:', imageName);
        };
    }
}

//Funcion para reconocimiento de texto y mostrarlo
function showText() {
    document.getElementById('textContent').value = "";
    const textoR = "Este es un texto de prueba para comprobar que el reconocimiento de texto en el analisis de imagen de texto es funcional"
    document.getElementById('textContent').value = textoR;
    alert(textoR);
}
