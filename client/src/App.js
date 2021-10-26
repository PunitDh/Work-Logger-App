import './App.css';
import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentTask = { name: task, timestamp: Date.now() };
    setTasks([...tasks, currentTask]);
    setTask("");
    fetch(`${API_URL}tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify(currentTask)
    }).then(response => console.log(response));
  }

  useEffect(() => {
    fetch(`${API_URL}tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      cache: "no-cache"
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("Unable to retrieve tasks at this time")
        }
      })
      .then(response => {
        console.log(response);
        setTasks(response);
      })
      .catch((err) => setError(err))
  }, [API_URL]);

  return (
    <div className="text-center">
      <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl mb-4 w-8/12 py-4 rounded border-2">Work Logger App</h1>
        <div className="grid grid-cols-2 gap-4 text-xl w-8/12 py-4 rounded border-2">
          <div className="text-blue-500">Task</div>
          <div className="text-blue-500">Timestamp</div>
          {error ? error : null}
          {
            tasks && tasks.map((t, idx) => (
              <React.Fragment key={idx}>
                <div className="text-white text-left ml-4">{ t.name }</div>
                <div className="text-white">{ dateFormat(t.timestamp, "ddd, mmm dS, yyyy, h:MM TT") }</div>
              </React.Fragment>
            ))
          }
          <form className="flex flex-auto" onSubmit={handleSubmit}>
            <input type="text" autoFocus={true} placeholder="Add New Task" className="text-black mx-4 pl-2 border-4 border-blue-500 rounded" value={task} onChange={handleChange} />
            <input type="submit" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg" value="Add New" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;