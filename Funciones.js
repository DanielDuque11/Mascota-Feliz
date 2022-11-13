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
          RegistrarPersona()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function RegistrarPersona() {
  let Cedula = document.querySelector("#txtCedula").value;
  let Nombre = document.querySelector("#txtNombre").value;
  let Apellido = document.querySelector("#txtApellido").value;
  let Correo = document.querySelector("#txtCorreo").value;
  let Celular = document.querySelector("#txtCelular").value;
  //let Contrasena=document.querySelector("#txtContrasena").value;
  let Rol = document.querySelector("#txtRol").value;
console.log("Se esta registrando persona")
  let url = `http://localhost:3000/usuarios`;
  let datos = {
    Cedula: Cedula,
    Nombre: Nombre,
    Apellido: Apellido,
    Correo: Correo,
    Telefono: Celular,
    //Contrasena:Contrasena,
    Rol: Rol


  };

  fetch(url,{
    method: "POST",
    body: JSON.stringify(datos),
    headers:{
      'content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(mensaje => {
      console.log(mensaje)
  })

}
