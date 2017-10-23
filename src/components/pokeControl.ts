import { Handle } from '@dojo/interfaces/core';
import { createHandle } from '@dojo/core/lang';
import { EventHandler } from '@dojo/widget-core/interfaces';
const AFrame = require('aframe');

export const componentName = 'poke-control';

export default function register() {
	AFrame.registerComponent(componentName, {
		eventHandles: [] as Handle[],

		init() {
		},

		play() {
			const el = this.el;
			const events: { [key: string ]: EventHandler } = {
				'trackpadup': (event: Event) => {
					this.onButtonUp(event);
				},
				'trackpaddown': (event: Event) => {
					this.onButtonDown(event);
				}
			};

			for (let eventName in events) {
				const handler = events[eventName];
				el.addEventListener(eventName, handler);
				this.eventHandles.push(createHandle(() => {
					el.removeEventListener(eventName, handler);
				}));
			}
		},

		pause() {
			while (this.eventHandles.length) {
				const handle = this.eventHandles.pop();
				handle.destroy();
			}
		}
	});
}
