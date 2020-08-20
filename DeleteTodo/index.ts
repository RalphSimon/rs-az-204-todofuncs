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

	if (req.body.id) {
		const { id } = req.body
		const { userId } = req.params

		const { resource, statusCode } = await container
			.item(id, userId)
			.delete<Todo>()

		const msg = `Todo with ${id} has been deleted`

		context.res = {
			status: 200 /* Defaults to 200 */,
			body: JSON.stringify({
				statusCode,
				message: msg,
				resource,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	} else {
		context.res = {
			status: 400,
			body: `Error deleting todo: No item id provided`,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	}
}

export default httpTrigger
