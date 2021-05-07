import React, { memo } from 'react';
import './DefaultColorsSelect.css';
import { Hex } from '../../types/Hex.type' ;

interface DefaultColorsBoxProps {
    isOpen: boolean,
    openDefaultColorsSelect: () => void,
    changeColor: (color: Hex) => void,
    curColor: string,
}

interface DefaultColor {
    name: string,
    color: string,
}

function DefaultColorsSelect({isOpen, openDefaultColorsSelect, changeColor, curColor}: DefaultColorsBoxProps) {

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
                                    onClick={() => changeColor(item.color as Hex)}
                                >
                                    <span>{item.name.toUpperCase()}</span>
                                    <div style={{border: `3px solid ${item.color === curColor ? '#9A9A9A' : 'transparent'}`}}>
                                        <span className='color-box' style={{backgroundColor: item.color}}></span>
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
