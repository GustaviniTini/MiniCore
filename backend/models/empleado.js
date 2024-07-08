const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
