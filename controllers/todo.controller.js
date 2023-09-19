import { todoServices } from '../services/todo.service.js'
import { validatePartialTodo } from '../util/schema.validation.js'
const { getAllTodosService, addTodoService, updateTodoService, deleteTodoService } = todoServices()
export const todoController = () => {
  const getTodos = async (req, res) => {
    const { page, limit } = req.query
    const todos = await getAllTodosService({ page, limit })
    if (!todos?.ok) return res.status(todos.status).json({ message: todos.msg })
    res.status(todos.status).json({ message: todos.msg, data: todos.data })
  }
  const addTodo = async (req, res) => {
    const { name } = req.body
    const newTodo = await addTodoService({ name })
    if (!newTodo.ok) return res.status(newTodo.status).json({ message: newTodo.msg })
    res.status(newTodo.status).json({ message: newTodo.msg, data: newTodo.data })
  }
  const updateTodo = async (req, res) => {
    const { id } = req.params
    const result = validatePartialTodo(req.body)
    console.log({ result })
    if (!result.success) return res.status(400).json({ message: result.error })
    const updatedTodo = await updateTodoService({ id, input: result.data })
    if (!updatedTodo.ok) return res.status(updatedTodo.status).json({ message: updatedTodo.msg })
    res.status(updatedTodo.status).json({ message: updatedTodo.msg, data: updatedTodo.data })
  }
  const deltedTodo = async (req, res) => {
    const { id } = req.params
    const deletedTodo = await deleteTodoService({ _id: id })
    if (!deletedTodo.ok) return res.status(deletedTodo.status).json({ message: deletedTodo.msg })
    res.status(deletedTodo.status).json({ message: deletedTodo.msg, data: deletedTodo.data })
  }
  return {
    getTodos,
    addTodo,
    updateTodo,
    deltedTodo
  }
}
