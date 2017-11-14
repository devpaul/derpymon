import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import ObjModel from './ObjModel';
import { objHeight } from '../components/heightComponent';
import { Throw } from '../context/OutsideContext';

export interface Monster {
	name: string;
	distance: number;
	height: number;
	mtl: string;
	obj: string;
}

export interface OutsideProperties extends WidgetProperties {
	derpyball?: Throw;
	environment: string;
	monster?: Monster;

	removeDerpyball(): void;
}

export default class Outside extends WidgetBase<OutsideProperties> {
	protected render() {
		return [
			... this.renderEnvironment(),
			this.renderDerpyball(),
			this.renderMonster()
		];
	}

	private onComponentChanged(event: any) {
		if (event.detail.name === 'position') {
			const position = event.detail.target.getAttribute('position');
			console.log(position);
			if (position.y < -1) {
				this.properties.removeDerpyball();
			}
		}
	}

	private renderDerpyball() {
		const {
			derpyball
		} = this.properties;

		return derpyball ? v('a-sphere', {
			'static-body': 'shape: sphere',
			oncomponentchanged: this.onComponentChanged,
			position: derpyball.position.join(' ')
		}) : null;
	}

	private renderEnvironment(): DNode[] {
		const {
			environment
		} = this.properties;

		return [
			v('a-entity', {
				environment: `preset: ${ environment }`,
				'static-body': ''
			}),
			v('a-box', {
				'class': '.ground',
				depth: '30',
				height: '0.1',
				'static-body': 'shape: auto',
				visible: 'false',
				width: '30'
			}),
		]
	}

	private renderMonster() {
		const {
			monster
		} = this.properties;

		return monster ? w(ObjModel, {
			mtl: monster.mtl,
			src: monster.obj,
			position: `0 0 -${ monster.distance }`,
			'static-body': 'shape: box',
			[objHeight]: `${ monster.height }`
		}) : null
	}
}
