const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
  nombre: String
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
