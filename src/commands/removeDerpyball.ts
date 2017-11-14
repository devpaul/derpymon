import { Action } from '../framework/Executor';
import OutsideContext from '../context/OutsideContext';

export type RemoveDerpyballAction = Action<undefined, OutsideContext>;

export default function removeDerpyball({ state: outside }: RemoveDerpyballAction) {
	outside.removeBall();
}
