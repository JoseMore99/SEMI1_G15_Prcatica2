
//Obtener elementos del formulario
const nuevo_usuario = document.getElementById("username");
const nuevo_nombre = document.getElementById("fullname");
const confirm_pass = document.getElementById("password");

// Obtener el formulario
const editForm = document.getElementById('form_editar');

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
        const avatarImage = document.getElementById('avatar');
        avatarImage.src = imageUrl;

    }
}

//Funcion para editar el usuario
editForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener los valores de los campos de texto
    const usuario = nuevo_usuario.value;
    const nombre = nuevo_nombre.value;
    const passw = confirm_pass.value;

    // Mostrar los valores en la consola
    console.log('Nuevo Usuario:', usuario);
    console.log('Nuevo Nombre:', nombre);

    //Verificar si ingreso datos para editar
    if (usuario != '' && nombre != '') {
        // Verifica si el usuario y la contraseña
        if (verificarContra(passw)) {
            //Actualizar valores a la BD de la nube...
            alert("Contraseña verificada! \nNuevo Usuario: " + usuario + "\nNuevo Nombre: " + nombre);
        } else {
            alert('Contraseña incorrecta. Inténtalo de nuevo.');
        }
    }else{
        alert("Debe ingresar los nuevos datos para poder editarlos.");
    }


});


//Logica para consutla de DB en AWS y verificacion de usuario existente
function verificarContra(passw) {
    //Consultar usuario actual
    const user = "usuario123";
    //Verifizar contraseña de consutla de BD AWS
    if (user == 'usuario123' && passw == '1234') {
        return true
    }
    return false
}

