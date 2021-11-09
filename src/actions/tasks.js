import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  EDIT_TASK_CANCEL
} from './types';

// create a task
export const createTask = data => {
  return {
    type: ADD_TASK,
    data
  };
};

// delete task
export const deleteTask = id => {
  return {
    type: DELETE_TASK,
    id
  };
};


// edit task
export const editTask = id => {
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
