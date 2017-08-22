export default function genericMapper<T = any>() {
	return {
		getProperties(context: any): T {
			return context.get();
		}
	}
}
