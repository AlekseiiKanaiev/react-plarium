import React, { useState, useEffect, useRef } from 'react';
import './ColorPicker.css';
import DefaultColorsBox from '../DefaultColorsBox/DefaultColorsBox';
import DefaultColorsSelect from '../DefaultColorsSelect/DefaultColorsSelect';
import SliderColorSelect from '../SliderColorSelect/SliderColorSelect';
import SliderColorSelectBox from '../SliderColorSelectBox/SliderColorSelectBox';


function ColorPicker() {
    const colorToHex = (r: number, g: number, b: number): string => {
        const  componentToHex = (c: number): string => {
            const hex = c.toString(16).toUpperCase();
            return hex.length === 1 ? "0" + hex : hex;
        }
        return `#${[r, g, b].map(item => componentToHex(item)).join('')}`;
    };

    const [hexColor, setHexColor] = useState(colorToHex(255, 0, 0));
    const [rgbColor, setRGBColor] = useState({r: 255, g: 0, b: 0});
    const [isSliderBoxOpen, setIsSliderBoxOpen] = useState(false);
    const [isDefaultColorsBoxOpen, setIsDefaultColorsBoxOpen] = useState(false);
    const sliderBoxEl = useRef(null);

    useEffect(() => {
        const clickedOutSide = (event: MouseEvent) => {
            console.log(sliderBoxEl);
            if (sliderBoxEl.current !== event.target && isSliderBoxOpen) {
                console.log('close')
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
    }, [isSliderBoxOpen, isDefaultColorsBoxOpen])

    const changeColor = (r: number, g: number, b: number) => {
        setHexColor(colorToHex(r, g, b));
        setRGBColor(Object.assign(rgbColor, {r, g, b}));
    };

    // console.log(rgbColor);

    return (
        <div className='color-picker'>
            <div className='hex-color'>{hexColor}</div>
            <div className='vertical-devider'></div>
            <SliderColorSelect
                hexColor={hexColor}
                isSliderColorSelectOpen={isSliderBoxOpen}
                openSliderColorSelect={setIsSliderBoxOpen}
            />
            <div className='vertical-devider'></div>
            <DefaultColorsSelect
                isDefaultColorsOpen={isDefaultColorsBoxOpen}
                openDefaultColorsSelect={setIsDefaultColorsBoxOpen}
            />
            <SliderColorSelectBox ref={sliderBoxEl} isSliderColorSelectOpen={isSliderBoxOpen}/>
            {/* <div
                ref={sliderBoxEl}
                className='slider-color-select-box select-box'
                style={{height: isSliderBoxOpen ? '70px' : 0, visibility: isSliderBoxOpen ? 'visible' : 'hidden'}}
            >
            </div> */}
            <DefaultColorsBox isOpen={isDefaultColorsBoxOpen} colorToHex={colorToHex} changeColor={changeColor}/>
        </div>
    )
}

export default ColorPicker;
