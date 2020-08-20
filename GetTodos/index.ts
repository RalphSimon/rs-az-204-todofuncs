import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Todo } from '../types'

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest,
	allTodosByUser: Todo[]
): Promise<void> {
	context.log('HTTP trigger function processed a request.')
	// const mayProceed = req.params.userId && allTodosByUser.length > 0

	if (req.params.userId) {
		context.res = {
			status: 200 /* Defaults to 200 */,
			body: allTodosByUser,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	} else {
		context.res = {
			body: 'The todos for this user could not be found',
			status: 400,
		}
	}
}

export default httpTrigger
