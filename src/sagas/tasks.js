import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { createTask, deleteTask, editTask } from '../actions/tasks';
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
    const res = yield call(createTask, action.data);
    const newTasks = [];
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    if (existingTasks.length === 0) {
      newTasks.push(res.data);
    } else {
      existingTasks.map((task, index, arr) => task.id === res.data.id
        ? newTasks.push(res.data)
        : newTasks.push(task)
      );
      if (!newTasks.includes(res.data)) {
        newTasks.push(res.data);
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
    const res = yield call(deleteTask, action.id);
    const tasks = JSON.parse(localStorage.getItem('tasks')).filter(task => task.id !== res.id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    yield put({ type: DELETE_TASK_SUCCESS, data: res.id });
  } catch(ex) {
    console.log(`sagas/tasks.js. Error deleting task ID ${action.id}:`, ex.message);
  }
}

function* editTaskSaga(action) {
  try {
    const res = yield call(editTask, action.id);
    yield put({ type: EDIT_TASK_SUCCESS, data: res.id });
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
