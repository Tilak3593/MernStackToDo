import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../../public/style/addTask.css";
function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/tasks/', { title, description, dueDate })
      .then(response => {
        history('/');
      })
      .catch(error => {
        console.error('There was an error creating the task!', error);
      });
      validateForm();
  };
  const validateForm = () => {
    const errors = {};
    if (title.trim() === '') {
      errors.title = 'Title is required';
    }
    if (description.trim() === '') {
      errors.description = 'Description is required';
    }
    if (dueDate === '') {
      errors.dueDate = 'Due Date is required';
    } else {
      const dueDateValue = new Date(dueDate);
      if (dueDateValue < new Date()) {
        errors.dueDate = 'Due Date cannot be in the past';
      }
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:5000/api/tasks/', { title, description, dueDate })
        .then(response => {
          navigate('/');
        })
        .catch(error => {
          console.error('There was an error creating the task!', error);
        });
    }
  };

  return (
    <div className='add-task-container'>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} placeholder='Enter the Task...' onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <div className='errors' style={{ color: 'red'}}>{errors.title}</div>}
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} placeholder="Enter the Task Details..." onChange={(e) => setDescription(e.target.value)} />
          {errors.description && <div className='errors errors1' style={{ color: 'red' }}>{errors.description}</div>}
        </div>
        <div>
          <label>Due Date:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          {errors.dueDate && <div className='errors' style={{ color: 'red' }}>{errors.dueDate}</div>}
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
