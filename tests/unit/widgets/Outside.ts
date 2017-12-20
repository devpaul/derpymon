import { stub } from 'sinon';
import harness, { Harness } from '@dojo/test-extras/harness';
import { v, w } from '@dojo/widget-core/d';
import Outside, { OutsideProperties } from '../../../src/widgets/Outside';
import ObjModel from '../../../src/widgets/ObjModel';
import { Environment } from '../../../src/context/OutsideContext';

const { registerSuite } = intern.getInterface('object');

let widget: Harness<Outside>;

function expectedRender(properties: OutsideProperties) {
	const {
		derpyball,
		environment,
		monster
	} = properties;

	const objHeight = 'objheight';

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
		derpyball ? v('a-sphere', {
			'static-body': 'shape: sphere',
			oncomponentchanged: widget.listener,
			position: derpyball.position.join(' ')
		}) : null,
		monster ? w(ObjModel, {
			mtl: monster.mtl,
			src: monster.obj,
			position: `0 0 -${ monster.distance }`,
			'static-body': 'shape: box',
			[ objHeight ]: `${ monster.height }`
		}) : null
	];
}

registerSuite('Outside', {
	beforeEach() {
		widget = harness(Outside);
	},

	tests: {
		render() {
			const props = {
				environment: Environment.Forest,
				removeDerpyball: stub()
			};

			widget.setProperties(props);
			widget.expectRender(expectedRender(props));
		}
	}
});
