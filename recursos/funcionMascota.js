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
  
function RegistrarMascota() {
  alert("Todo está  bien!")
  let NombreMas = document.querySelector("#txtNombreMas").value;
  let FotoMas = document.querySelector("#txtImagen").value;
  let EstadoMas = document.querySelector("#txtEstado").value;
  let EspecieMas = document.querySelector("#txtEspecie").value;
  let ComentarioMas = document.querySelector("#txtComentario").value;



  let url = `http://localhost:3000/Mascotas`;
  let datos = {
    Nombre: NombreMas,
    Foto: FotoMas,
    Estado: EstadoMas,
    Especie: EspecieMas,
    ComentarioMas: Correo,
    Contrasena: Contrasena,
   
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