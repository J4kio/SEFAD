var numero_desaparecidos
var numero_aparecidos
var seguimientos_activos
var seguimientos_finalizados
var hombres_aparecidos
var hombres_desaparecidos
var mujeres_aparecidas
var mujeres_desaparecidas

$.ajax({
    url: "/consulta_estadisticas",
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify()
})
    .done(function (html) {
        estadisticas(html)

    })
    .fail(function (html) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo Salio Mal.',

        })
        console.log(html)
    });
function estadisticas(datos) {


    numero_desaparecidos = datos[0].numero_desaparecidos;
    numero_aparecidos = datos[0].numero_aparecidos;
    seguimientos_activos = datos[0].seguimientos_activos;
    seguimientos_finalizados = datos[0].seguimientos_finalizados;
    hombres_aparecidos = datos[0].hombres_aparecidos;
    hombres_desaparecidos = datos[0].hombres_desaparecidos;
    mujeres_aparecidas = datos[0].mujeres_aparecidas;
    mujeres_desaparecidas = datos[0].mujeres_desaparecidas;




}
function grafica1() {
    var ctx = document.getElementById("myChart").getContext("2d");
    titulo = document.getElementById("titulo");
    titulo.innerHTML = "Estudiantes Ausentes vs Estudiantes Aparecidos"
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ['Estudiantes Aparecidos', 'Estudiantes Ausentes'],
            datasets: [{
                data: [numero_aparecidos, numero_desaparecidos],
                backgroundColor: [
                    'rgb(53,142,243)',
                    'rgb(243, 73, 53)'
                ]
            }]
        }

    });


}

function grafica2() {

    var ctx = document.getElementById("myChart").getContext("2d");
    titulo = document.getElementById("titulo");
    titulo.innerHTML = "Hombres Ausentes vs Hombres Aparecidos"
    new Chart(ctx, {
        type: "bar",
        data: {



            labels: [" "],
            datasets: [{
                label: 'Hombres Ausentes',
                data: [hombres_desaparecidos],
                backgroundColor: ['rgb(26,78,116)']
            },

            {
                label: 'Hombres Aparecidos',
                data: [hombres_aparecidos],
                backgroundColor: ['rgb(38,152,237)']
            }

            ]

        }
    });


}
function grafica3() {

    var ctx = document.getElementById("myChart").getContext("2d");
    titulo = document.getElementById("titulo");
    titulo.innerHTML = "Mujeres Ausentes vs Mujeres Aparecidas"
    new Chart(ctx, {
        type: "bar",
        data: {



            labels: [" "],
            datasets: [{
                label: 'Mujeres Ausentes',
                data: [mujeres_desaparecidas],
                backgroundColor: ['rgb(146,28,108)']
            },

            {
                label: 'Mujeres Aparecidas',
                data: [mujeres_aparecidas],
                backgroundColor: ['rgb(243,60,171)']
            }

            ]

        }
    });


}
function grafica4() {
    var ctx = document.getElementById("myChart").getContext("2d");
    titulo = document.getElementById("titulo"); //buscar elemento reloj

    titulo.innerHTML = "Seguimientos Activos vs Seguimientos Finalizados"
    new Chart(ctx, {
        type: "pie",

        data: {
            labels: ['Seguimientos Activos', 'Seguimientos Finalizados'],
            datasets: [{
                data: [seguimientos_activos, seguimientos_finalizados],
                backgroundColor: [
                    'rgb(206,243,53)',
                    'rgb(53, 194, 243)'
                ]
            }]
        }

    });


}
function grafica5() {

    var ctx = document.getElementById("myChart").getContext("2d");
    titulo = document.getElementById("titulo");
    titulo.innerHTML = "Estudiantes Ausentes vs Aparecidos por genero"
    new Chart(ctx, {
        type: "bar",
        data: {



            labels: [" "],
            datasets: [
                {
                    label: 'H. Ausentes',
                    data: [hombres_desaparecidos],
                    backgroundColor: ['rgb(26,78,116)']
                },

                {
                    label: 'M. Ausentes',
                    data: [mujeres_desaparecidas],
                    backgroundColor: ['rgb(146,28,108)']
                },

                {
                    label: 'H. Aparecidos',
                    data: [hombres_aparecidos],
                    backgroundColor: ['rgb(38,152,237)']
                },



                {
                    label: 'M. Aparecidas',
                    data: [mujeres_aparecidas],
                    backgroundColor: ['rgb(243,60,171)']
                }


            ]

        }
    });


}
function limpiar() {
    $('#myChart').remove();
    $('#grafica').append('<canvas id="myChart" ></canvas>');
}

$("#boton1").click(function (e) {
    e.preventDefault()

    limpiar();
    grafica1();



});

$("#boton2").click(function (e) {
    e.preventDefault()

    limpiar();
    grafica2();




});

$("#boton3").click(function (e) {
    e.preventDefault()

    limpiar();
    grafica3();


});

$("#boton4").click(function (e) {
    e.preventDefault()

    limpiar();
    grafica4();

});
$("#boton5").click(function (e) {
    e.preventDefault()

    limpiar();
    grafica5();

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
    mireloj.innerHTML = "Hora Actual: " + mihora + "<br>Fecha Actual: " + fecha.getDate() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getFullYear(); //incluir hora en elemento
}
setInterval(actualizar, 1000); //iniciar temporizador
