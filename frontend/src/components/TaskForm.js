import React, { useState, useEffect } from 'react';
import api from '../api';

const TaskForm = () => {
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [diasEstimados, setDiasEstimados] = useState('');
  const [estado, setEstado] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');
  const [idProyecto, setIdProyecto] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleadosRes = await api.get('/empleados');
        const proyectosRes = await api.get('/proyectos');
        setEmpleados(empleadosRes.data);
        setProyectos(proyectosRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tareas', { idEmpleado, idProyecto, descripcion, fechaInicio, diasEstimados, estado });
      console.log("Tarea creada:", response.data);
      setDescripcion('');
      setFechaInicio('');
      setDiasEstimados('');
      setEstado('');
      setIdEmpleado('');
      setIdProyecto('');
    } catch (err) {
      console.error("Error al crear tarea:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={idEmpleado} onChange={(e) => setIdEmpleado(e.target.value)}>
        <option value="">Seleccione un Empleado</option>
        {empleados.map(empleado => (
          <option key={empleado._id} value={empleado._id}>
            {empleado.nombre} {empleado.apellido}
          </option>
        ))}
      </select>
      <select value={idProyecto} onChange={(e) => setIdProyecto(e.target.value)}>
        <option value="">Seleccione un Proyecto</option>
        {proyectos.map(proyecto => (
          <option key={proyecto._id} value={proyecto._id}>
            {proyecto.nombre}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
      />
      <input
        type="number"
        placeholder="Días Estimados"
        value={diasEstimados}
        onChange={(e) => setDiasEstimados(e.target.value)}
      />
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="">Seleccione un Estado</option>
        <option value="In progress">In progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;
