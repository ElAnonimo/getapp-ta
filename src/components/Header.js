import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import Alert from './Alert/Alert';
import Modal from './Modal/Modal';
import TaskForm from './common/TaskForm';
import TaskList from './Tasks/TaskList';
import { editTaskCancel } from '../actions/tasks';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const { taskEditing, taskEditedId } = useSelector(state => state.tasks);

  const dispatch = useDispatch();

  const onModalClose = () => {
    setShowModal(false);
  };

  const onFormModalClose = () => {
    setShowModal(false);
    dispatch(editTaskCancel());
  };

  return (
    <div className='app-wrapper'>
      <Alert />
      <div className='navbar'>
        <h1>
          <p><FontAwesomeIcon icon={faCode} /> GetApp</p>
        </h1>
        <button
          className='btn btn-light'
          onClick={() => setShowModal(true)}
          disabled={showModal || taskEditing}
        >
          Add Task
        </button>
      </div>
      {showModal && (
        <Modal formModal onClose={onModalClose}>
          <TaskForm onModalClose={onModalClose} />
        </Modal>
      )}
      {taskEditing && (
        <Modal formModal onClose={onFormModalClose}>
          <TaskForm
            edit
            onFormModalClose={onFormModalClose}
            taskEditing={taskEditing}
            taskEditedId={taskEditedId}
          />
        </Modal>
      )}
      {!showModal && !taskEditing && (
        <TaskList />
      )}
    </div>
  );
};

export default Header;
