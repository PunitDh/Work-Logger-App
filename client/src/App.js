import "./App.css";
import React, { useState, useEffect } from "react";
import { request } from "./request";
import Task from "./components/Task";
import Notification, { NOTIFY } from "./components/Notification";
import LoggerForm from "./components/LoggerForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    request("GET", "/tasks")
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject("Connection to database failed")
      )
      .then((response) => {
        setTasks(response);
        setNotification({
          message: "Successfully connected to database",
          type: NOTIFY.success,
        });
      })
      .catch((err) => setNotification({ message: err, type: NOTIFY.failure }));
  }, []);

  return (
    <div className="text-center">
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="logger-container">
        <h1 className="logger-header">Work Logger App</h1>
        <div className="logger-box">
          <div className="text-blue-500">Task</div>
          <div className="text-blue-500">Timestamp</div>
          {tasks.map((task) => <Task key={task._id} task={task} />)}
        </div>
        <LoggerForm
          tasks={tasks}
          setTasks={setTasks}
          setNotification={setNotification}
        />
      </div>
    </div>
  );
}

export default App;
