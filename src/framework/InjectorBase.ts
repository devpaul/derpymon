import Injector from '@dojo/widget-core/Injector';

export class InjectorBase extends Injector {
	constructor() {
		super({});
	}

	get(): this {
		return this;
	}

	set() {
		throw new Error('not implemented');
	}

	protected emitInvalidate() {
		this.emit({type: 'invalidate'});
	}
}
