import express from 'express'
import auth from '../middlewares/auth.js';
import {postAnswer,deleteAnswer} from '../controllers/Answers.js'

const router=express.Router();
//update particular recorde
router.patch('/post/:id',auth,postAnswer)
router.patch('/delete/:id',auth,deleteAnswer)
export default router
