function actual() {
  fecha = new Date(); //Actualizar fecha.
  hora = fecha.getHours(); //hora actual
  minuto = fecha.getMinutes(); //minuto actual
  segundo = fecha.getSeconds(); //segundo actual
  if (hora < 10) { //dos cifras para la hora
      hora = "0" + hora;
  }
  if (minuto < 10) { //dos cifras para el minuto
      minuto = "0" + minuto;
  }
  if (segundo < 10) { //dos cifras para el segundo
      segundo = "0" + segundo;
  }
  //ver en el recuadro del reloj:
  mireloj = hora + " : " + minuto + " : " + segundo;
  return mireloj;
}
function actualizar() { //función del temporizador
  mihora = actual(); //recoger hora actual
  mireloj = document.getElementById("fecha_hora"); //buscar elemento reloj
  mireloj.innerHTML = "Hora Actual: "+mihora + "<br>Fecha Actual: " + fecha.getDate() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getFullYear(); //incluir hora en elemento
}
setInterval(actualizar, 1000); //iniciar temporizador
const urlParams = new URLSearchParams(window.location.search);
const id_seguimiento = urlParams.get('id_seguimiento');
if(id_seguimiento){
  listadoConsultas (id_seguimiento);
}
else {
  window.open("/")
}

var contenido = document.querySelector('#contenido')
function tabla(datos) {
    // console.log(datos)
    contenido.innerHTML = `
    <table id = "tabla" class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Id Estudiante</th>
            <th scope="col">Nombre Estudiante</th>
            <th scope="col">Id Especialista</th>
            <th scope="col">Nombre Especialista</th>
            <th scope="col">Fecha y Hora de la Consulta</th>
            <th scope="col">Notas de la Consulta</th>
            <th scope="col">Calificacion de la Consulta </th>


           
          
        </tr>
    </thead>
    <tbody id="contenido">

    </tbody>
</table>`
    for (let valor of datos) {
        // console.log(valor.nombre)
        contenido.innerHTML += `
  

  
        <tr>
            <th scope="row">${valor.id_estudiante}</th>
            <td>${valor.nombre_estudiante}</td>
            <td>${valor.id_especialista}</td>
            <td>${valor.nombre_especialista}</td>
            <td>${valor.fecha_hora}</td>
            <td><textarea class="form-control" placeholder ="${valor.notas}"rows="12" aria-label="With textarea" readonly></textarea></td>           
            <td>${valor.calificacion}</td>                     
        </tr>
        
        `
    }
  }
  
function listadoConsultas(id_seguimiento){

    $.ajax({
        url: "/listadoConsultas",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {
              id_seguimiento: id_seguimiento
            }
        )
    })
        .done(function (html) {
            tabla(html)
            //console.log(html)

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

