const express = require('express');
const router = express.Router();
const Proyecto = require('../models/proyecto');

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const proyectos = await Proyecto.find();
    res.json(proyectos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
  try {
    const proyecto = new Proyecto(req.body);
    await proyecto.save();
    res.status(201).send(proyecto);
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;
