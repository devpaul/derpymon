import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Constructor, DNode, RegistryLabel } from '@dojo/widget-core/interfaces';
import { w } from '@dojo/widget-core/d';
import inject, { GetProperties } from './inject';

export type Container<T extends WidgetBase> = Constructor<WidgetBase<Partial<T['properties']>>>;

export function Container<W extends WidgetBase> (
	component: Constructor<W> | RegistryLabel,
	name: RegistryLabel | RegistryLabel[],
	{ getProperties }: { getProperties: GetProperties }
): Container<W> {
	@inject({ name, getProperties })
	class WidgetContainer extends WidgetBase<Partial<W['properties']>> {
		public __setProperties__(properties: Partial<W['properties']>): void {
			super.__setProperties__(properties as any);
			this.invalidate();
		}
		protected render(): DNode {
			return w(component, this.properties, this.children);
		}
	}
	return WidgetContainer;
}

export default Container;
