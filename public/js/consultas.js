

const codigo_especialista = document.getElementById("codigo_especialista").value;
const nombre_especialista = document.getElementById("nombre_especialista").value;
const nombre_estudiante = document.getElementById("nombre_estudiante").innerHTML;

const id_estudiante = document.getElementById("id_estudiante").value;
const urlParams = new URLSearchParams(window.location.search);
const id_seguimiento = urlParams.get('id_seguimiento');
const id_cita = urlParams.get('id_cita');


function fecha_hora_actual(){
  var d = new Date();
  var fecha = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
  var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return fecha+" "+hora
}



$("#boton-consulta").click(function (e) {
    e.preventDefault()
    const valor =$("input:radio[name='flexRadioDefault']:checked").val();
   // console.log(valor);
    const texto = $("#caja-texto").val();
    //texto = texto.replace("", "W3Schools")
    //console.log(texto)

    var fecha_hora = fecha_hora_actual()
    $.ajax({
      url: "/guardar_consulta",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        id_seguimiento: id_seguimiento,
        nombre_estudiante: nombre_estudiante,        
        id_estudiante: id_estudiante,
        fecha_hora: fecha_hora,
        nombre_especialista: nombre_especialista,        
        id_especialista: codigo_especialista,
        notas: texto, 
        calificacion : valor 
      })
    })
      .done(function () {
    
        $.ajax({
          url: "/actualizar_estado_cita",
          method: 'POST',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({
          id_cita: id_cita,
          estado: "Inactiva"
          })
        })
          .done(function () {
        
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Consulta registrada con exito',
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
    
    
    







  });