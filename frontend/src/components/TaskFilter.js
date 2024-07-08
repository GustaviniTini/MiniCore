import React, { useState } from 'react';
import api from '../api';

const TaskFilter = ({ setTareas }) => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      console.log(`Filtrando tareas desde ${fechaInicio} hasta ${fechaFin}`);
      const response = await api.get(`/tareas/filtrar?fechaInicio=${new Date(fechaInicio).toISOString()}&fechaFin=${new Date(fechaFin).toISOString()}`);
      console.log("Tareas filtradas:", response.data);
      setTareas(response.data);
    } catch (err) {
      console.error("Error al filtrar tareas:", err);
    }
  };

  return (
    <form onSubmit={handleFilter}>
      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
      />
      <input
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
      />
      <button type="submit">Filtrar Tareas</button>
    </form>
  );
};

export default TaskFilter;
