
//Obtener elementos del formulario
const nuevo_usuario = document.getElementById("username");
const nuevo_nombre = document.getElementById("fullname");
const confirm_pass = document.getElementById("password");

//Contenido de la imagen
let imageContent
let imageName

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

//Funcion para editar el usuario
editForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener los valores de los campos de texto
    const usuario = nuevo_usuario.value;
    const nombre = nuevo_nombre.value;
    const passw = confirm_pass.value;

    //Obtener datos de usuario logeado
    const userId = localStorage.getItem('userId');

    // Mostrar los valores en la consola
    console.log('Nuevo Usuario:', usuario);
    console.log('Nuevo Nombre:', nombre);

    //Verificar si ingreso datos para editar
    if (usuario != '' && nombre != '') {
        try {
            const response = await fetch('http://balanceador-g15-p1-113688819.us-east-2.elb.amazonaws.com/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUser: userId,
                    userName: usuario,
                    name: nombre,
                    password: passw
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Extracción de datos del JSON
                const userId = data.data.idUser;
                const profileImage = data.data.imgPerfil;
                const full_name = data.data.name;
                const us_password = data.data.passw;
                const us_username = data.data.userName;

                localStorage.clear();
                localStorage.setItem('userId', userId);
                localStorage.setItem('profileImage', profileImage);
                localStorage.setItem('full_name', full_name);
                localStorage.setItem('us_username', us_username);

                alert('Nombre de usuario y nombre completo actualizados!');
                
            } else {
                // Error de login
                console.error('Error en el login:', data.message);
                alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }

        try {
            const response = await fetch('http://balanceador-g15-p1-113688819.us-east-2.elb.amazonaws.com/updatePerfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUser: userId,
                    imageContent: imageContent,
                    imageName: imageName,
                    password: passw
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Extracción de datos del JSON
                const userId = data.data.idUser;
                const profileImage = data.data.imgPerfil;
                const full_name = data.data.name;
                const us_password = data.data.passw;
                const us_username = data.data.userName;

                localStorage.clear();
                localStorage.setItem('profileImage', profileImage);
                localStorage.setItem('full_name', full_name);
                localStorage.setItem('us_username', us_username);

                alert('Imagen de Perfil actualizada!');
                
            } else {
                // Error de login
                console.error('Error en el login:', data.message);
                alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    } else {
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

