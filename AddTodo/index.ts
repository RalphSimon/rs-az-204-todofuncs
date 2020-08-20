import { AzureFunction, Context, HttpRequest } from '@azure/functions'

import { createTodo, propCheck } from '../utils'
import { Todo } from '../types'

type RequestBody = {
	[key: string]: string
} & Pick<Todo, 'completed' | 'description' | 'userId'>

type FunctionResponse = {
	context: Context
	req: HttpRequest
}

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	context.log('HTTP trigger function processed a request.')

	if (req.body) {
		const { userId } = req.params
		const mayProceed = propCheck<RequestBody>(
			req.body,
			'description',
			'completed'
		)
		const newTodo: Todo = createTodo({
			userId,
			...(<RequestBody>req.body),
		})

		context.bindings.newTodo = newTodo

		context.res = {
			status: 201 /* Defaults to 200 */,
			body: JSON.stringify(newTodo, null, 4),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	} else {
		context.res = {
			status: 400,
			body: 'Could not save todo',
		}
	}
}

export default httpTrigger
