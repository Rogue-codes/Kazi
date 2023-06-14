import express from 'express';
import { getUser, updateUser } from '../controllers/userControllers.js';

const userRouter = express.Router()

userRouter.get('/me', getUser)
userRouter.put('/me', updateUser)

export default userRouter