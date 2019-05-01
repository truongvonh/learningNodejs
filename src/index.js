import express from 'express'
import bodyParser from 'body-parser'
import db from './db/models'
import taskRouter from './routes/task.routes'

const app = express()
const port = 5000 
const sequelize = db.sequelize

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World! abcd'))
app.use('/task', taskRouter)

app.listen(port, 
  () => {
    sequelize
      .sync({ force: false })
      .then(msg => msg)
  }
)