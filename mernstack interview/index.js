
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
// import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import taskRoutes from './src/routes/task.routes.js'



const app = express();

mongoose.connect('mongodb://localhost:27017/TodoAssignment', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
