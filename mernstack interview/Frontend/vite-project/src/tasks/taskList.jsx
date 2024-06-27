import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../public/style/taskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [sort, setSort] = useState({ type: "title", order: "asc" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks/")
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);
  function truncateTaskTitle(title, maxLength) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  }


  function handleFilterChange(e) {
    setFilter(e.target.value);
    
  }
  function handleSortChange(e) {
    const { value } = e.target;
    const [type, order] = value.split("-");
    setSort({ type, order });
  }

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title?.toLowerCase().includes(filter.toLowerCase());
    const dueDateMatch = new Date(task.dueDate).toLocaleDateString().includes(filter);
   
    return titleMatch || dueDateMatch;
  });

  
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort.type === "title") {
      if (sort.order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    } else if (sort.type === "dueDate") {
      if (sort.order === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    }
  });
  return (
    <div className="task-list-container">
      <div className="header">
        <h1>Task List</h1>
        <Link to="/add-task" className="add-task-button">
          Add Task
        </Link>
       
      </div>
      <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter tasks..."
          className="filter"
        />
        <select value={`${sort.type}-${sort.order}`} onChange={handleSortChange}>
          <option value="title-asc">Sort by Title (A-Z)</option>
          <option value="title-desc">Sort by Title (Z-A)</option>
          <option value="dueDate-asc">Sort by Due Date (Earliest)</option>
          <option value="dueDate-desc">Sort by Due Date (Latest)</option>
        </select>
      <ul>
        {Array.isArray(tasks) &&
          sortedTasks.map((task) => (
            <li key={task._id}>
              <Link to={`/tasks/${task._id}`}>
                <div className="box">
                  <div>{truncateTaskTitle(task.title, 20)}</div>
                  
                  <div>
                    <p className="duedate">
                      {" "}
                      <small>
                        {" "}
                        <i>
                          Due : {new Date(task.dueDate).toLocaleDateString()}
                        </i>
                      </small>
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TaskList;
