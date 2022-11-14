 // Example starter JavaScript for disabling form submissions if there are invalid fields
 (function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else {
              RegistrarUsuario();
              event.preventDefault()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
})()
  
function RegistrarUsuario() {
  alert("Todo está  bien!")
  let Cedula = document.querySelector("#txtCedula").value;
  let Nombre = document.querySelector("#txtNombre").value;
  let pellido = document.querySelector("#txtNApellido").value;
  let Telefono = document.querySelector("#txtTelefono").value;
  let Correo = document.querySelector("#txtCorreo").value;
  let Contrasena = document.querySelector("#txtContrasena").value;
  let Rol = document.querySelector("#txtRol").value;


  let url = `http://localhost:3000/Usuario`;
  let datos = {
    Cedula: Cedula,
    Nombre: Nombre,
    Apellido: Apellido,
    Telefono: Telefono,
    Correo: Correo,
    Contrasena: Contrasena,
    Rol: Rol,
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': ' aplication/json'
    }
  }).then(response => response.json())
    .then(mensaje => {
      console.log(mensaje)
    })



  }



  