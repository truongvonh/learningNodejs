import db from './../db/models'
import { jsonSuccess, jsonError } from '../utils/result'

const { Task } = db

export const getTasksController = async (req, res) => {
  try {
    const data = await Task.findAll({
      attributes: ['id', 'name']
    })
    if (!data.length) 
      res.json(jsonError('no data'))
    else res.json(jsonSuccess(data))
  } catch (err) {
    res.json(jsonError(err))
  }
}

export const addTaskController = async (req, res) => {
  const { name } = req.body
  try {
    await Task.create({ name })
    res.json(jsonSuccess('create success'))
  } catch (error) {
    res.json(jsonError(error))
  }
}