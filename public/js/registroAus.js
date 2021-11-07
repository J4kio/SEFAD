

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
    mireloj.innerHTML = "Hora Actual: " + mihora + "<br>Fecha Actual: " + fecha.getDate() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getFullYear(); //incluir hora en elemento
}
setInterval(actualizar, 1000); //iniciar temporizador



$("#boton1").click(function () {

    const valor = $('select[name=tipo] option').filter(':selected').val();
    const dato = $("#dato").val();
    var d = new Date();
    var fecha = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();



    $.ajax({
        url: "/registroAus",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({

            valor,
            valor2: "fecha_reporte",
            dato,
            dato2: fecha + " " + hora,
            estado: "Ausente"

        })
    })
        .done(function (html) {

            if (html == null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El Usuario no Existe.',

                })
            }
            else {

                var contador = 0
                if (contador == 0) {
                    Swal.fire('Usuario Registrado Como Ausente.')

                    $.ajax({
                        url: "/agregar_ausente",
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
                            url: "/agregar_ausente_hombre",
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
                            url: "/agregar_ausente_mujer",
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





                    contador++

                }

            }

        })
        .fail(function (html) {
            console.log(html)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo Salio Mal.',

            })
        });


});

