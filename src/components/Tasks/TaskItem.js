import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { deleteTask, editTask } from '../../actions/tasks';
import './tasks.scss';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const onEdit = id => {
    dispatch(editTask(id));
  };

  const onDelete = id => {
    dispatch(deleteTask(id));
  };

  return (
    <div className='task-item--box'>
      <div className='task-wrapper'>
        <div className='task-prop'>
          <p className='task-prop--label'>ID</p>
          <p className='task-prop--value'>{task.id}</p>
        </div>
        <div className='task-prop'>
          <p className='task-prop--label'>Text</p>
          <p className='task-prop--value'>{task.text}</p>
        </div>
        <div className='task-prop'>
          <p className='task-prop--label'>Done</p>
          <p className='task-prop--value'>
            {task.done ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
          </p>
        </div>
        {(task.taskHours || task.taskMins) && (
          <div className='task-prop'>
            <p className='task-prop--label'>Expires In</p>
            <p className='task-prop--value'>{task.taskHours && `${task.taskHours} hr. `}{task.taskMins && `${task.taskMins} min.`}</p>
          </div>
        )}
      </div>
      <div className='task-item--controls'>
        <div className='task-item--controls-box'>
          <FontAwesomeIcon className='task-item--controls-icon__mr' onClick={() => onEdit(task.id)} icon={faEdit} />
          <FontAwesomeIcon onClick={() => onDelete(task.id)} icon={faTimes} />
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskItem;
