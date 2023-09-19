import { Router } from 'express'
import { todoController } from '../controllers/todo.controller.js'

export const todoRouter = Router()

todoRouter.get('/todo', todoController().getTodos)
todoRouter.post('/todo', todoController().addTodo)
todoRouter.put('/todo/:id', todoController().updateTodo)
todoRouter.delete('/todo/:id', todoController().deltedTodo)
