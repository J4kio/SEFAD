/* var d = new Date();
var fechaactual = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
console.log("Fecha: " + fecha, "Hora: " + hora);
 */

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
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Id Estudiante</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Reporte</th>            
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody id="contenido">

    </tbody>
</table>
    `
    for (let valor of datos) {
        // console.log(valor.nombre)
        contenido.innerHTML += `
  


        <tr>
            <th scope="row">${valor.id}</th>
            <td>${valor.nombre}</td>
            <td>${valor.telefono}</td>
            <td>${valor.email}</td>
            <td>${valor.estado}</td>
            <td>${valor.fecha_reporte}</td>
                  
            
            <td> <button id="boton" class="btn btn-primary w-10" onclick ="aparecio('${valor.id}')">Aparecio</button></td>
           
        </tr>
        
        `
    }
}
function tabla1(datos) {
    // console.log(datos)
    contenido.innerHTML = `
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Id Estudiante</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Reporte</th>
            <th scope="col">Fecha Aparicion</th>   
            <th scope="col">Acciones</th>           
        </tr>
    </thead>
    <tbody id="contenido">

    </tbody>
</table>
    `
    for (let valor of datos) {
        // console.log(valor.nombre)
        contenido.innerHTML += `



        
        <tr>
            <th scope="row">${valor.id}</th>
            <td>${valor.nombre}</td>
            <td>${valor.telefono}</td>
            <td>${valor.email}</td>
            <td>${valor.estado}</td>
            <td>${valor.fecha_reporte}</td>
            <td>${valor.fecha_aparicion}</td>
            <td> <button id="boton" class="btn btn-success w-10" onclick ="remision('${valor.nombre}','${valor.telefono}','${valor.email}','${valor.id}')">Remitir</button></td>
          
        </tr>
        
        `
    }
}
function tabla2(datos) {
    // console.log(datos)
    contenido.innerHTML = `
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Id Estudiante</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Reporte</th>
            <th scope="col">Fecha Aparicion</th>   
            <th scope="col">Acciones</th>             

        </tr>
    </thead>
    <tbody id="contenido">

    </tbody>
</table>
    `
    for (let valor of datos) {
        // console.log(valor.nombre)
        contenido.innerHTML += `


        
        <tr>
            <th scope="row">${valor.id}</th>
            <td>${valor.nombre}</td>
            <td>${valor.telefono}</td>
            <td>${valor.email}</td>
            <td>${valor.estado}</td>
            <td>${valor.fecha_reporte}</td>
            <td>${valor.fecha_aparicion}</td>
            <td> <button id="boton" class="btn btn-success w-10" onclick ="remision('${valor.nombre}','${valor.telefono}','${valor.email}','${valor.id}')">Remitir</button>
        </tr>
        
        `
    }
}

function tabla3(datos) {
    // console.log(datos)
    contenido.innerHTML = `
    <table id = "tabla" class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Id Estudiante</th>
            <th scope="col">Nombre Estudiante</th>
            <th scope="col">Telefono Estudiante</th>
            <th scope="col">Email Estudiante</th>
            <th scope="col">Fecha y Hora de Inicio</th>
            <th scope="col">Fecha y Hora de Finalizacion</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          
        </tr>
    </thead>
    <tbody id="contenido">
  
    </tbody>
  </table>
  `
    for (let valor of datos) {
        // console.log(valor.nombre)
        contenido.innerHTML += `
  
        <tr>
            <th scope="row">${valor.id_estudiante}</th>
            <td>${valor.nombre}</td>
            <td>${valor.telefono}</td>
            <td>${valor.email}</td>
            <td>${valor.fecha_inicio}</td>
            <td>${valor.fecha_finalizacion}</td>
            <td>${valor.estado}</td>    
            <td>   
            <button id="boton" class="btn btn-success w-10" onclick ="remision('${valor.nombre}', '${valor.telefono}', '${valor.email}', '${valor.id_estudiante}')">Remitir</button>
            <button id="boton" class="btn btn-danger w-10" onclick ="consulta_cierre('${valor._id}')">Ver Informe de Cierre</button>
            
            </td>
           
        </tr>
        
        `
    }
  }


function aparecio (id_estudiante){

    var d = new Date();
    var fecha = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  $.ajax({
      url: "/registroAus",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        valor: "id",
        valor2: "fecha_aparicion",
        dato: id_estudiante,
        dato2: fecha + " " + hora,
        estado: "Aparecio"
      })
  })
      .done(function (html) {

        $.ajax({
            url: "/agregar_aparecido",
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


        if (html.genero == "m") {
            $.ajax({
                url: "/agregar_aparecido_hombre",
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

           
        }
        else if (html.genero == "f") {
            $.ajax({
                url: "/agregar_aparecido_mujer",
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
            
        }


        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Estudiante Registrado Como Aparecido',
            showConfirmButton: false,
            timer: 1500
          })
            

      })
      .fail(function (html) {
         // console.log(html)
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo Salio Mal.',

          })
      });


}

$("#boton1").click(function (e) {
    e.preventDefault()
    $.ajax({
        url: "/estado",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {
                estado: "Ausente"
            }
        )
    })
        .done(function (html) {
            if(html.length == 0){

                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'No hay registro de estudiantes ausentes'
                    
                  })

            }
            else{
            tabla(html)
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


});

$("#boton2").click(function (e) {
    e.preventDefault()

    $.ajax({
        url: "/estado",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {
                estado: "Aparecio"
            }
        )
    })
        .done(function (html) {
            if(html.length == 0){

                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'No hay registro de estudiantes aparecidos'
                    
                  })

            }
            else{
            tabla1(html)
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


});

$("#boton3").click(function (e) {
    e.preventDefault()
    $.ajax({
        url: "/estado",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {
                estado: "En Seguimiento"
            }
        )
    })
        .done(function (html) {
            if(html.length == 0){

                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'No hay registro de estudiantes en seguimiento'
                    
                  })

            }
            else{
            tabla2(html)
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


});

$("#boton4").click(function (e) {
    e.preventDefault()
    $.ajax({
      url: "/consulta_todos_seguimientos_f",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(
          {   
              estado: "Finalizado"
          }
      )
  })
      .done(function (html) {
          tabla3(html)
          
  
      })
      .fail(function () {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo Salio Mal.',
  
          })
         
      });
  
  
  });

function consulta_cierre(id_seguimiento) {
    window.open(`/consultaCierre?id_seguimiento=${id_seguimiento}`, "_blank")

}

async function remision(nombre, telefono, email, id_estudiante) {

    $.ajax({
        url: "/consulta_remision",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
       
    })
        .done(function (datos) {
          
            const a = {}
            datos.forEach(function(dato){
                if(!a [dato.usuario] ){
                    a [dato.usuario] = []

                }
                a[dato.usuario] [dato.codigo] = dato.nombre

            })
            console.log(a)
             Swal.fire({
                title: 'Remision',
                html: `<p>Codigo Alumno: ${id_estudiante} <br> Alumno: ${nombre} <br> Email: ${email} <br> Telefono: ${telefono} </p>`,
                input: 'select',
                inputOptions: a,
                inputPlaceholder: 'Seleccione el area a remitir',
                showCancelButton: true,
            }).then(function (dato){
                
             
                $.ajax({
                    url: "/nuevo_seguimiento",
                    method: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        nombre: nombre,
                        email: email,
                        telefono: telefono,
                        id_estudiante: id_estudiante,
                        id_especialista: dato.value,                        
                        estado: "Remitido",                        

                    })
                })
                    .done(function () {



                        $.ajax({
                            url: "/estado_estudiante_en_seguimiento",
                            method: 'POST',
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({
                                id_estudiante: id_estudiante,
                                estado: "En Seguimiento"
                            })
                        })
                            .done(function () {
                    
                            })
                            .fail(function () {
                           
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Algo Salio Mal.',
                    
                                })
                            });
                    
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Remision Exitosa',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          
                          setTimeout('document.location.reload()',50000);
            
                    })
                    .fail(function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo Salio Mal.',
            
                        })
                        
                    });
               
            


                
            })
        
        
        

        })
        .fail(function (html) {

        });




}