import React, { useState, useEffect } from 'react';
import '../styles/ToDoList.css';
import { FaCheckCircle, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { NavbarLaw } from '../../Nyaysetu/Navbar';
import { Footer } from '../../Nyaysetu/Footer';

const ToDoList = () => {
  // Get current user ID from localStorage
  const userId = localStorage.getItem("lawyerProfile") || localStorage.getItem("clientId");

  // Load tasks for this user
  const [tasks, setTasks] = useState(() => {
    if (!userId) return [];
    const saved = localStorage.getItem(`tasks_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
  }, [tasks, userId]);

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
    <div style={{ overflowX: "hidden" }}>
      <NavbarLaw />
      <div className="todo-bg">
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
                <span onClick={() => toggleDone(i)}>{task.text}</span>
                <div className="actions">
                  <FaCheckCircle onClick={() => toggleDone(i)} />
                  <FaTrashAlt onClick={() => deleteTask(i)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ToDoList;
