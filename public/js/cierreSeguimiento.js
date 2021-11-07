
const codigo_especialista = document.getElementById("codigo_especialista").value;
const nombre_especialista = document.getElementById("nombre_especialista").value;
const nombre_estudiante = document.getElementById("nombre_estudiante").innerHTML;
const id_estudiante = document.getElementById("id_estudiante").value;
const urlParams = new URLSearchParams(window.location.search);
const id_seguimiento = urlParams.get('id_seguimiento');
const id_cita = urlParams.get('id_cita');
/* console.log(codigo_especialista, " " + id_estudiante + " " + id_seguimiento)
console.log(nombre_estudiante)
console.log(nombre_especialista) */

function fecha_hora_actual(){
  var d = new Date();
  var fecha = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
  var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return fecha+" "+hora
}

$("#boton-cierre").click(function (e) {
  e.preventDefault()
  const valor = $("input:radio[name='flexRadioDefault']:checked").val();
 // console.log(valor);
  const texto = $("#caja-texto").val();
  //texto = texto.replace("", "W3Schools")
  //console.log(texto)
  var fecha_hora = fecha_hora_actual()

  $.ajax({
    url: "/guardar_cierre_seguimiento",
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      id_seguimiento: id_seguimiento,
      nombre_estudiante: nombre_estudiante,
      id_estudiante: id_estudiante,
      nombre_especialista: nombre_especialista,
      id_especialista: codigo_especialista,
      fecha_hora: fecha_hora,
      notas: texto,
      calificacion: valor
    })
  })
    .done(function () {

      $.ajax({
        url: "/actualizar_estado_seguimiento",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          id_seguimiento: id_seguimiento,
          fecha_finalizacion: fecha_hora,
          estado: "Finalizado"
        })
      })
        .done(function () {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Seguimiento finalizado con exito',
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


        $.ajax({
          url: "/agregar_seguimiento_finalizado",
          method: 'POST',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify()
      })
          .done(function () {


          })
          .fail(function (html) {
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










});