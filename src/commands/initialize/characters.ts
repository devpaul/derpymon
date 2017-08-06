import { registry } from '@dojo/widget-core/d';
import { BaseInjector, Context, Injector } from '@dojo/widget-core/Injector';

export const enum Monster {
	CharDerp = 'charDerp'
}

export function initialize() {
	const charDerp = {
		name: Monster.CharDerp,
		src: '#charderp-obj',
		mtl: '#charderp-mtl'
	};

	registry.define(Monster.CharDerp, Injector(BaseInjector, new Context(charDerp)));
}

export function characterMapper() {
	return {
		getProperties(context: any, properties: any): any {
			return context.get();
		}
	}
}
