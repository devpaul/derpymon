import { InjectorBase } from '../framework/InjectorBase';

/**
 * Application Asset used for loading models, video, and images by A-Frame's <a-asset>
 */
export interface Asset {
	id: string;
	src: string;
}

export default class AppContext extends InjectorBase {
	private _assets: Map<string, Asset> = new Map();

	/**
	 * @return a list of all active assets
	 */
	get assets(): Asset[] {
		return Array.from(this._assets.values());
	}

	/**
	 * Adds an asset
	 */
	addAsset(id: string, src: string) {
		if (!this._assets.has(id)) {
			this._assets.set(id, {
				id,
				src
			});
			this.emitInvalidate();
		}
	}

	/**
	 * Adds an Obj model asset
	 */
	addObjMtlAssets(name: string, objSrc: string, mtlSrc?: string) {
		this.addAsset(`${ name }-obj`, objSrc);
		mtlSrc && this.addAsset(`${ name }-mtl`, mtlSrc);
	}

	getObjMtlAssets(name: string): { mtl?: Asset, obj?: Asset } {
		return {
			mtl: this._assets.get(`${ name }-mtl`),
			obj: this._assets.get(`${ name }-obj`)
		}
	}
}
