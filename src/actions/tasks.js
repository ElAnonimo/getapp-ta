import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  EDIT_TASK_CANCEL
} from './types';

// create a task
export const createTask = data => {
  console.log('createTask ran');
  return {
    type: ADD_TASK,
    data
  };
};

// delete task
export const deleteTask = id => {
  console.log('deleteTask ran');
  return {
    type: DELETE_TASK,
    id
  };
};


// edit task
export const editTask = id => {
  console.log('editTask ran');
  return {
    type: EDIT_TASK,
    id
  };
};

// cancel edit task
export const editTaskCancel = () => {
  return {
    type: EDIT_TASK_CANCEL
  }
};
