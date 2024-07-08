const express = require('express');
const router = express.Router();
const Empleado = require('../models/empleado');

// Obtener todos los empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).send(empleado);
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;
