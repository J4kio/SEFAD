const mongoose = require('mongoose')
const Schema = mongoose.Schema
const seguimientosSchema = new Schema({
    
    nombre : String,
    telefono : String,
    email : String,
    id_estudiante : String,
    id_especialista : String,
    estado: String,
    fecha_inicio: String,
    fecha_finalizacion: String,
    
    

})
const seguimientos = mongoose.model('seguimientos', seguimientosSchema)
module.exports = seguimientos