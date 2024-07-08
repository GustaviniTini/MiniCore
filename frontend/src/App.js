import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import './App.css'; // Importa el archivo CSS
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

const App = () => {
  const [tareas, setTareas] = useState([]);

  return (
    <Container maxWidth="md" className="container">
      <Typography variant="h4" align="center" gutterBottom>Task Manager</Typography>
      <TaskFilter setTareas={setTareas} />
      <div className="table-container">
        <TaskList tareas={tareas} />
      </div>
    </Container>
  );
};

export default App;
