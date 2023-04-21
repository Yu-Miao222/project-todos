import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tasks from '../reducers/tasks'

const Table = styled.table`
  width: 100%;
  max-width: 80%;
  text-align: center;
  margin: 5% auto;
  border-collapse: collapse;
  background-color: #FDF1D6;
  box-shadow: 4px 4px 8px #9E7540;

  @media (min-width: 900px){
    margin:2% auto;
  }
  
  td,
  th {
    font-family: 'Libre Franklin';
    color: #FF8400;
    font-size: 1.5em;
    padding: 0.7em;
  }
  thead tr {
    border-bottom: 2px solid #9E7540;
  }

  select {
    font-family: 'Libre Franklin';
    font-size: 0.7em;
    color: #DA723C;
    border: none;
    border-radius: 4px;
    background-color: #ffe0b8;
    min-width: 50%;
  }
  select option{
    color: #DA723C;
  }
  .remove-button{
    border: none;
    background-color: #FDF1D6 ;
  }
  .remove-button:hover{
    background-color: #FF8400;
    border: none;
  }
  .empty-state {
    color: lightgrey;
  }
`

const TaskList = () => {
  const taskList = useSelector((store) => store.tasks.items)

  const dispatch = useDispatch();

  const onToggleAllTask = (checked) => {
    dispatch(tasks.actions.onToggleAllTask(checked))
  }

  const onToggleTask = (id) => {
    dispatch(tasks.actions.onToggleTask(id))
  }

  const onRemoveTask = (id) => {
    dispatch(tasks.actions.removeTask(id))
  }

  const updateStatus = (id, value) => {
    dispatch(tasks.actions.changeStatus({ id, value }))
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <label htmlFor="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                // test each element and return a boolean value
                checked={taskList.every((task) => task.isComplete)}
                onChange={(event) => onToggleAllTask(event.target.checked)} />
            </label>
          </th>
          <th>Task</th>
          <th>Status</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {taskList.map((task) => (
          <tr key={task.id}>
            <td>
              <label htmlFor="checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={task.isComplete}
                  onChange={() => onToggleTask(task.id)} />
              </label>
            </td>
            <td className={task.isComplete ? 'completed' : 'active'}>
              {task.text}
            </td>
            <td>
              <select
                value={task.status}
                onChange={(event) => {
                  updateStatus(task.id, event.target.value)
                }}>
                <option value="todo">Todo</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </td>
            <td>
              <button
                type="button"
                className="remove-button"
                onClick={() => onRemoveTask(task.id)}>
                ✖️
              </button>
            </td>
          </tr>
        ))}
        {taskList.length === 0 ? (
          <tr>
            <td colSpan="4" className="empty-state">
              Add your first task above
            </td>
          </tr>
        ) : null}
      </tbody>
    </Table>
  )
}
export default TaskList;