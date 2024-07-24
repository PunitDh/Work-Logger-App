import React, { useState } from "react";
import { NOTIFY } from "./Notification";
import { request } from "../request";

const LoggerForm = ({ tasks, setTasks, setNotification }) => {
  const [task, setTask] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentTask = { name: task, timestamp: Date.now() };
    setTasks([...tasks, currentTask]);
    setTask("");
    request("POST", "/tasks", currentTask)
      .then((response) =>
        response.ok
          ? setNotification({
              message: "Work task logged to database",
              type: NOTIFY.success,
            })
          : Promise.reject("Unable to add task at this time")
      )
      .catch((err) => setNotification({ message: err, type: NOTIFY.failure }));
  };

  return (
    <form className="logger-form" onSubmit={handleSubmit}>
      <input
        type="text"
        autoFocus={true}
        placeholder="Add New Task"
        className="input-box"
        value={task}
        onChange={handleChange}
      />
      <input type="submit" className="submit-button" value="Add New" />
    </form>
  );
};

export default LoggerForm;
