import React, { useState, useEffect } from 'react';
import './todoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from LocalStorage when the component mounts
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState('');

  useEffect(() => {
    // Save tasks to LocalStorage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className='todo'>
      <h2>still To-Do </h2>
      <div className="inputContainer">
        <input
          className="todoInput"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="addTaskButton" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="todoList">
        {tasks.map((t, index) => (
          <li key={index}>
            <span className="taskText">{t}</span>
            <button className="removebBut" onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
