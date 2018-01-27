/**
 * Used as a fail-safe for a required property
 */
export function throws(message: string = 'Missing a required property'): never {
	throw new Error(message);
}
