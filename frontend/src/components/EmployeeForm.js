import React, { useState } from 'react';
import api from '../api';

const EmployeeForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/empleados', { nombre, apellido });
      setNombre('');
      setApellido('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <button type="submit">Agregar Empleado</button>
    </form>
  );
};

export default EmployeeForm;
