const mongoose = require('mongoose')
const Schema = mongoose.Schema
const estudiantesSchema = new Schema({
    id: String,
    direccion: String,
    email: String,
    estado: String,
    fecha_reporte: String,
    fecha_aparicion: String,
    foto: String,
    nombre: String,
    telefono: String,
    carrera: String,
    edad: String,
    genero:String

})
const estudiantes = mongoose.model('estudiantes', estudiantesSchema)
module.exports = estudiantes