import WeakMap from '@dojo/shim/WeakMap';
import { RegistryLabel } from '@dojo/widget-core/interfaces';
import beforeProperties from '@dojo/widget-core/decorators/beforeProperties';
import Injector from '@dojo/widget-core/Injector';
import handleDecorator from '@dojo/widget-core/decorators/handleDecorator';
import RegistryHandler from '@dojo/widget-core/RegistryHandler';

/**
 * Map of instances against registered injectors.
 */
const registeredInjectorsMap: WeakMap<InjectionTarget, Injector[]> = new WeakMap();

/**
 * Defines the contract requires for the get properties function
 * used to map the injected properties.
 */
export interface GetProperties<T = any> {
	(payload: any, properties: T): T;
}

/**
 * Defines the inject configuration required for use of the `inject` decorator
 */
export interface InjectConfig {

	/**
	 * The label of the registry injector
	 */
	name: RegistryLabel | RegistryLabel[];

	/**
	 * Function that returns propertues to inject using the passed properties
	 * and the injected payload.
	 */
	getProperties: GetProperties;
}

export interface InjectionTarget {
	invalidate(): void;
	registry: RegistryHandler;
}

function registerInjector(target: InjectionTarget, injector: Injector) {
	const registeredInjectors = registeredInjectorsMap.get(target) || [];
	if (registeredInjectors.length === 0) {
		registeredInjectorsMap.set(target, registeredInjectors);
	}
	if (registeredInjectors.indexOf(injector) === -1) {
		injector.on('invalidate', () => {
			target.invalidate();
		});
		registeredInjectors.push(injector);
	}
}

/**
 * Decorator retrieves an injector from an available registry using the name and
 * calls the `getProperties` function with the payload from the injector
 * and current properties with the the injected properties returned.
 *
 * @param InjectConfig the inject configuration
 */
export default function inject({ name, getProperties }: InjectConfig) {
	return handleDecorator((target) => {
		beforeProperties(function(this: InjectionTarget, properties: any) {
			if (Array.isArray(name)) {
				const payload = [];
				for (let injectorName of name) {
					const injector = this.registry.getInjector(injectorName);
					if (injector) {
						registerInjector(this, injector);
					}
					payload.push(injector && injector.get());
				}
				return getProperties(payload, properties);
			}
			else {
				const injector = this.registry.getInjector(name);
				if (injector) {
					registerInjector(this, injector);
				}
				return getProperties(injector && injector.get(), properties);
			}
		})(target);
	});
}
