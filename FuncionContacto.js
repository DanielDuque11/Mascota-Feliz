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


function EnviarContacto() {
    let nombrecont = document.querySelector("#txtnombrecont").value;
    let apellidocont = document.querySelector("#txtapellidocont").value;
    let telefonocont = document.querySelector("#txttelcont").value;
    let correocont = document.querySelector("#txtcorreocont").value;
    let mensajecont =document.querySelector("#txtmensajecont").value;
    
  console.log("Se esta registrando prospecto")
    let url = `http://localhost:3000/prospectos`;
    let datos = {
        Nombre: nombrecont,
        Apellido: apellidocont ,
        Correo: correocont,
        Celular:telefonocont ,
        Comentario: mensajecont


    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            'content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(mensaje => {
            console.log(mensaje)
        })

}
