
$("#btnSubmit").click(function (e) {
  e.preventDefault()
  const correo = $("#correo").val();
  const clave = $("#clave").val();


  if (correo == "" || clave == "") {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Digite el correo electronico y la contraseña para continuar.',

    })
  }
  else {
    $.ajax({
      url: "/login",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        correo,
        clave

      })
    })
      .done(function (html) {

        console.log(html)
        if (html != null) {
          if (html.usuario == "Psicologo" || html.usuario == "Psicopedagogo") {
            window.open("/mainEsp", "_self")
          }
          else {
            window.open("/mainDir", "_self")
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Correo Electronico o Contraseña Incorrectos.',

          })
        }
      })
      .fail(function (html) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo Salio Mal.',

        })
        console.log(html)
      });

  }
});


$("#boton2").click(function (e) {
  window.open("/registroAus", "_self")
});



async function olvide_clave() {

  const { value: email } = await Swal.fire({
    title: 'Recuperacion de  contraseña',
    input: 'email',
    inputLabel: 'Digita tu correo electronico',
    inputPlaceholder: 'Email'
  })

  if (email) {
    enviar_correo(email)


  }
}

function enviar_correo(email) {

  $.ajax({
    url: "/consulta_usuario",
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(
        {   correo: email
        }
    )
})
    .done(function (res) {
      $.ajax({
        url: "/enviar_correo",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {     correo: email,
              asunto: "Recuperacion Clave de Acceso",
              texto: "Tu Clave de Acceso es : " + res.clave,
            }
        )
    })
        .done(function () {
         
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Clave enviada al correo',
            showConfirmButton: false,
            timer: 1500
          })
    
        })
        .fail(function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo Salio Mal.',
    
            })
           
        });
        

    })
    .fail(function () {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo Salio Mal.',

        })
       
    });


}