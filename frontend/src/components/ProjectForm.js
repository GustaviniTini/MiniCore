import React, { useState } from 'react';
import api from '../api';

const ProjectForm = () => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/proyectos', { nombre });
      setNombre('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del Proyecto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit">Agregar Proyecto</button>
    </form>
  );
};

export default ProjectForm;
