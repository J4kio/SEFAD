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

var contenido = document.querySelector('#contenido')



function tabla(datos) {
    // console.log(datos)
    contenido.innerHTML = `
    <table id = "tabla" class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Id Estudiante</th>
            <th scope="col">Nombre Estudiante</th>
            <th scope="col">Telefono Estudiante</th>
            <th scope="col">Email Estudiante</th>                
            <th scope="col">Fecha Reporte</th>
            <th scope="col">Fecha Aparicion</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
           
          
        </tr>
    </thead>
    <tbody id="contenido">

    </tbody>
</table>`
    for (let valor of datos) {
        // console.log(valor.nombre)
        contenido.innerHTML += `
  

  
        <tr>
            <th scope="row">${valor.id}</th>
            <td>${valor.nombre}</td>
            <td>${valor.telefono}</td>
            <td>${valor.email}</td>
            <td>${valor.fecha_reporte}</td>
            <td>${valor.fecha_aparicion}</td>
            <td>${valor.estado}</td>
            
            <td> <button id="boton" class="btn btn-success btn-sm w-70" onclick ="ver_datos()">Ver</button>
</td>
           
        </tr>
        
        `
    }
  }
  

function ver_datos(){

    $.ajax({
        url: "/consulta_seguimientos",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {   id_seguimiento:id_seguimiento //id del que esta logeado                
            }
        )
    })
        .done(function (html) {
            //cargar div de datos
            
    
        })
        .fail(function (html) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo Salio Mal.',
    
            })
           
        });

}
function cargar_tabla(id_seguimiento){
    $.ajax({
        url: "/consulta_seguimientos",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {   id_seguimiento:id_seguimiento //id del que esta logeado                
            }
        )
    })
        .done(function (html) {
            tabla(html)
            
    
        })
        .fail(function (html) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo Salio Mal.',
    
            })
           
        });
}