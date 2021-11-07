const nombre_estudiante = document.getElementById("nombre_estudiante").innerHTML;
const id_estudiante = document.getElementById("id_estudiante").innerHTML;
const email_estudiante = document.getElementById("email_estudiante").innerHTML;
const nombre_especialista = document.getElementById("nombre_especialista").innerHTML;
const codigo_especialista = document.getElementById("codigo_especialista").innerHTML;
const correo_especialista = document.getElementById("correo_especialista").innerHTML;
const urlParams = new URLSearchParams(window.location.search);
const id_seguimiento = urlParams.get('id_seguimiento');





$("#boton-agendar").click(function (e) {
  e.preventDefault()


  const fecha = $("#fecha").val();
  const hora = $("#hora").val();
  const lugar = $("#select").val();


  if (fecha == "" || hora == "" || lugar == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Diligencie todos los campos',

    })
  }
  else {

    $.ajax({
      url: "/asignar_cita",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        id_seguimiento: id_seguimiento,
        nombre_estudiante: nombre_estudiante,
        correo_estudiante: email_estudiante,
        id_estudiante: id_estudiante,
        nombre_especialista: nombre_especialista,
        correo_especialista: correo_especialista,
        id_especialista: codigo_especialista,
        fecha_hora: fecha + "   " + hora,
        estado: "Activa",
        lugar: lugar,
      })
    })
      .done(function () {

        enviar_correo_usuario(fecha + " " + hora, lugar);
        enviar_correo_estudiante(fecha + " " + hora, lugar);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cita Agenda',
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








  }


});
function enviar_correo_usuario(fecha_hora,lugar) {
  $.ajax({
    url: "/consulta_usuario",
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(
        {   correo: correo_especialista
        }
    )
})
    .done(function (res) {
      $.ajax({
        url: "/enviar_correo",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            { correo: correo_especialista,
              asunto: "Citacion Asignada",
              texto: "Datos de la Cita:\n"+"Nombre Estudiante: "+ nombre_estudiante+"\n"+  "Correo Estudiante: "+ email_estudiante+"\n"+ "Id Estudiante"+id_estudiante+"\n"+"Nombre Especialista: "+nombre_especialista+"\n"+"Correo Especialista: "+correo_especialista+"\n" +"Id Especialista: "+codigo_especialista+"\n" +"Fecha y Hora: "+fecha_hora+"\n"+"Lugar: "+lugar
              
            }
        )
    })
        .done(function () {
         
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Citacion enviada al correo especialista',
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

function enviar_correo_estudiante(fecha_hora,lugar) {
  $.ajax({
    url: "/consulta_usuario",
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(
        {   email: email_estudiante
        }
    )
})
    .done(function (res) {
      $.ajax({
        url: "/enviar_correo",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            { correo: email_estudiante,
              asunto: "Citacion Asignada",
              texto: "Datos de la Cita:\n"+"Nombre Estudiante: "+ nombre_estudiante+"\n"+  "Correo Estudiante: "+ email_estudiante+"\n"+ "Id Estudiante"+id_estudiante+"\n"+"Nombre Especialista: "+nombre_especialista+"\n"+"Correo Especialista: "+correo_especialista+"\n" +"Id Especialista: "+codigo_especialista+"\n" +"Fecha y Hora: "+fecha_hora+"\n"+"Lugar: "+lugar
              
            }
        )
    })
        .done(function () {
         
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Citacion enviada al correo estudiante',
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