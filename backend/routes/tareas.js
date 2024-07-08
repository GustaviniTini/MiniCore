const express = require('express');
const router = express.Router();
const Tarea = require('../models/tarea');
const Empleado = require('../models/empleado');
const Proyecto = require('../models/proyecto');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find().populate('idEmpleado').populate('idProyecto');
    res.json(tareas);
  } catch (err) {
    console.error("Error al obtener tareas:", err);
    res.status(500).send(err);
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const { idEmpleado, idProyecto, descripcion, fechaInicio, diasEstimados, estado } = req.body;
    console.log("Datos recibidos para nueva tarea:", req.body);

    // Verificar si el empleado y el proyecto existen
    const empleado = await Empleado.findById(idEmpleado);
    const proyecto = await Proyecto.findById(idProyecto);

    if (!empleado || !proyecto) {
      return res.status(400).send('Empleado o Proyecto no encontrado');
    }

    const tarea = new Tarea({
      idEmpleado,
      idProyecto,
      descripcion,
      fechaInicio,
      diasEstimados,
      estado
    });

    await tarea.save();
    res.status(201).send(tarea);
  } catch (err) {
    console.error("Error al crear tarea:", err);
    res.status(400).send(err);
  }
});

// Filtrar tareas por rango de fechas y calcular retrasos
router.get('/filtrar', async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;
  console.log(`Filtrando tareas desde ${fechaInicio} hasta ${fechaFin}`);
  const fechaInicioDate = new Date(fechaInicio);
  const fechaFinDate = new Date(fechaFin);

  try {
    const tareas = await Tarea.find({
      fechaInicio: { $gte: fechaInicioDate, $lt: new Date(fechaFinDate.getTime() + (1000 * 60 * 60 * 24)) } // Incluir fechas iguales a la fecha de fin
    }).populate('idEmpleado').populate('idProyecto');

    const tareasFiltradas = tareas.map(tarea => {
      const fechaEstimadaFin = new Date(tarea.fechaInicio);
      fechaEstimadaFin.setDate(fechaEstimadaFin.getDate() + tarea.diasEstimados);

      const hoy = new Date();
      let diasRetraso = 0;

      if (hoy > fechaEstimadaFin && tarea.estado === 'In progress') {
        diasRetraso = Math.ceil((hoy - fechaEstimadaFin) / (1000 * 60 * 60 * 24));
      }

      console.log(`Tarea: ${tarea.descripcion}, Fecha Estimada Fin: ${fechaEstimadaFin}, Días de Retraso: ${diasRetraso}`);

      return {
        ...tarea._doc,
        diasRetraso
      };
    });

    res.json(tareasFiltradas);
  } catch (err) {
    console.error("Error al filtrar tareas:", err);
    res.status(500).send(err);
  }
});

module.exports = router;
