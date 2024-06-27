import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../public/style/taskDetails.css";
function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the task!", error);
      });
  }, [id]);

  const deleteTask = () => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-detail">
      <h1>
        Task Name: <div className="title">{task.title}</div>
      </h1>
      <p>
        {" "}
        <b>Description: </b>
        {task.description}
      </p>
      <small>
        {" "}
        <i>
          {" "}
          <p className="date">
            Due Date: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </i>
      </small>{" "}
      <button>
        {" "}
        <Link className="edit" to={`/edit-task/${task._id}`}>
          Edit
        </Link>
      </button>{" "}
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default TaskDetail;
