import { registry } from '@dojo/widget-core/d';
import { BaseInjector, Injector } from '@dojo/widget-core/Injector';

export const enum Monster {
	CharDerp = 'charDerp'
}

export function initialize() {
	const charDerp = {
		name: Monster.CharDerp,
		src: '#charderp-obj',
		mtl: '#charderp-mtl'
	};

	registry.define(Monster.CharDerp, Injector(BaseInjector, charDerp));
}
