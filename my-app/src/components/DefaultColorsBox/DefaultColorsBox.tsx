import React from 'react';
import './DefaultColorsBox.css';

interface DefaultColorsBoxProps {
    isOpen: boolean,
    colorToHex: (r: number, g: number, b: number) => string,
    changeColor: (r: number, g: number, b: number) => void,
}

function DefaultColorsBox({isOpen, colorToHex, changeColor}: DefaultColorsBoxProps) {

    const defaultColors = [
        {name: 'red', r: 255, g: 0, b: 0},
        {name: 'yellow', r: 232, g: 181, b: 64},
        {name: 'green', r: 23, g: 164, b: 88},
        {name: 'blue', r: 24, g: 176, b: 235},
    ];

    return (
        <div
            // ref={defaultColorsBoxEl}
            className='default-colors-select-box select-box'
            style={{maxHeight: isOpen ? '300px' : 0, visibility: isOpen ? 'visible' : 'hidden'}}
        >
            {isOpen && (
                <ul style={{visibility: isOpen ? 'visible' : 'hidden'}} className='defaulr-colors-select-list'>
                    {defaultColors.map(item => (
                        <li key={item.name}>
                            <button
                                type='button'
                                className='defaulr-colors-select-button'
                                onClick={() => changeColor(item.r, item.g, item.b)}
                            >
                                <span>{item.name.toUpperCase()}</span>
                                <span className='color-box' style={{backgroundColor: colorToHex(item.r, item.g, item.b)}}></span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DefaultColorsBox;
