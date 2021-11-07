$("#btnSubmit").click(function () {

    const nombre = $("#nombre").val();
    const correo = $("#correo").val();
    const telefono = $("#telefono").val();
    const codigo = $("#codigo").val();
    const direccion = $("#direccion").val();
    const clave = $("#clave").val();
    const usuario = $("#select").val();

   if(nombre  =="" || correo  =="" || telefono ==""|| codigo  =="" || direccion =="" || clave =="" ){
    Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes completar todos los campos.',

    })
   }
   else{
    $.ajax({
        url: "/registroUsu",
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            nombre,
            correo,
            telefono,
            codigo,
            direccion,
            clave,
            usuario
        })
    })
        .done(function () {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro Exitoso',
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