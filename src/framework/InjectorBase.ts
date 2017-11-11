import Injector from '@dojo/widget-core/Injector';

export class InjectorBase extends Injector {
	constructor() {
		super({});
	}

	emitInvalidate() {
		this.emit({type: 'invalidate'});
	}

	get(): this {
		return this;
	}

	set() {
		throw new Error('not implemented');
	}
}
