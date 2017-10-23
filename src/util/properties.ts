import { GetProperties } from '@dojo/widget-core/decorators/inject';

/**
 * Filter properties from the injected data into a subset of properties
 * @param whitelist list of property names
 * @return a getProperties function for the injector
 */
export function filteredProps<T = any>(whitelist: string[]): GetProperties<T> {
	return (properties: any) => {
		const props: any = {};
		for (let item of whitelist) {
			props[item] = properties[item];
		}
		return props;
	}
}

/**
 * @param props properties passed to be cloned
 * @return a cloned set of enumerable properties
 */
export function cloneProps<T = any>(props: T) {
	return Object.assign({}, props);
}

/**
 * Used as a fail-safe for a required property
 */
export function throws(message: string = 'Missing a required property'): never {
	throw new Error(message);
}
