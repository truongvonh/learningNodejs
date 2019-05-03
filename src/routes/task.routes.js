import { Router } from 'express'
import {
  getTasksController,
  addTaskController,
  deleteTaskController,
  updateTaskController
} from './../controller/task.controller'
import { valueRequired, isNumber } from '../middlewares/common';

const taskRouter = Router()

taskRouter.get('/', getTasksController)

taskRouter.post('/',
  (req, res, next) => valueRequired([req.body.name])(req, res, next),
  addTaskController
)

taskRouter.put('/', updateTaskController)

taskRouter.delete('/',
  [
    (req, res, next) => isNumber([req.body.id])(req, res, next),
    (req, res, next) => valueRequired([req.body.id])(req, res, next)
  ],
  deleteTaskController
)

export default taskRouter