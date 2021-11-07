const mongoose = require('mongoose')
const Schema = mongoose.Schema
const usuarioSchema = new Schema({
    nombre: String,
    correo: String,
    telefono: String,
    codigo: String,
    clave: String,    
    direccion: String,
    usuario: String

})
const usuario = mongoose.model('Usuarios', usuarioSchema)
module.exports = usuario