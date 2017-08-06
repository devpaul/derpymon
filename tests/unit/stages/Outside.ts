import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import { VNode } from '@dojo/interfaces/vdom';

import Outside from '../../../src/stages/Outside';
import { Monster } from '../../../src/commands/initialize/characters';

registerSuite({
	name: 'Outside',

	'render'() {
		const helloWorld = new Outside();

		const vnode = <VNode> helloWorld.__render__();
		assert.strictEqual(vnode.vnodeSelector, 'div');
		assert.equal(vnode.text, 'Hello, Dojo World!');
	},

	'render with stranger'() {
		const helloWorld = new Outside();
		helloWorld.__setProperties__({
			monster: Monster.CharDerp
		});

		const vnode = <VNode> helloWorld.__render__();
		assert.strictEqual(vnode.vnodeSelector, 'div');
		assert.equal(vnode.text, 'Hello, Dojo World!');
	}
});
