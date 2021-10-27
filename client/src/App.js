import './App.css';
import React, { useState, useEffect } from "react";
import { request } from "./request";
import Task from './components/Task';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentTask = { name: task, timestamp: Date.now() };
    setTasks([...tasks, currentTask]);
    setTask("");
    request("POST", '/tasks', currentTask)
      .then(response =>
        response.ok ?
          setNotification("Work task logged to database") :
          Promise.reject("Unable to add task at this time"))
      .catch((err) => setError(err));
  }

  useEffect(() => {
    request("GET", '/tasks')
      .then(response => response.ok ? response.json() : Promise.reject("Unable to retrieve tasks at this time"))
      .then(response => setTasks(response))
      .catch((err) => setError(err))
  }, []);

  return (
    <div className="text-center">
      {notification ?
        (<div className="bg-green-300 text-green-700 border-2 border-green-700 notification">{notification}</div>) : null}
      {error ? (<div className="bg-red-300 text-red-700 border-2 border-red-700 notification">{error}</div>) : null}
      <div className="logger-container">
        <h1 className="logger-header">Work Logger App</h1>
        <div className="logger-box">
          <div className="text-blue-500">Task</div>
          <div className="text-blue-500">Timestamp</div>
          {
            tasks && tasks.map((t, idx) => (
              <Task key={idx} task={t} />
            ))
          }
        </div>
        <form className="logger-form" onSubmit={handleSubmit}>
          <input type="text" autoFocus={true} placeholder="Add New Task" className="input-box" value={task} onChange={handleChange} />
          <input type="submit" className="submit-button" value="Add New" />
        </form>
      </div>
    </div>
  );
}

export default App;