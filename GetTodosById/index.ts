import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Todo } from '../types'

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest,
	todo: Todo
): Promise<void> {
	context.log('HTTP trigger function processed a request.')

	try {
		if (!todo) {
			context.res = {
				status: 404,
				body: 'The todo could not be retrieved',
			}
		} else {
			context.res = {
				status: 200,
				body: todo,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		}
	} catch (error) {
		context.log('Error fetching todo by id', error)
	}
}

export default httpTrigger
