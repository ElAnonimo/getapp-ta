import { all, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  EDIT_TASK,
  EDIT_TASK_SUCCESS
} from '../actions/types';

// worker saga
function* addTaskSaga(action) {
  try {
    const newTasks = [];
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    if (existingTasks.length === 0) {
      newTasks.push(action.data);
    } else {
      existingTasks.map(task => task.id === action.data.id
        ? newTasks.push(action.data)
        : newTasks.push(task)
      );
      if (!newTasks.includes(action.data)) {
        newTasks.push(action.data);
      }
    }

    localStorage.setItem('tasks', JSON.stringify(newTasks));
    yield put({ type: ADD_TASK_SUCCESS, data: newTasks });
  } catch(ex) {
    console.log('sagas/tasks.js. Error fetching tasks:', ex.message);
  }
}

function* deleteTaskSaga(action) {
  try {
    const tasks = JSON.parse(localStorage.getItem('tasks')).filter(task => task.id !== action.id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    yield put({ type: DELETE_TASK_SUCCESS, data: action.id });
  } catch(ex) {
    console.log(`sagas/tasks.js. Error deleting task ID ${action.id}:`, ex.message);
  }
}

function* editTaskSaga(action) {
  try {
    yield put({ type: EDIT_TASK_SUCCESS, data: action.id });
  } catch(ex) {
    console.log(`sagas/tasks.js. Error editing task ID ${action.data.id}:`, ex.message);
  }
}

// watcher saga
function* addWatcherSaga() {
  yield takeLatest(ADD_TASK, addTaskSaga);
  yield takeLatest(DELETE_TASK, deleteTaskSaga);
  yield takeLatest(EDIT_TASK, editTaskSaga);
}

// root saga
function* rootSaga() {
  yield all([
    fork(addWatcherSaga)
  ]);
}

export default rootSaga;
