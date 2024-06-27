import React, { useEffect, useState } from 'react';
import  {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import "../../public/style/editTask.css";
function EditTask() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const history = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/${id}`)
      .then(response => {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
      })
      .catch(error => {
        console.error('There was an error fetching the task!', error);
      });
  }, [id]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/tasks/${id}`, { title, description, dueDate })
      .then(response => {
        history('/');
      })
      .catch(error => {
        console.error('There was an error updating the task!', error);
      });
      validateForm();
  };

  return (
    <div className="edit-task-container">
    <h1>Edit Task</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <div className='errors' style={{ color: 'red'}}>{errors.title}</div>}
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <div className='errors errors1' style={{ color: 'red' }}>{errors.description}</div>}
      </div>
      <div className="form-group">
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        {errors.dueDate && <div className='errors' style={{ color: 'red' }}>{errors.dueDate}</div>}
      </div>
      <button type="submit" className="btn-save">Save Changes</button>
    </form>
  </div>
  );
}

export default EditTask;
