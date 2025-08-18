import React, { useState } from 'react';
import '../styles/ToDoList.css';
import { FaCheckCircle, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { NavbarLaw } from '../../Nyaysetu/Navbar';
import { Footer } from '../../Nyaysetu/Footer';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, done: false }]);
      setInput("");
    }
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div style={{overflowX:"hidden"}}>
    <NavbarLaw/>
    <div className="todo-bg">
      <div className="glow-circle"></div>
      <div className="todo-card animated-pop">
        <h2 id='h2'>📝 To-Do List</h2>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id='input'
          />
          <button onClick={addTask} id='button'><FaPlus /></button>
        </div>
        <ul id='ul'>
          {tasks.map((task, i) => (
            <li id='li' key={i} className={task.done ? "done" : ""}>
              <span onClick={() => toggleDone(i)}>
                {task.text}
              </span>
              <div className="actions">
                <FaCheckCircle onClick={() => toggleDone(i)} />
                <FaTrashAlt onClick={() => deleteTask(i)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ToDoList;
