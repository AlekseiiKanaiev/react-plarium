import React, { memo, useState, useEffect, useRef } from 'react';
import './ColorPicker.css';
import DefaultColorsBox from '../DefaultColorsBox/DefaultColorsBox';
import DefaultColorsSelect from '../DefaultColorsSelect/DefaultColorsSelect';
import SliderColorSelect from '../SliderColorSelect/SliderColorSelect';
import SliderColorSelectBox from '../SliderColorSelectBox/SliderColorSelectBox';
import color from '../../interfaceses/color';

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
        const isChildOfSliderBox = (target: HTMLElement): boolean => {
            return target.offsetParent === sliderBoxEl.current;
        }
        const clickedOutSide = (event: MouseEvent): void => {
            if (sliderBoxEl.current !== event.target && !isChildOfSliderBox(event.target as HTMLElement) && isSliderBoxOpen) {
                console.log('close slider');
                setRGBColor(savedRGBColor);
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

    const changeColor = (r: number, g: number, b: number): void => {
        setValue(colorToHex(r, g, b));
        setRGBColor(Object.assign(rgbColor, {r, g, b}));
    };

    const openSliderBox = (): void => {
        setSavedColor(Object.assign({}, rgbColor));
        setIsSliderBoxOpen(true);
    };

    const changeSingleColor = (newColor: color): void => {
        setRGBColor(Object.assign({}, rgbColor, newColor));
    };

    const cancelClickHandler = (): void => {
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
                openSliderColorSelect={() => openSliderBox()}
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
                changeSingleColor={changeSingleColor}
                closeSliderBox={() => cancelClickHandler()}
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
