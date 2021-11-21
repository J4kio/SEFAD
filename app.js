const express = require('express')
const app = express()
app.set('port', process.env.PORT || 3000)
const session = require('express-session');
const mongoose = require('mongoose');
const user = 'javier';
const password = 'admin';
const uri = `mongodb+srv://${user}:${password}@sefad.ec2ta.mongodb.net/SEFAD?retryWrites=true&w=majority`;
const usuarios = require('./models/usuarios.js')
const estudiantes = require('./models/estudiantes.js')
const seguimientos = require('./models/seguimientos.js')
const citas = require('./models/citas.js')
const consultas = require('./models/consultas.js')
const cierre = require('./models/cierre.js')
const estadisticas = require('./models/estadisticas.js')
var nodemailer = require('nodemailer')

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de Datos Conectada'))
    .catch(e => console.log(e))


app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: false
}));



function middleware (req,res,next){

    const usuario = req.session.datos_usuario;
    if(usuario){
        next();
    }
    else{
        res.redirect("/")
    }
}



app.post('/enviar_correo', (req, res) => {
const body = req.body
var transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"sefad.correos@gmail.com",
        pass:"zniaydymtkjxwmio"
    },
})
var mailOptions = {
    from:'<sefad.correos@gmail.com>',
    to:body.correo,
    subject:body.asunto,
    text:body.texto
}
    transporter.sendMail(mailOptions,(error,info) =>{
        if (error){
            res.status(500).send(error.message)
        }
        else{
            console.log("Email Enviado");
            res.status(200).json(req.body);
        }

    })
})

app.get('/', (req, res) => {
    delete req.session.datos_usuario;
    res.render("login")
    
})

app.get('/mainDir',middleware, (req, res) => {
    const usuario = req.session.datos_usuario;
  //  delete req.session.datos_usuario;
    //console.log(usuario);

    res.render("mainDir", {usuario})
})

app.get('/mainEsp',middleware, (req, res) => {
    const usuario = req.session.datos_usuario;
  //  delete req.session.datos_usuario;
  //  console.log(usuario);

    res.render("mainEsp", {usuario})
})


app.get('/registroAus', (req, res) => {

    res.render("registroAus")
})
app.get('/estadisticas', (req, res) => {

    res.render("estadisticas")
})

app.get('/registroUsu', (req, res) => {

    res.render("registroUsu")
})

app.get('/estado', (req, res) => {

    res.render("estado")
})

app.get('/asignarCitas', middleware,(req, res) => {//middleware
    var id = req.query.id
   // console.log(id)
    if(id){

        estudiantes.findOne(
            {
                id: id
                
            }
    
        )
            .then(function (estudiante) {  
                
                
                const especialista = req.session.datos_usuario;
                
                res.render("asignarCitas",{especialista,estudiante})
            }).catch(function () {
                res.json({ mensaje: 'Error' })
            })
    
    
    }
    else{
        res.redirect("/")
    }
})

app.get('/consultaCierre', (req, res) => {//middleware

    res.render("consultaCierre")
})

app.get('/listadoConsultas', middleware,(req, res) => {//middleware

    res.render("listadoConsultas")
})


app.get('/consultas', middleware,(req, res) => {//middleware
    var id = req.query.id
    //console.log(id)
    if(id){

        estudiantes.findOne(
            {
                id: id
                
            }
    
        )
            .then(function (estudiante) {  
                
                
                const especialista = req.session.datos_usuario;
                
                res.render("consultas",{especialista,estudiante})
            }).catch(function () {
                res.json({ mensaje: 'Error' })
            })
    
    
    }
    else{
        res.redirect("/")
    }
})
app.get('/cierreSeguimiento', middleware,(req, res) => {//middleware
    var id = req.query.id
    //console.log(id)
    if(id){

        estudiantes.findOne(
            {
                id: id
                
            }
    
        )
            .then(function (estudiante) {  
                
                
                const especialista = req.session.datos_usuario;
                
                res.render("cierreSeguimiento",{especialista,estudiante})
            }).catch(function () {
                res.json({ mensaje: 'Error' })
            })
    
    
    }
    else{
        res.redirect("/")
    }
})
app.get('/seguimiento', (req, res) => {

    res.render("seguimiento")
})


app.post('/login', (req, res) => {
    const body = req.body
    usuarios.findOne(
        {
            correo: body.correo,
            clave: body.clave,
            
        }

    )
        .then(function (registro) {
            req.session.datos_usuario = registro;

            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   


})

app.post('/consulta_usuario', (req, res) => {
    const body = req.body
    usuarios.findOne(
        {
            correo: body.correo          
            
        }

    )
        .then(function (registro) {
            //req.session.datos_usuario = registro;

            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   


})
app.post('/consulta_estudiante', (req, res) => {
    const body = req.body
    estudiantes.findOne(
        {
            email: body.email        
            
        }

    )
        .then(function (registro) {
            //req.session.datos_usuario = registro;

            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   


})

app.post('/registroUsu', (req, res) => {
    const body = req.body
    new usuarios(body).save()
        .then(function () {
            res.json(body)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

})

app.post('/registroAus', (req, res) => {
    const body = req.body
    //console.log(body)
    estudiantes.findOneAndUpdate(
        {
            [body.valor]: body.dato


        }
        , {
            estado: body.estado,
            [body.valor2] : body.dato2
        }
    )
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

    //res.render("registroUsu")
})




app.post('/estado', (req, res) => {
    const body = req.body
    //console.log(body)
    estudiantes.find({
        estado: body.estado
    }
    )
        .then(function (registro) {

            res.json(registro)
            //  console.log(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})

app.post('/ausentes', (_, res) => {

    estudiantes.find(
        {
            estado: "Ausente"
        }
    )
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})



app.post('/consulta_remision', (req, res) => {


    usuarios.find(

    ).where('usuario').ne('Director')
        .then(function (registro) {

            res.json(registro)

        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})

app.post('/nuevo_seguimiento', (req, res) => {
    const body = req.body

    new seguimientos(body).save()
        .then(function () {
            res.json(body)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

})

app.post('/estado_estudiante_en_seguimiento', (req, res) => {
    const body = req.body

    estudiantes.findOneAndUpdate(
        {
            id: body.id_estudiante
        }
        , {
            estado: body.estado
        }
    )
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

    //res.render("registroUsu")
})

app.post('/consulta_seguimientos', (req, res) => {
    const body = req.body
    //console.log(body)
    seguimientos.find({
        id_especialista :body.id_especialista,
        estado: body.estado
    }
    )
        .then(function (registro) {

            res.json(registro)
            //  console.log(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})
app.post('/consulta_todos_seguimientos_f', (req, res) => {
    const body = req.body
    //console.log(body)
    seguimientos.find({
        estado: body.estado
    }
    )
        .then(function (registro) {

            res.json(registro)
            //  console.log(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})
app.post('/inicio_seguimiento_asignado', (req, res) => {
    const body = req.body

    seguimientos.findOneAndUpdate(
        {
            _id: body.id
        }
        , {
            fecha_inicio: body.fecha_inicio,
            fecha_finalizacion: body.fecha_finalizacion,
            estado: body.estado
        }
    )
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

    //res.render("registroUsu")
})


app.post('/consulta_datos_correo', (req, res) => {
    const body = req.body
    usuarios.find(
        {
            correo: body.correo
        }
    )
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})
app.post('/asignar_cita', (req, res) => {
    const body = req.body

    new citas(body).save()
        .then(function () {
            res.json(body)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

})

app.post('/consulta_citas', (req, res) => {
    const body = req.body
    
    citas.find({
        id_especialista : body.id,
        estado: body.estado
    }
    )
        .then(function (registro) {
            
            res.json(registro)
            
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})
app.post('/guardar_consulta', (req, res) => {
    const body = req.body
  //  console.log(body)

    new consultas(body).save()
        .then(function () {
            res.json(body)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

})
app.post('/guardar_cierre_seguimiento', (req, res) => {
    const body = req.body
  //  console.log(body)

    new cierre(body).save()
        .then(function () {
            res.json(body)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

})

app.post('/actualizar_estado_cita', (req, res) => {
    const body = req.body
    //console.log(body)
    citas.findOneAndUpdate(
        {
            _id: body.id_cita


        }
        , {
            estado: body.estado
            
        }
    )
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

    //res.render("registroUsu")
})

app.post('/actualizar_estado_seguimiento', (req, res) => {
    const body = req.body
    //console.log(body)
    seguimientos.findOneAndUpdate(
        {
            _id: body.id_seguimiento


        }
        , {
            fecha_finalizacion: body.fecha_finalizacion,
            estado: body.estado
            
        }
    )
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

    //res.render("registroUsu")
})

app.post('/listadoConsultas', (req, res) => {
    const body = req.body

    consultas.find({
        id_seguimiento : body.id_seguimiento
      
    }
    )
        .then(function (registro) {
            
            res.json(registro)
            
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})
app.post('/consultaCierre', (req, res) => {
    const body = req.body

    cierre.find({
        id_seguimiento : body.id_seguimiento
      
    }
    )
        .then(function (registro) {
            
            res.json(registro)
            
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })


})



app.post('/cambio_clave', (req, res) => {
    const body = req.body
    //console.log(body)
    usuarios.findOneAndUpdate(
        {
            codigo: body.codigo


        }
        , {
            clave: body.clave
        }
    )
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })

    //res.render("registroUsu")
})


app.post('/consulta_estadisticas', (req, res) => {
    const body = req.body
    estadisticas.find({})
        .then(function (registro) {
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})

app.post('/agregar_ausente', (req, res) => {
    const body = req.body
    estadisticas.updateOne({},{

        $inc:{
            numero_desaparecidos :1
        }
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})


app.post('/agregar_ausente_hombre', (req, res) => {
    const body = req.body
    estadisticas.updateOne({},{

        $inc:{
            hombres_desaparecidos :1
        }
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})
app.post('/agregar_ausente_mujer', (req, res) => {
    const body = req.body
    estadisticas.updateOne({},{

        $inc:{
            mujeres_desaparecidas :1
        }
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})
app.post('/agregar_seguimiento', (req, res) => {
    const body = req.body
    estadisticas.updateOne({},{

        $inc:{
            seguimientos_activos :1
        }
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})
app.post('/agregar_seguimiento_finalizado', (req, res) => {
    const body = req.body
    estadisticas.updateOne({},{

        $inc:{
            seguimientos_finalizados:1
        }
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})



app.post('/agregar_aparecido', (req, res) => {
    const body = req.body
    estadisticas.updateOne({},{

        $inc:{
            numero_aparecidos :1
        }
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})


app.post('/agregar_aparecido_hombre', (req, res) => {
    const body = req.body
    estadisticas.updateOne({},{

        $inc:{
            hombres_aparecidos :1
        }
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})
app.post('/agregar_aparecido_mujer', (req, res) => {
    const body = req.body
    estadisticas.updateOne({},{

        $inc:{
            mujeres_aparecidas :1
        }
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})
app.post('/reiniciar_estadisticas', (req, res) => {
   //const body = req.body
    estadisticas.updateOne({},{

      
        numero_desaparecidos:0,
        numero_aparecidos:0,
        seguimientos_activos:0,
        seguimientos_finalizados:0,
        hombres_aparecidos:0,
        hombres_desaparecidos:0,
        mujeres_aparecidas:0,
        mujeres_desaparecidas:0
        
        
    })

        .then(function (registro) {           
            res.json(registro)
        }).catch(function () {
            res.json({ mensaje: 'Error' })
        })
   
})
app.listen(app.get('port'), () => {

    console.log('Servidor en puerto: ', app.get('port'))

})