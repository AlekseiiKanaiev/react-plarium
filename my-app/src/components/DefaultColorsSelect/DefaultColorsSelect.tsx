import React, { memo, useContext } from 'react';
import { ColorPickerContext } from '../../context/colorPicker/colorPicker.context';
import './DefaultColorsSelect.css';
import { Hex } from '../../types/Hex.type' ;

interface DefaultColorsBoxProps {
    isOpen: boolean,
    openDefaultColorsSelect: () => void,
}

interface DefaultColor {
    name: string,
    color: Hex,
}

function DefaultColorsSelect({isOpen, openDefaultColorsSelect}: DefaultColorsBoxProps) {
    const {state, changeColor} = useContext(ColorPickerContext);
    const colors: DefaultColor[] = [
        {name: 'red', color: '#E0222E'},
        {name: 'yellow', color: '#E8B540'},
        {name: 'green', color: '#17A458'},
        {name: 'blue', color: '#1DAFEA'},
    ];

    return (
        <>
            <div className='default-color-select'>
                <button
                    type='button'
                    className='default-color-select-button'
                    onClick={openDefaultColorsSelect}
                >
                    <div className={`${isOpen ? 'arrow-up' : 'arrow-down'} button-arrow`}/>
                </button>
                <div
                    className='box-arrow'
                    style={{visibility: isOpen ? 'visible' : 'hidden'}}
                />
            </div>
            <div
                className='default-colors-select-box select-box'
                style={{maxHeight: isOpen ? '400px' : 0}}
            >
                {isOpen && (
                    <ul  className='defaulr-colors-select-list'>
                        {colors.map(item => (
                            <li key={item.name}>
                                <button
                                    type='button'
                                    className='defaulr-colors-select-button'
                                    onClick={() => changeColor(item.color as Hex)}
                                >
                                    <span>{item.name.toUpperCase()}</span>
                                    <div style={{border: `3px solid ${item.color === state.color ? '#9A9A9A' : 'transparent'}`}}>
                                        <span className='color-box' style={{backgroundColor: item.color as string}}></span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default memo(DefaultColorsSelect);
