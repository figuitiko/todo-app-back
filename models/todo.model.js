import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})
TodoSchema.plugin(mongoosePaginate)
export const TodoModel = model('TodoModel', TodoSchema)
