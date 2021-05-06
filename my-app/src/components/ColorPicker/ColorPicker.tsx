import React, { memo, useState, useEffect, useRef } from 'react';
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

    const [value, setValue] = useState(colorToHex(255, 0, 0));
    const [rgbColor, setRGBColor] = useState({r: 255, g: 0, b: 0});
    const [savedRGBColor, setSavedColor] = useState({r: 255, g: 0, b: 0});
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
                closeSliderBox();
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

    const changeColor = (r: number, g: number, b: number): void => {
        setValue(colorToHex(r, g, b));
        setRGBColor({r, g, b});
    };

    const openSliderBox = (): void => {
        setSavedColor(Object.assign({}, rgbColor));
        setIsSliderBoxOpen(true);
    };

    const closeSliderBox = (): void => {
        setRGBColor(savedRGBColor);
        setIsSliderBoxOpen(false);
    };

    const applyColorChages = (): void => {
        const {r, g, b} = rgbColor;
        setValue(colorToHex(r, g, b));
        setIsSliderBoxOpen(false);
    };

    return (
        <div className='color-picker'>
            <div className='hex-color'>{value}</div>
            <div className='vertical-devider'></div>
            <SliderColorSelect
                color={colorToHex(rgbColor.r, rgbColor.g, rgbColor.b)}
                isSliderColorSelectOpen={isSliderBoxOpen}
                openSliderColorSelect={openSliderBox}
            />
            <div className='vertical-devider'></div>
            <DefaultColorsSelect
                isDefaultColorsOpen={isDefaultColorsBoxOpen}
                openDefaultColorsSelect={() => setIsDefaultColorsBoxOpen(true)}
            />
            <SliderColorSelectBox
                ref={sliderBoxEl}
                isSliderColorSelectOpen={isSliderBoxOpen}
                rgbColor={rgbColor}
                changeSingleColor={(newColor) => setRGBColor(Object.assign({}, rgbColor, newColor))}
                closeSliderBox={closeSliderBox}
                applyColorChages={applyColorChages}
            />
            <DefaultColorsBox
                isOpen={isDefaultColorsBoxOpen}
                colorToHex={colorToHex}
                changeColor={changeColor}
                curColor={rgbColor}
            />
        </div>
    )
}

export default memo(ColorPicker);
