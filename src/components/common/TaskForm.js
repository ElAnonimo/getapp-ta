import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { Formik, Form, Field } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { createTask } from '../../actions/tasks';
import './taskform.scss';

const TaskForm = ({
  edit,
  onModalClose,
  taskEditedId,
  taskEditing,
  onFormModalClose
}) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);

  const [formValues, setFormValues] = useState({
    text: '',
    done: false,
    taskHours: '',
    taskMins: ''
  });

  useEffect(() => {
    if (taskEditing) {
      const taskEdited = tasks.find(task => task.id === taskEditedId);

      setFormValues({
        text: taskEdited.text || '',
        done: taskEdited.done || false,
        taskHours: taskEdited.taskHours || '',
        taskMins: taskEdited.taskMins || ''
      });
    }
  }, [tasks, taskEditing, taskEditedId]);

  const taskTextExists = text => {
    // will also prevent submit if the after and before edit form text is the same
    return tasks.some(task => task.text === text);
  };

  const onCancelClick = () => {
    edit ? onFormModalClose() : onModalClose();
  };

  return (
    <div className='form-wrapper'>
      <h3 className='form-title'>{`${taskEditing ? 'Edit' : 'Add'} Task`}</h3>
      <Formik
        enableReinitialize
        initialValues={formValues}
        validationSchema={() => object().shape({
          text: string()
            .required('please add task description. 300 characters max')
            .max(300, '300 characters max')
            .test('text', 'text already exists', value => {
              return !taskTextExists(value);
            }),
          taskHours: string()
            .test('taskHours', 'a 2-digit max integer value', value => {
              const number = parseInt(value, 10);
              return !number || (number > -1 && number < 100);
            }),
          taskMins: string()
            .test('taskMins', 'please select from 1 to 59', value => {
              const number = parseInt(value, 10);
              return !number || (number > 0 && number < 60);
            })
        })}
        onSubmit={(values, actions) => {
          dispatch(createTask({
            id: taskEditing ? taskEditedId : uuidv4(),
            ...values
          }));

          actions.setSubmitting(false);
          edit ? onFormModalClose() : onModalClose();
        }}
      >
        {({
          isSubmitting,
          errors,
          touched,
          setFieldValue
        }) => (
          <Form className='form-main'>
            <label htmlFor='text' className='label-wrapper'>
              <p className='label-title'>Description</p>
              <div className='fields-wrapper'>
                <Field
                  className='form-description'
                  component='textarea'
                  name='text'
                  placeholder='please add task description. 300 characters max.'
                />
                {errors.text && touched.text && <div className='error-message'>{errors.text}</div>}
              </div>
            </label>
            <label htmlFor='done' className='label-wrapper'>
              <p className='label-title'>Done</p>
              <div className='fields-wrapper'>
                <Field
                  type='checkbox'
                  name='done'
                />
              </div>
            </label>
            <div className='expires-in'>
              <p className='label-title--group'>Expires In</p>
              <label htmlFor='taskHours' className='label-wrapper'>
                <p className='label-title'>Hours</p>
                <div className='fields-wrapper'>
                  <Field
                    className='expires-in__duration'
                    type='text'
                    onChange={evt => setFieldValue('taskHours', evt.target.value.replace(/\D/g, ''))}
                    name='taskHours'
                  />
                  {errors.taskHours && touched.taskHours && <div className='error-message'>{errors.taskHours}</div>}
                </div>
              </label>
              <label htmlFor='taskMins' className='label-wrapper'>
                <p className='label-title'>Minutes</p>
                <div className='fields-wrapper'>
                  <Field
                    className='expires-in__duration'
                    type='text'
                    onChange={evt => setFieldValue('taskMins', evt.target.value.replace(/\D/g, ''))}
                    name='taskMins'
                  />
                  {errors.taskMins && touched.taskMins && <div className='error-message'>{errors.taskMins}</div>}
                </div>
              </label>
            </div>
            <div className='form-buttons'>
              <button className='btn btn-light' type='submit' disabled={isSubmitting}>Submit</button>
              <button className='btn btn-danger' type='button' onClick={onCancelClick}>Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

TaskForm.propTypes = {
  taskEdited: PropTypes.string,
  taskEditing: PropTypes.bool,
  edit: PropTypes.bool,
  onModalClose: PropTypes.func,
  onFormModalClose: PropTypes.func
};

export default TaskForm;
