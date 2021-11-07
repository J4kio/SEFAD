const mongoose = require('mongoose')
const Schema = mongoose.Schema
const consultasSchema = new Schema({
    id_seguimiento: String,
    nombre_estudiante: String,     
    id_estudiante: String,
    nombre_especialista: String,       
    id_especialista: String,
    fecha_hora:String,
    notas: String, 
    calificacion : String
})
const consultas = mongoose.model('Consultas', consultasSchema)
module.exports = consultas