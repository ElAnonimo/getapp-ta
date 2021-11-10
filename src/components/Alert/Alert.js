import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Alert = () => {
  const { tasks } = useSelector(state => state.tasks);
  console.log('Alert tasks:', tasks);

  const [alertList, setAlertList] = useState([]);
  const [taskAlerts, setTaskAlerts] = useState([]);

  useEffect(() => {
    tasks.length > 0 && tasks.map(task => {
      const taskExpiresAt = task.createdAt + task.taskHours * 60 * 60 * 1000 + task.taskMins * 60 * 1000;
      console.log('Alert taskExpiresAt:', taskExpiresAt);
      return taskExpiresAt > Date.now() ? setAlertList(alerts => [...alerts, { ...task, taskExpiresAt }]) : null;
    });
  }, [tasks]);

  console.log('Alert alertList:', alertList);

  useEffect(() => {
    const pollAlertList = setInterval(() => {
      // alertList.map(alert => {
      //   const taskExpiresAt = alert.createdAt + alert.taskHours * 60 * 60 * 1000 + alert.taskMins * 60 * 1000;
      // });
    }, 1000);

    return () => {
      clearInterval(pollAlertList);
    };
  }, []);

  const onRemoveAlertClick = id => {
    setTaskAlerts(alerts => alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className='alert-wrapper'>
      {taskAlerts.map(alert => {
        console.log('Alert taskAlerts alert:', alert);
        return (
          <div key={alert.id} className={`alert alert-${alert.done ? 'success' : 'danger'}`}>
            task ID#{alert.id} {alert.done ? 'completed on time' : 'didn\'t complete on time'}
            <FontAwesomeIcon icon={faTimes} onClick={() => onRemoveAlertClick(alert.id)} />
          </div>
        );
      })}
    </div>
  );
};

export default Alert;
