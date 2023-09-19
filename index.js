import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './db/db.connection.js'
import { todoRouter } from './routes/todo.routes.js'
import { corsMiddleware } from './middlewares/cors.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(corsMiddleware())
app.use('/api', todoRouter)
const port = process.env.PORT || 3000
const init = () => {
  try {
    connectDb()
    app.listen(port, async () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
init()
