const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  idEmpleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado'
  },
  descripcion: String,
  fechaInicio: Date,
  diasEstimados: Number,
  estado: String,
  idProyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto'
  }
});

module.exports = mongoose.model('Tarea', TareaSchema);
