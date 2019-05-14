import { Router } from 'express'
import { valueRequired } from '../middlewares/common'
import { 
  signUpController,
  signInController 
} from './../controller/auth.controller'

const authRouter = Router()

authRouter.post('/signUp', 
  [
    (req, res, next) => {
      const { name, email, password } = req.body
      valueRequired([name, email, password])(req, res, next)
    }
  ], 
  signUpController

  )
authRouter.post('/signIn', 
  [
    (req, res, next) => {
      const { name, password } = req.body
      valueRequired([name, password])(req, res, next)
    }
  ], 
  signInController
)

export default authRouter