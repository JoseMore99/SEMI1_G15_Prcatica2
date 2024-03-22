// login.js

// Obtener el formulario
const loginForm = document.getElementById('login-form');


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener los valores de los campos de texto
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mostrar los valores en la consola
    console.log('Usuario:', username);
    console.log('Contraseña:', password);

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {

            console.log('Login Exitoso:', data.data);
            // Redirige a pagina de inicio
            window.location.replace('pagina_inicio.html');
        } else {
            // Error de login
            console.error('Error en el login:', data.message);
            alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
});


//Logica para consutla de DB en AWS y verificacion de usuario existente
function verificarUsuario(user, passw) {
    if (user == 'usuario123' && passw == '1234') {
        return true
    }
    return false
}
