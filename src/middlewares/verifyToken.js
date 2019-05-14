import jwt from 'jsonwebtoken'
import { jsonError } from "../utils/result"
import { getEnv } from '../utils/common';

export const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (!token) {
    res.json(jsonError('No access token provided'))
    return
  }
  if (token && token.startsWith('Bearer ')) 
    token = token.slice(7, token.length)
  jwt.verify(token,
    getEnv('SECRET_KEY'),
    (err, decoded) => {
      if (err) {
        res.json(jsonError('Not valid token'))
        return
      }
      next()
    }
  )
}