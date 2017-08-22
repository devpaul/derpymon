import { registry } from '@dojo/widget-core/d';
import { BaseInjector, Context, Injector } from '@dojo/widget-core/Injector';
import { Asset } from '../framework/Assets';

export const enum MonsterName {
	CharDerp = 'charderp',
	Robot = 'robot'
}

export const monsters: ReadonlyArray<MonsterName> = Object.freeze([ MonsterName.CharDerp, MonsterName.Robot ]);

export function initialize() {
	const assets: Asset[] = [];

	for (let monster of monsters) {
		const obj = `${ monster }-obj`;
		const mtl = `${ monster }-mtl`;

		const definition = {
			name: monster,
			src: `#${ obj }`,
			mtl: `#${ mtl }`
		};

		registry.define(monster, Injector(BaseInjector, new Context(definition)));
		assets.push({ id: obj, src: `assets/characters/${ monster }.obj`});
		assets.push({ id: mtl, src: `assets/characters/${ monster }.mtl`});
	}

	registry.define('assets', Injector(BaseInjector, new Context({ assets })));
}

