import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "../src/tasks/taskList.jsx";
import TaskDetail from "../src/tasks/taskDetails.jsx";
import AddTask from "../src/tasks/addTask.jsx";
import EditTask from "../src/tasks/editTask.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;