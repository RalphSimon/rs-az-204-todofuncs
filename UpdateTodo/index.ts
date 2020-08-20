import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { CosmosClient } from '@azure/cosmos'

import { Todo } from '../types'

const connectionString = process.env.kibodatabase_DOCUMENTDB
const client = new CosmosClient(connectionString)
const container = client.database('kibo-data').container('todos')

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	context.log('HTTP trigger function processed a request.')

	try {
		const { userId } = req.params
		const { id, description, completed } = <Partial<Todo>>req.body

		if (id) {
			const { resource: oldTodo } = await container
				.item(id, userId)
				.read<Todo>()
			const update = {
				description: description ?? oldTodo.description,
				completed: completed ?? oldTodo.completed,
			}

			const { resource: updatedTodo } = await container
				.item(id, userId)
				.replace<Todo>({
					...oldTodo,
					...update,
				})

			context.res = {
				status: 200 /* Defaults to 200 */,
				body: updatedTodo,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		} else {
			context.res = {
				status: 400,
				body: `Unable to update todo by id: ${id} for user ${userId}`,
			}
		}
	} catch (error) {
		context.log('Error updating todo', error)
	}
}

export default httpTrigger
