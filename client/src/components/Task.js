import React from "react";
import dateFormat from "dateformat";

const Task = ({ task }) => {
  return (
    <React.Fragment>
      <div className="text-white text-left ml-4">{task.name}</div>
      <div className="text-white mr-2">
        {dateFormat(task.timestamp, "ddd, mmm dS, yyyy, h:MM TT")}
      </div>
    </React.Fragment>
  );
};

export default Task;
