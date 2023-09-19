import z from 'zod'

const todoSchemaValidation = z.object({
  name: z.string().min(3).max(50),
  isCompleted: z.boolean().default(false)
})

export const validatePartialTodo = (todo) => {
  return todoSchemaValidation.safeParse(todo)
}
