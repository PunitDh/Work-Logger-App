import './App.css';
import React, { useState, useEffect } from "react";
import { request } from "./request";
import Task from './components/Task';
import Notification, { NOTIFY } from './components/Notification';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(null);
  const [notification, setNotification] = useState({ message: null, type: null });

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
          setNotification({ message: "Work task logged to database", type: NOTIFY.success }) :
          Promise.reject("Unable to add task at this time"))
      .catch((err) => setNotification({ message: err, type: NOTIFY.failure }));
  }

  useEffect(() => {
    request("GET", '/tasks')
      .then(response => response.ok ? response.json() : Promise.reject("Connection to database failed"))
      .then(response => {
        setTasks(response);
        setNotification({ message: "Successfully connected to database", type: NOTIFY.success });
      })
      .catch((err) => setNotification({ message: err, type: NOTIFY.failure }))
  }, []);

  return (
    <div className="text-center">
      {notification.message && <Notification message={notification.message} type={notification.type} />}
      <div className="logger-container">
        <h1 className="logger-header">Work Logger App</h1>
        <div className="logger-box">
          <div className="text-blue-500">Task</div>
          <div className="text-blue-500">Timestamp</div>
          {tasks && tasks.map((t, idx) => <Task key={idx} task={t} />)}
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