import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import { VNode } from '@dojo/interfaces/vdom';

import Arena from '../../../src/stages/Outside';

registerSuite({
	name: 'Arena',

	'render'() {
		const helloWorld = new Arena();

		const vnode = <VNode> helloWorld.__render__();
		assert.strictEqual(vnode.vnodeSelector, 'div');
		assert.equal(vnode.text, 'Hello, Dojo World!');
	},
	'render with stranger'() {
		const helloWorld = new Arena();
		helloWorld.__setProperties__({
		});

		const vnode = <VNode> helloWorld.__render__();
		assert.strictEqual(vnode.vnodeSelector, 'div');
		assert.equal(vnode.text, 'Hello, Dojo World!');
	}
});
