import React, { memo } from 'react';
import './DefaultColorsSelect.css';

interface DefaultColorsBoxProps {
    isDefaultColorsOpen: boolean,
    openDefaultColorsSelect: () => void,
}

function DefaultColorsSelect({isDefaultColorsOpen, openDefaultColorsSelect}: DefaultColorsBoxProps) {
    return (
        <div className='default-color-select'>
            <button
                type='button'
                className='default-color-select-button'
                onClick={openDefaultColorsSelect}
            >
                {isDefaultColorsOpen ? (
                    <div className='arrow-up button-arrow'/>
                ) : (
                    <div className='arrow-down button-arrow' />
                )}

            </button>
            <div
                className='box-arrow'
                style={{visibility: isDefaultColorsOpen ? 'visible' : 'hidden'}}
            />
        </div>
    )
}

export default memo(DefaultColorsSelect);
