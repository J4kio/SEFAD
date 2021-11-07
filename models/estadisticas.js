const mongoose = require('mongoose')
const Schema = mongoose.Schema
const estadisticasSchema = new Schema({
    numero_desaparecidos:Number,
    numero_aparecidos:Number,
    seguimientos_activos:Number,
    seguimientos_finalizados:Number,
    hombres_aparecidos:Number,
    hombres_desaparecidos:Number,
    mujeres_aparecidas:Number,
    mujeres_desaparecidas:Number
})
const estadisticas = mongoose.model('Estadisticas', estadisticasSchema)
module.exports = estadisticas