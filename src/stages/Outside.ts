import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Container } from '@dojo/widget-core/Container';
import ObjModel from '../framework/ObjModel';
import { MonsterName } from '../definitions/characters';
import genericMapper from '../framework/util/genericMapper';
import { ObjHeight } from '../definitions/heightComponent';

export interface OutsideProperties extends WidgetProperties {
	monster: MonsterName;
	monsterDistance?: number;
}

export default class Outside extends WidgetBase<OutsideProperties> {
	protected render(): DNode {
		const { monster, monsterDistance = 5 } = this.properties;
		const Derpymon = Container(ObjModel, monster, genericMapper());

		return v('a-entity', {
			environment: 'preset: forest'
		}, [
			w(Derpymon, {
				position: `0 0 -${ monsterDistance }`,
				[ObjHeight]: '2'
			})
		]);
	}
}
