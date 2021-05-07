import React, { memo, useState, useEffect, useRef, useContext } from 'react';
import { ColorPickerContext } from '../../context/colorPicker/colorPicker.context';
import './ColorPicker.css';
import DefaultColorsSelect from '../DefaultColorsSelect/DefaultColorsSelect';
import SliderColorSelect from '../SliderColorSelect/SliderColorSelect';

function ColorPicker() {
    const [value, setValue] = useState('#FF0000');
    const [isSliderBoxOpen, setIsSliderBoxOpen] = useState(false);
    const [isDefaultColorsBoxOpen, setIsDefaultColorsBoxOpen] = useState(false);
    const sliderBoxEl = useRef(null);

    const {state} = useContext(ColorPickerContext);

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

    useEffect(() => {
        setValue(state.color)
    }, [state])

    return (
        <div className='color-picker'>
            <div className='hex-color'>{value}</div>
            <div className='vertical-devider'></div>
            <SliderColorSelect
                ref={sliderBoxEl}
                isSliderColorSelectOpen={isSliderBoxOpen}
                openSliderColorSelect={() => setIsSliderBoxOpen(true)}
                closeSliderBox={() => setIsSliderBoxOpen(false)}
            />
            <div className='vertical-devider'></div>
            <DefaultColorsSelect
                isOpen={isDefaultColorsBoxOpen}
                openDefaultColorsSelect={() => setIsDefaultColorsBoxOpen(true)}
            />
        </div>
    )
}

export default memo(ColorPicker);
