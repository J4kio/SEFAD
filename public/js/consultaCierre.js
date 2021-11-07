const urlParams = new URLSearchParams(window.location.search);
const id_seguimiento = urlParams.get('id_seguimiento');
if (id_seguimiento) {
    consulta_cierre(id_seguimiento);
}
else {
    window.open("/")
}
function consulta_cierre(id_seguimiento) {

    $.ajax({
        url: "/consultaCierre",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {
                id_seguimiento: id_seguimiento
            }
        )
    })
        .done(function (html) {
            mostrar_datos(html)
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

function mostrar_datos(datos) {
    if (datos.length >= 0) {

        id_estudiante = document.getElementById("id_estudiante");
        id_estudiante.innerHTML = "Id Estudiante: " + datos[0].id_estudiante;

        nombre_estudiante = document.getElementById("nombre_estudiante");
        nombre_estudiante.innerHTML = "Nombre Estudiante: " + datos[0].nombre_estudiante;

        id_especialista = document.getElementById("id_especialista");
        id_especialista.innerHTML = "Id Especialista: " + datos[0].id_especialista;

        nombre_especialista = document.getElementById("nombre_especialista");
        nombre_especialista.innerHTML = "Nombre Especialista: " + datos[0].nombre_especialista;

        informe = document.getElementById("caja-texto");
        informe.innerHTML = datos[0].notas;

        fecha_hora = document.getElementById("fecha");
        fecha.innerHTML = "Fecha y Hora de Cierre: " + datos[0].fecha_hora;

        evaluacion = document.getElementById("evaluacion");
        evaluacion.innerHTML = "Evaluacion del Seguimiento: " + datos[0].calificacion;

    }
}


