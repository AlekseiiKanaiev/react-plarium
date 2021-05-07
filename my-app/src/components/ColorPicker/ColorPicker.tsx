import React, { memo, useState, useEffect, useRef } from 'react';
import './ColorPicker.css';
import DefaultColorsSelect from '../DefaultColorsSelect/DefaultColorsSelect';
import SliderColorSelect from '../SliderColorSelect/SliderColorSelect';
import { Hex } from '../../types/Hex.type' ;

function ColorPicker() {
    const [value, setValue] = useState('#E0222E');
    const [isSliderBoxOpen, setIsSliderBoxOpen] = useState(false);
    const [isDefaultColorsBoxOpen, setIsDefaultColorsBoxOpen] = useState(false);
    const sliderBoxEl = useRef(null);

    useEffect(() => {
        const clickedOutSide = (event: MouseEvent): void => {
            if (
                event.target !== sliderBoxEl.current &&
                (event.target as HTMLElement).offsetParent !== sliderBoxEl.current &&
                isSliderBoxOpen
            ) {
                setIsSliderBoxOpen(false);
            }
            if (isDefaultColorsBoxOpen) {
                setIsDefaultColorsBoxOpen(false);
            }
        };
        document.addEventListener('click', clickedOutSide);
        return () => {
            document.removeEventListener('click',clickedOutSide);
        }
    }, [isSliderBoxOpen, isDefaultColorsBoxOpen]);

    const changeColor = (color: Hex): void => {
        ((/^#?[0-9A-Fa-f]{6}/g).test(color)) ? setValue(color) : alert('Not hex format');
    };

    return (
        <div className='color-picker'>
            <div className='hex-color'>{value}</div>
            <div className='vertical-devider'></div>
            <SliderColorSelect
                ref={sliderBoxEl}
                isSliderColorSelectOpen={isSliderBoxOpen}
                color={value}
                openSliderColorSelect={() => setIsSliderBoxOpen(true)}
                closeSliderBox={() => setIsSliderBoxOpen(false)}
                changeColor={changeColor}
            />
            <div className='vertical-devider'></div>
            <DefaultColorsSelect
                isOpen={isDefaultColorsBoxOpen}
                openDefaultColorsSelect={() => setIsDefaultColorsBoxOpen(true)}
                changeColor={changeColor}
                curColor={value}
            />
        </div>
    )
}

export default memo(ColorPicker);
