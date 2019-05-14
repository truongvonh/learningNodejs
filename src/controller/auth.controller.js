import db from './../db/models'
import { jsonSuccess, jsonError } from '../utils/result'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getEnv } from '../utils/common'
const User = db.User

export const signUpController = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const issetUser = await User.findOne({ where: { name } })
    const issetEmail = await User.findOne({ where: { email } })
    if (issetUser) res.json(jsonError('user existed'))
    if (issetEmail) res.json(jsonError('email existed'))
    const result = await User.create({
      name, email,
      password: bcrypt.hashSync(password, 8)
    })
    res.json(jsonSuccess(result))
  } catch (error) {
    res.json(jsonError('Network error'))
  }
}

export const signInController = async (req, res) => {
  try {
    const { name, password } = req.body
    const findUser = await User.findOne({ where: { name } })
    if (!findUser) {
      res.json(jsonError('User not found'))
      return
    }
    const passwordIsValid = bcrypt.compareSync(password, findUser.password)
    if (!passwordIsValid) {
      res.json(jsonError('Password not correct'))
      return
    }
    const token = jwt.sign({ id: findUser.id },
      getEnv('SECRET_KEY'), {
        expiresIn: getEnv('EXPRIRE_TIME'),
        algorithm: getEnv('HASH_ALGORITHM')
      })
    res.json(jsonSuccess(token))
  } catch (error) {
    res.json(jsonError('Network error'))
  }
}

