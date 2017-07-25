import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import { VNode } from '@dojo/interfaces/vdom';
import { spy, SinonSpy } from 'sinon';

import App from './../../src/App';
import Outside from './../../src/stages/Outside';

let helloWorldSpy: SinonSpy;
let helloWorldSetPropertiesSpy: SinonSpy;

registerSuite({
	name: 'App',
	beforeEach() {
		helloWorldSpy = spy(Outside);
		helloWorldSetPropertiesSpy = spy(Outside.prototype, 'setProperties');
	},

	afterEach() {
		helloWorldSetPropertiesSpy.restore();
	},

	render() {
		const app = new App();
		const vnode = <VNode> app.__render__();
		assert.equal(vnode.vnodeSelector, 'a-scene');
		assert.equal(helloWorldSetPropertiesSpy.getCall(0).args[0].stranger, true);
	}
});
