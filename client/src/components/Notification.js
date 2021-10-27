import React from 'react';

export const NOTIFY = {
  success: "success",
  failure: "failure"
}

const Notification = ({ message, type }) => {

  return (
    <div className={`${type} notification`}>
      {message}
    </div>
  )
}

export default Notification;