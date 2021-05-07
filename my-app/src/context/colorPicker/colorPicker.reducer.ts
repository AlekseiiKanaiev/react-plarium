import { CHANGE_COLOR } from './colorPicker.constants';
import ColorPickerState from '../../interfaceses/colorPickerState';

interface Action {
    type: string
    payload?: ColorPickerState
}

export const colorPickerReducer = (state: ColorPickerState, action: Action) => {
    switch(action.type){
        case CHANGE_COLOR:
            return ({...state, ...action.payload});
        default:
            return state;
    }
}
