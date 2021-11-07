const codigo = document.getElementById("codigo").innerHTML;
const correo = document.getElementById("correo").innerHTML;
const nombre = document.getElementById("nombre").innerHTML;
 
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




function fecha_hora_actual(){
    var d = new Date();
    var fecha = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return fecha+" "+hora
}


var contenido = document.querySelector('#contenido')
function tabla1(datos) {
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
            
            <td> <button id="boton" class="btn btn-success btn-sm w-70" onclick ="iniciar_seguimiento('${valor.nombre}', '${valor.telefono}', '${valor.email}', '${valor.id}')">Iniciar Seguimiento</button>
</td>
           
        </tr>
        
        `
    }
  }
  




function tabla2(datos) {
    // console.log(datos)
    contenido.innerHTML = `
    <table id = "tabla" class="table table-hover">
    <thead>
        <tr>
        <th scope="col">Id Estudiante</th>
        <th scope="col">Nombre Estudiante</th>
        <th scope="col">Telefono Estudiante</th>
        <th scope="col">Email Estudiante</th>                
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
        <td>${valor.estado}</td>
            
            <td> <button id="boton" class="btn btn-success w-70" onclick ="iniciar_seguimiento_asignado('${valor._id}',)">Iniciar Seguimiento</button></td>
           
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
      //id del seguimiento
      contenido.innerHTML += `



      <tr>
          <th scope="row">${valor.id_estudiante}</th>
          <td>${valor.nombre}</td>
          <td>${valor.telefono}</td>
          <td>${valor.email}</td>
          <td>${valor.fecha_inicio}</td>
          <td>${valor.estado}</td>
          
          <td> <button id="boton" class="btn btn-success btn-sm w-70" onclick ="verConsultas('${valor._id}')">Ver Consultas</button>
          <button id="boton" class="btn btn-primary btn-sm w-70" onclick ="asignar_cita('${valor.id_estudiante}','${valor._id}')">Asignar Cita</button>          
          <button id="boton" class="btn btn-success btn-sm w-70" onclick ="remision('${valor.nombre}', '${valor.telefono}', '${valor.email}', '${valor.id_estudiante}')">Remitir</button>
          <button id="boton" class="btn btn-danger btn-sm w-70" onclick ="finalizar_seguimiento('${valor.id_estudiante}','${valor._id}')">Finalizar Seguimiento</button></td>
         
      </tr>
      
      `
  }
}

function tabla4(datos) {
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
          
          <td> <button id="boton" class="btn btn-primary w-10" onclick ="verConsultas('${valor._id}')">Ver Consultas</button>
          <button id="boton" class="btn btn-danger w-10" onclick ="consulta_cierre('${valor._id}')">Ver Informe de Cierre</button>
          <button id="boton" class="btn btn-success w-10" onclick ="remision('${valor.nombre}', '${valor.telefono}', '${valor.email}', '${valor.id_estudiante}')">Remitir</button>
          </td>
         
      </tr>
      
      `
  }
}
function tabla5(datos) {
    // console.log(datos)
    contenido.innerHTML = `
    <table id = "tabla" class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Id Estudiante</th>
            <th scope="col">Nombre Estudiante</th>            
            <th scope="col">Email Estudiante</th>
            <th scope="col">Fecha y Hora</th>
            <th scope="col">Lugar</th>
            <th scope="col">Acciones</th>
          
        </tr>
    </thead>
    <tbody id="contenido">
  
    </tbody>
  </table>
  `
    for (let valor of datos) {
        // console.log(valor.nombre)z
        contenido.innerHTML += `
  
        <tr>
            <th scope="row">${valor.id_estudiante}</th>
            <td>${valor.nombre_estudiante}</td>
            <td>${valor.correo_estudiante}</td>


                    
            <td>${valor.fecha_hora}</td>
            <td>${valor.lugar}</td>
            
            
            <td> <button id="boton" class="btn btn-primary w-10" onclick ="iniciar_consulta('${valor.id_estudiante}','${valor.id_seguimiento}','${valor._id}')">Iniciar Consulta</button>
            <button id="boton" class="btn btn-danger w-10" onclick ="cancelar_cita('${valor._id}')">Cancelar</button></td>
           
        </tr>
        
        `
    }
  }


$("#boton1").click(function (e) {
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
            tabla1(html)
            console.log(html)

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
      url: "/consulta_seguimientos",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(
          {   id_especialista:codigo,
              estado: "Remitido"
          }
      )
  })
      .done(function (html) {
          tabla2(html)
          
  
      })
      .fail(function () {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo Salio Mal.',
  
          })
         
      });
  
  
  });

  $("#boton3").click(function (e) {
    e.preventDefault()
    $.ajax({
      url: "/consulta_seguimientos",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(
          {   id_especialista:codigo, //id del que esta logeado
              estado: "Iniciado"
          }
      )
  })
      .done(function (html) {
          tabla3(html)
          
  
      })
      .fail(function (html) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo Salio Mal.',
  
          })
         
      });
  
  
  });

  $("#boton4").click(function (e) {
    e.preventDefault()
    $.ajax({
      url: "/consulta_seguimientos",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(
          {   id_especialista:codigo,
              estado: "Finalizado"
          }
      )
  })
      .done(function (html) {
          tabla4(html)
          
  
      })
      .fail(function () {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo Salio Mal.',
  
          })
         
      });
  
  
  });
function iniciar_seguimiento_asignado(id_seguimieto){
    var fecha_hora = fecha_hora_actual()
    $.ajax({
        url: "/inicio_seguimiento_asignado",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {   id :id_seguimieto,
                fecha_inicio:fecha_hora,
                fecha_finalizacion:"En proceso",   
                estado: "Iniciado"
            }
        )
    })
        .done(function (html) {

            $.ajax({
                url: "/agregar_seguimiento",
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

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Seguimiento Iniciado',
                showConfirmButton: false,
                timer: 1500
              })
            
    
        })
        .fail(function (html) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo Salio Mal.',
    
            })
           
        });
    

}
function iniciar_seguimiento(nombre,telefono,email,id_estudiante){

    var fecha_hora = fecha_hora_actual()
    $.ajax({
        url: "/nuevo_seguimiento",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            nombre: nombre,
            email: email,
            telefono: telefono,
            fecha_inicio:fecha_hora,
            fecha_finalizacion:"En proceso", 
            id_estudiante: id_estudiante,
            id_especialista: codigo,                        
            estado: "Iniciado",                        

        })
    })
        .done(function () {

            $.ajax({
                url: "/agregar_seguimiento",
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

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Seguimiento Iniciado',
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
function verSeguimiento(){
    window.open("/seguimiento", "_blank")
}
function asignar_cita(id_estudiante,id_seguimiento){
    window.open(`/asignarCitas?id=${id_estudiante}&id_seguimiento=${id_seguimiento}`, "_blank")

}
function iniciar_consulta(id_estudiante,id_seguimiento,id_cita){

    window.open(`/consultas?id=${id_estudiante}&id_seguimiento=${id_seguimiento}&id_cita=${id_cita}`, "_blank")

}
function verConsultas(id_seguimiento){
    window.open(`/listadoConsultas?id_seguimiento=${id_seguimiento}`, "_blank")
}

function finalizar_seguimiento(id_estudiante,id_seguimiento) {
    window.open(`/cierreSeguimiento?id=${id_estudiante}&id_seguimiento=${id_seguimiento}`, "_blank")

}
function consulta_cierre(id_seguimiento) {
    window.open(`/consultaCierre?id_seguimiento=${id_seguimiento}`, "_blank")

}
function cancelar_cita(id_cita) {


    Swal.fire({
        title: '¿Seguro que quieres cancelar la cita?',
        showDenyButton: true,  
        icon:'question',      
        confirmButtonText: 'Ok',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
         



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
                        title: 'Cita Cancelada con exito',
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




        } else if (result.isDenied) {
          Swal.fire('Operacion cancelada', '', 'info')
        }
      })    
}

  $("#boton-reportar").click(function (e) {
    e.preventDefault()
    
    $.ajax({
      url: "/consulta_citas",
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(
          { id:codigo,
            estado:"Activa"
              
          }
      )
  })
      .done(function (html) {    
          console.log(html)      
          tabla5(html)
          
  
      })
      .fail(function () {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo Salio Mal.',
  
          })
         
      });
   
  });

  async function cambio_clave(){
   
   const { value: password } = await Swal.fire({
        title: 'Cambio de contraseña',
        input: 'password',
       
        inputPlaceholder: 'Digita la Nueva Contraseña',
        inputAttributes: {
          maxlength: 20,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
      if (password) {


        $.ajax({
            url: "/cambio_clave",
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(
                { codigo:codigo,
                  clave:password
                    
                }
            )
        })
            .done(function () {    
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Contraseña actualizada con exito',
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
  }