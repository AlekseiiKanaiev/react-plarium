import React, { memo } from 'react';
import './SliderColorSelect.css';

interface SliderColorSelectProps {
    color: string,
    isSliderColorSelectOpen: boolean,
    openSliderColorSelect: () => void,
}

function SliderColorSelect({color, isSliderColorSelectOpen, openSliderColorSelect}: SliderColorSelectProps){
    return (
        <div className='slider-color-select'>
            <button type='button' className='slider-color-select-button' onClick={openSliderColorSelect}>
                <span className='color-box' style={{backgroundColor: color}}></span>
            </button>
            <div
                className='box-arrow'
                style={{visibility: isSliderColorSelectOpen ? 'visible' : 'hidden'}}
            />
        </div>
    )
}

export default memo(SliderColorSelect);
