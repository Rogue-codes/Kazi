import express from 'express';
import { addTasks, deleteTask, getAllTask, getTaskDetails, getUserTask, toggleCompleted, updateUserTask } from '../controllers/taskControllers.js';

const taskRouter = express.Router()

taskRouter.post('/task/add', addTasks )
taskRouter.get('/task/all', getAllTask )
taskRouter.get('/task/my-tasks', getUserTask )
taskRouter.get('/task/my-tasks/:id', getTaskDetails)
taskRouter.put('/task/my-tasks/update/:taskId', updateUserTask )
taskRouter.delete('/task/delete/:id', deleteTask )
taskRouter.patch('/task/my-tasks/update/:id', toggleCompleted )

export default taskRouter;
