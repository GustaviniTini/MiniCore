import React from 'react';

const TaskList = ({ tareas }) => {
  const tareasInProgressConRetraso = tareas.filter(tarea => 
    tarea.estado === 'In progress' && tarea.diasRetraso > 0
  );
  const tareasInProgressSinRetraso = tareas.filter(tarea => 
    tarea.estado === 'In progress' && tarea.diasRetraso === 0
  );
  const tareasDone = tareas.filter(tarea => tarea.estado === 'Done');

  const renderTable = (title, tareas) => (
    <div>
      <h3>{title}</h3>
      {tareas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Retraso</th>
              <th>Empleado</th>
              <th>Proyecto</th>
              <th>Fecha de Inicio</th>
              <th>Días Estimados</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map(tarea => (
              <tr key={tarea._id}>
                <td>{tarea.descripcion}</td>
                <td>{tarea.estado}</td>
                <td>{tarea.diasRetraso} días</td>
                <td>{tarea.idEmpleado.nombre} {tarea.idEmpleado.apellido}</td>
                <td>{tarea.idProyecto.nombre}</td>
                <td>{new Date(tarea.fechaInicio).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</td>
                <td>{tarea.diasEstimados}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay tareas en esta categoría.</p>
      )}
    </div>
  );

  return (
    <div>
      {renderTable('Tareas en Progreso con Retraso', tareasInProgressConRetraso)}
      {renderTable('Tareas en Progreso sin Retraso', tareasInProgressSinRetraso)}
      {renderTable('Tareas Completadas', tareasDone)}
    </div>
  );
};

export default TaskList;
