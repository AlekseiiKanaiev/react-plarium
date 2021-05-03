import React from 'react';
import './SliderColorSelect.css';

interface SliderColorSelectProps {
    hexColor: string,
    isSliderColorSelectOpen: boolean,
    openSliderColorSelect: (b: boolean) => void,
}

function SliderColorSelect({hexColor, isSliderColorSelectOpen, openSliderColorSelect}: SliderColorSelectProps){
    return (
        <div className='slider-color-select'>
            <button type='button' className='slider-color-select-button' onClick={() => openSliderColorSelect(true)}>
                <span className='color-box' style={{backgroundColor: hexColor}}></span>
            </button>
            <div
                className='box-arrow'
                style={{visibility: isSliderColorSelectOpen ? 'visible' : 'hidden'}}
            />
        </div>
    )
}

export default SliderColorSelect
