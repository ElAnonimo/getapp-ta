import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { loading, tasks } = useSelector(state => state.tasks);

  return (
    <div className='tasklist-wrapper'>
      {!loading && tasks?.length > 0 ? tasks.map(task =>
        <TaskItem key={task.id} task={task} />
      ) : (
        <p className='text-center'>No tasks yet or loading</p>
      )}
    </div>
  )
};

export default TaskList;
