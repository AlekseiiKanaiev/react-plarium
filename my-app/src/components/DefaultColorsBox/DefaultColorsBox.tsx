import React, { memo } from 'react';
import './DefaultColorsBox.css';
import rgbColor from '../../interfaceses/color';

interface DefaultColorsBoxProps {
    isOpen: boolean,
    colorToHex: (r: number, g: number, b: number) => string,
    changeColor: (r: number, g: number, b: number) => void,
    curColor: rgbColor,
}

interface DefaultColors {
    name: string,
    r: number,
    g: number,
    b: number,
}

function DefaultColorsBox({isOpen, colorToHex, changeColor, curColor}: DefaultColorsBoxProps) {

    const colors: DefaultColors[] = [
        {name: 'red', r: 255, g: 0, b: 0},
        {name: 'yellow', r: 232, g: 181, b: 64},
        {name: 'green', r: 23, g: 164, b: 88},
        {name: 'blue', r: 24, g: 176, b: 235},
    ];

    const isSelectedColor = (item: DefaultColors): boolean => {
        for (let [key, val] of Object.entries(curColor)) {
            if (item[key as keyof DefaultColors] !== val){
                return false;
            }
        }
        return true;
    }

    return (
        <div
            // ref={defaultColorsBoxEl}
            className='default-colors-select-box select-box'
            style={{maxHeight: isOpen ? '400px' : 0, visibility: isOpen ? 'visible' : 'hidden'}}
        >
            {isOpen && (
                <ul style={{visibility: isOpen ? 'visible' : 'hidden'}} className='defaulr-colors-select-list'>
                    {colors.map(item => (
                        <li key={item.name}>
                            <button
                                type='button'
                                className='defaulr-colors-select-button'
                                onClick={() => changeColor(item.r, item.g, item.b)}
                            >
                                <span>{item.name.toUpperCase()}</span>
                                <div style={{border: `3px solid ${isSelectedColor(item) ? '#9A9A9A' : 'transparent'}`}}>
                                    <span className='color-box' style={{backgroundColor: colorToHex(item.r, item.g, item.b)}}></span>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default memo(DefaultColorsBox);
