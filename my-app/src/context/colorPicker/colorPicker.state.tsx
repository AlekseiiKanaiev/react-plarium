import React, {useReducer} from 'react';
import { ColorPickerContext } from './colorPicker.context';
import { colorPickerReducer } from './colorPicker.reducer';
import { CHANGE_COLOR } from './colorPicker.constants';
import { Hex } from '../../types/Hex.type';
import IColorPickerState from '../../interfaceses/colorPickerState';

export const ColorPickerState = (props: any) => {
    const initialState: IColorPickerState = {
        color: '#E0222E'
    };

    const [state, dispatch] = useReducer(colorPickerReducer, initialState);

    const changeColor = (color: Hex) => {
        dispatch({type: CHANGE_COLOR, payload: {color}});
    };

    return (
        <ColorPickerContext.Provider value={{changeColor, state}}>
            {props.children}
        </ColorPickerContext.Provider>
    );
}
