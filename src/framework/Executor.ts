import Registry from '@dojo/widget-core/Registry';
import { RegistryLabel } from '@dojo/widget-core/interfaces';
import { InjectorBase } from './InjectorBase';
import Injector from '@dojo/widget-core/Injector';

export interface Command<T extends Action = Action> {
	(action: T): void;
}

export interface Action<T = any, U = any> {
	type: string;
	payload: T;
	state: U;
}

interface CommandMapping {
	handler: Command;
	state?: RegistryLabel | RegistryLabel[];
}

export interface CommandDescriptor extends CommandMapping {
	type: string
}

declare type InjectorState = Injector | Array<Injector | null> | null;

export default class Executor extends InjectorBase {
	readonly registry: Registry;

	private _commands: Map<string, CommandMapping> = new Map();

	constructor(registry: Registry, commands?: CommandDescriptor[]) {
		super();
		this.registry = registry;

		if (commands) {
			for (let command of commands) {
				this._setCommand(command.type, command.handler, command.state);
			}
		}
	}

	get actions() {
		return Array.from(this._commands.keys());
	}

	execute(type: string, payload?: any) {
		if (this._commands.has(type)) {
			const {
				handler,
				state
			} = this._commands.get(type)!;

			const injectors = this._getInjectors(state);

			console.log(`action: ${ type }`);
			try {
				handler({
					type,
					payload,
					state: injectors
				});
			}
			catch (e) {
				console.error(`[Executor]: action ${ type } failed.`, e);
			}
			console.log(`completed ${ type }`);

			this._invalidate(injectors);
		}
		else {
			console.warn(`[Executor]: missing action for ${ type }`);
		}
	}

	register(name: string, handler: Command, state?: RegistryLabel | RegistryLabel[]) {
		if (this._commands.has(name)) {
			throw new Error(`Command "${ name }" already registered`);
		}

		this._setCommand(name, handler, state);
		this.emitInvalidate();
	}

	private _getInjectors(labels?: RegistryLabel | RegistryLabel[]): InjectorState {
		if (!labels) {
			return null;
		}
		else if (Array.isArray(labels)) {
			return labels.map((label) => {
				return this.registry.getInjector(label);
			});
		}
		else {
			return this.registry.getInjector(labels);
		}
	}

	private _invalidate(injectors: InjectorState) {
		if (injectors) {
			if (Array.isArray(injectors)) {
				for (let injector of injectors) {
					injector && injector.emit({ type: 'invalidate' });
				}
			}
			else {
				injectors.emit({ type: 'invalidate' });
			}
		}
	}

	private _setCommand(name: string, handler: Command, state?: RegistryLabel | RegistryLabel[]) {
		this._commands.set(name, {
			handler,
			state: Array.isArray(state) ? Array.from(state) : state
		});
	}
}
