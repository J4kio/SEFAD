const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cierreSchema = new Schema({
    id_seguimiento: String,
    nombre_estudiante: String,     
    id_estudiante: String,
    nombre_especialista: String,       
    id_especialista: String,
    fecha_hora:String,
    notas: String, 
    calificacion : String
})
const cierre = mongoose.model('Cierre', cierreSchema)
module.exports = cierre