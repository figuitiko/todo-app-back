import { TodoModel } from '../models/todo.model.js'
import { MsgTypes, messageFactory } from '../util/messages.util.js'

export const todoServices = () => {
  const getAllTodosService = async ({ page, limit }) => {
    try {
      // const todos = await TodoModel.find({}).skip(skip).limit(limit)
      const todos = await TodoModel.paginate({}, { page, limit })
      if (!todos) {
        return messageFactory.createMessage(MsgTypes.ERROR, { status: 404, msg: MsgTypes.NOT_FOUND })
      }
      return messageFactory.createMessage(MsgTypes.SUCCESS, { status: 200, msg: MsgTypes.SUCCESS, data: todos })
    } catch (error) {
      return messageFactory.createMessage(MsgTypes.ERROR, { status: 500, msg: MsgTypes.SERVER_ERROR })
    }
  }
  const addTodoService = async (todo) => {
    try {
      const newTodo = await TodoModel.create(todo)
      if (!newTodo) {
        return messageFactory.createMessage(MsgTypes.ERROR, { status: 400, msg: MsgTypes.BAD_REQUEST })
      }
      return messageFactory.createMessage(MsgTypes.SUCCESS, { status: 201, msg: MsgTypes.SUCCESS, data: newTodo })
    } catch (error) {
      return messageFactory.createMessage(MsgTypes.ERROR, { status: 500, msg: MsgTypes.SERVER_ERROR })
    }
  }
  const updateTodoService = async ({ id, input }) => {
    try {
      const updatedTodo = await TodoModel.findByIdAndUpdate(id, input, { new: true })
      if (!updatedTodo) {
        return messageFactory.createMessage(MsgTypes.ERROR, { status: 400, msg: MsgTypes.BAD_REQUEST })
      }
      return messageFactory.createMessage(MsgTypes.SUCCESS, { status: 200, msg: MsgTypes.SUCCESS, data: updatedTodo })
    } catch (error) {
      return messageFactory.createMessage(MsgTypes.ERROR, { status: 500, msg: MsgTypes.SERVER_ERROR })
    }
  }
  const deleteTodoService = async (todo) => {
    const { _id } = todo
    try {
      const deltedTodo = await TodoModel.findByIdAndDelete(_id)
      if (!deltedTodo) {
        return messageFactory.createMessage(MsgTypes.ERROR, { status: 400, msg: MsgTypes.BAD_REQUEST })
      }
      return messageFactory.createMessage(MsgTypes.SUCCESS, { status: 200, msg: MsgTypes.SUCCESS, data: deltedTodo })
    } catch (error) {
      return messageFactory.createMessage(MsgTypes.ERROR, { status: 500, msg: MsgTypes.SERVER_ERROR })
    }
  }
  return {
    getAllTodosService,
    addTodoService,
    updateTodoService,
    deleteTodoService
  }
}
