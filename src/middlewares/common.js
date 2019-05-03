import { isEmpty } from 'validator/'
import { jsonError } from '../utils/result'

export const valueRequired = (val) => {
  return (req, res, next) => {
    let result = false
    val.forEach(item => {
      if (isEmpty(item)) result = true
    })
    if (result)
      return res.json(jsonError('value is not empty'))
    return next()
  }
};