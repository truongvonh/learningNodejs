import express from 'express'
import bodyParser from 'body-parser'
import db from './db/models'
import taskRouter from './routes/task.routes'
import authRouter from './routes/auth.routes'
// const cors = require('cors');
import cors from 'cors'
import { corsOptions } from './utils/common';

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000
const sequelize = db.sequelize

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => res.json('Hello World! abcd'))
app.use('/task', taskRouter)
app.use('/auth', authRouter)

app.listen(port,
  () => {
    sequelize
      .sync({ force: false })
      .then(msg => msg)
  }
)