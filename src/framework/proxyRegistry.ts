import Registry from '@dojo/widget-core/Registry';

export interface ProxyRegistry extends Registry {
	[ key: string ]: any | undefined;
}

export default function proxyRegistry(registry: Registry) {
	return new Proxy(registry, {
		get(target: Registry, prop: string, receiver) {
			if (target.hasInjector(prop)) {
				return target.getInjector(prop)!.get();
			}
			return Reflect.get(target, prop, receiver);
		}
	});
}
