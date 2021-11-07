const mongoose = require('mongoose')
const Schema = mongoose.Schema
const citasSchema = new Schema({
    id_seguimiento: String,
    nombre_estudiante: String,
    correo_estudiante: String,    
    id_estudiante: String,
    nombre_especialista: String,
    correo_especialista: String,    
    id_especialista: String,
    fecha_hora: String, 
    lugar : String,   
    estado : String,  


})
const citas = mongoose.model('Citas', citasSchema)
module.exports = citas