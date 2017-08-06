import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Container } from '@dojo/widget-core/Container';
import ObjModel from '../framework/ObjModel';
import { characterMapper, Monster } from '../commands/initialize/characters';

export interface OutsideProperties extends WidgetProperties {
	monster: Monster;
}

export default class Outside extends WidgetBase<OutsideProperties> {
	protected render(): DNode {
		const { monster } = this.properties;
		const Derpymon = Container(ObjModel, monster, characterMapper());

		return v('a-entity', [
			v('a-plane', {
				color: '#258e26',
				height: '100',
				rotation: '-90 0 0',
				width: '100'
			}),
			v('a-sky', {
				color: '#859cff'
			}),
			w(Derpymon, {
				position: '2 -3 -10',
				scale: '0.5 0.5 0.5'
			})
		]);
	}
}
