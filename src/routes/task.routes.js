import { Router } from 'express'
import { 
  getTasksController,
  addTaskController 
} from './../controller/task.controller'
import { valueRequired } from '../middlewares/common';

const taskRouter = Router()

taskRouter.get('/', getTasksController)

taskRouter.post('/',
  (req, res, next) => valueRequired([req.body.name])(req, res, next),
  addTaskController
)

export default taskRouter