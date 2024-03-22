
// Obtener los elementos del formulario
const usernameInput = document.getElementById("username");
const fullnameInput = document.getElementById("fullname");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

//Obtener elemento del input de la imagen seleccionada
const imagen_selec = document.getElementById('avatar-input');

//Contenido y nombre de la imagen
let imageContent
let imageName


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


document.getElementById("formulario_registro").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener los valores ingresados por el usuario
    const username = usernameInput.value;
    const fullname = fullnameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    // Mostrar los valores en la consola
    console.log("Username:", username);
    console.log("Nombre Completo:", fullname);
    console.log("Contraseña:", password);
    console.log("Verificar Contraseña:", confirmPassword);

    if (user_repetidio(username)) {
        alert('Usuario ingresado ya existe, intenta con otro nombre de usuario');
    } else {
        // Verificar si las contraseñas coinciden
        if (password === confirmPassword) {
            alert('Las contraseñas coinciden. ¡Registro exitoso!');
            console.log("Las contraseñas coinciden. ¡Registro exitoso!");
            // Crear un objeto FormData para enviar los datos del formulario
            const formData = new FormData();
            formData.append('userName', username);
            formData.append('name', fullname);
            formData.append('imageContent', imageContent);
            formData.append('imageName', imageName);
            formData.append('password', password);
            try {
                // Realizar la solicitud POST a la API
                console.log("------------Datos para POST API-----------")
                console.log(formData)
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log('Usuario registrado exitosamente');
                    // Puedes realizar otras acciones aquí, como redirigir a otra página
                } else {
                    console.error('Error al registrar usuario');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }

        } else {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            console.error("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
            // Aquí puedes mostrar un mensaje al usuario o realizar otras acciones
        }
    }


});

//Funcion para post api
function postRegistro(userName, name, password, imageContent, imageName) {



}

//Funcion con AWS
function user_repetidio(user) {
    //Consultar base de datos para buscar user ingresado
    const user_con = "user123"

    //Verificar si existe el usuario
    if (user == user_con) {
        return true
    } else {
        return false
    }
}

