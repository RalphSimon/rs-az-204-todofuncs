type PropCheckReturnType<T> = {
	[k in keyof T]?: boolean
}

export const propCheck = <T>(
	obj: T,
	...args: string[]
): PropCheckReturnType<T> => {
	if (obj) {
		return args.reduce<PropCheckReturnType<T>>((status, value) => {
			return {
				...status,
				[value]: obj.hasOwnProperty(value),
			}
		}, {})
	}
}
