import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './alert.scss';

const Alert = () => {
  const { tasks } = useSelector(state => state.tasks);

  const [alertList, setAlertList] = useState([]);
  const [taskAlerts, setTaskAlerts] = useState([]);

  useEffect(() => {
    tasks.length > 0 && tasks.map(task => {
      const taskExpiresAt = task.createdAt + task.taskHours * 60 * 60 * 1000 + task.taskMins * 60 * 1000;
      return taskExpiresAt > Date.now() ? setAlertList(alerts => [...alerts, { ...task, taskExpiresAt }]) : null;
    });
  }, [tasks]);

  useEffect(() => {
    const pollAlertList = setInterval(() => {
      alertList.map(alert => {
        if (alert.taskExpiresAt <= Date.now()) {
          setAlertList(alertList.filter(item => item.id !== alert.id));
          return setTaskAlerts(alerts => [...alerts, alert]);
        } else {
          return null;
        }
      });
    }, 1000);

    return () => {
      clearInterval(pollAlertList);
    };
  }, [alertList]);

  const onRemoveAlertClick = id => {
    setTaskAlerts(alerts => alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className='alert-wrapper'>
      {taskAlerts.map(alert => {
        return (
          <div key={alert.id} className={`alert alert-${alert.done ? 'success' : 'danger'}`}>
            task ID#{alert.id} {alert.done ? 'completed on time' : 'didn\'t complete on time'}
            <FontAwesomeIcon
              className='remove-alert--icon'
              icon={faTimes}
              onClick={() => onRemoveAlertClick(alert.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Alert;
