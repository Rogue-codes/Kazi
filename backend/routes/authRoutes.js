import express from 'express';
import { isLoggedIn, loginUser, logout, registerUser } from '../controllers/AuthControllers.js';

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.post('/isLoggedIn', isLoggedIn)


export default router