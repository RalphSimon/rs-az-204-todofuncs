import { nanoid } from 'nanoid'
import { Todo } from '../types'

type CreateTodoProps = Pick<Todo, 'completed' | 'description' | 'userId'>

export const createTodo = ({
	userId,
	completed,
	description,
}: CreateTodoProps): Todo => ({
	userId,
	completed,
	description,
	created: new Date().toISOString(),
	id: nanoid(),
})
