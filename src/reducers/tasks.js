import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_CANCEL
} from '../actions/types';

const initialState = {
  loading: false,
  taskEditing: false,
  taskEditedId: '',
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
};

const tasks = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TASK:
    case DELETE_TASK:
      return {
        ...state,
        loading: true
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.data,
        taskEditing: false,
        taskEditedId: ''
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task.id !== action.data)
      };
    case EDIT_TASK:
      return {
        ...state,
        loading: true,
        taskEditing: true,
        taskEditedId: action.data
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        taskEditedId: action.data
      };
    case EDIT_TASK_CANCEL:
      return {
        ...state,
        taskEditing: false,
        loading: false
      };
    default:
      return state;
  }
};

export default tasks;
