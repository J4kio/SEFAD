const codigo = document.getElementById("codigo").innerHTML;
console.log(codigo)
const video = document.getElementById('video')

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('js/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/js/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/js/models')
]).then(start)

function start() {


    navigator.getUserMedia({ video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
    recognizeFaces()
}

async function recognizeFaces() {

    await loadLabeledImages()
}

function loadLabeledImages() {
    $.ajax({
        url: "/ausentes",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify()
    })
        .done(function (ausentes) {
            if (ausentes.length > 0) {
                Promise.all(
                    ausentes.map(async (ausente) => {
                        const descriptions = []

                        const img = await faceapi.fetchImage(ausente.foto)
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

                        descriptions.push(detections.descriptor)

                        return new faceapi.LabeledFaceDescriptors(ausente.nombre, descriptions)
                    })
                ).then((data) => {
                    procesoPrincipal(data);
                });
            }
            else {
                Swal.fire({
                    icon: 'warning',
                    title: '! NO HAY AUSENTES REGISTRADOS !'
                })
            }
        })
        .fail(function (html) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo Salio Mal.',

            })
          //  console.log(html)
        });
}

function procesoPrincipal(data) {
    const faceMatcher = new faceapi.FaceMatcher(data, 0.4)//0.4
    video.load();
    video.addEventListener("play", () => {
        console.log('Playing ...')
        const micanvas = document.getElementById('micanvas');
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(micanvas, displaySize)

        const interval = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            micanvas.getContext('2d').clearRect(0, 0, micanvas.width, micanvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            // console.log(results[0])// resultados

            results.forEach((result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                // console.log(result._label)
                // console.log(result._distance)

                if (result._label != "unknown") {
                    var distancia = result._distance.toString();
                    clearInterval(interval);
                    var distancia2 = parseFloat(distancia.substr(0, 3))
                    var coincidencia = (1 - distancia2)*100

                    Swal.fire({
                        title: '! APARICION DE ESTUDIANTE !',
                        html: `<p>Nombre: ${result._label} <br> Coincidencia: ${coincidencia} % </p>`,
                        confirmButtonText: 'Ok',

                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          //Swal.fire('La pagina se recargara', '', 'success')
                          location.reload();
                        }
                      })

                      var d = new Date();
                      var fecha = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
                      var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    $.ajax({
                        url: "/registroAus",
                        method: 'POST',
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            valor: "nombre",
                            valor2: "fecha_aparicion",
                            dato: result._label,
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

                drawBox.draw(micanvas)

            })
        }, 100)



    });
}


$("#boton-estado-estudiantes").click(function (e) {
    window.open("/estado", "_blank")
});
$("#boton-registrar-usuario").click(function (e) {
    window.open("/registroUsu", "_blank")
});
$("#boton-estadisticas").click(function (e) {
    window.open("/estadisticas", "_blank")
});

$("#boton-reportar").click(function (e) {
    window.open("/registroAus", "_blank")
  });


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