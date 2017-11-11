import { v, w } from '@dojo/widget-core/d';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import ObjModel from './ObjModel';
import { objHeight } from '../components/heightComponent';

export interface Monster {
	name: string;
	distance: number;
	height: number;
	mtl: string;
	obj: string;
}

export interface OutsideProperties extends WidgetProperties {
	environment: string;
	monster?: Monster;
}

export default class Outside extends WidgetBase<OutsideProperties> {
	protected render() {
		const {
			environment,
			monster
		} = this.properties;

		return [
			v('a-entity', {
				environment: `preset: ${ environment }`,
				'static-body': ''
			}),
			monster ? w(ObjModel, {
				mtl: monster.mtl,
				src: monster.obj,
				position: `0 0 -${ monster.distance }`,
				'static-body': 'shape: box',
				[objHeight]: `${ monster.height }`
			}) : null
		];
	}
}
