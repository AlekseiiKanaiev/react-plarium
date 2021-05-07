import React, { memo, useState, useEffect, useContext } from 'react';
import { ColorPickerContext } from '../../context/colorPicker/colorPicker.context';
import './SliderColorSelect.css';
import rgbColor from '../../interfaceses/rgbColor';
import { Hex } from '../../types/Hex.type' ;

const hexToRGB = (hex: string): rgbColor | null => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const rgbToHex = (rgbColor: rgbColor): string => {
    const  componentToHex = (c: number): string => {
        const hex = c.toString(16).toUpperCase();
        return hex.length === 1 ? "0" + hex : hex;
    }
    return `#${Object.values(rgbColor).map(item => componentToHex(item)).join('')}`;
};

interface SliderColorSelectBoxProps {
    isSliderColorSelectOpen: boolean,
    openSliderColorSelect: () => void,
    closeSliderBox: () => void,
};

const SliderColorSelectBox = React.forwardRef<HTMLDivElement, SliderColorSelectBoxProps>(
    ({isSliderColorSelectOpen, openSliderColorSelect, closeSliderBox}: SliderColorSelectBoxProps, ref) => {
        const {state, changeColor} = useContext(ColorPickerContext);

        const [isOpenSliderSelect, setIsOpen] = useState(false);
        const [rgbColor, setRGBColor] = useState(hexToRGB(state.color));


        useEffect(() => {
            setIsOpen(isSliderColorSelectOpen);
            setRGBColor(hexToRGB(state.color));
        }, [isSliderColorSelectOpen, state.color]);

        const changeColorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            setRGBColor({...(rgbColor as rgbColor), [event.target.id]: +event.target.value});
        };

        const getStartColor = (item: string): string => {
            const color = {...rgbColor, [item]: 0};
            return `rgb(${color.r}, ${color.g}, ${color.b})`;
        };

        const getEndColor = (item: string): string => {
            const color = {...rgbColor, [item]: 255};
            return `rgb(${color.r}, ${color.g}, ${color.b})`;
        };

        const applyColorChagesHandler = () => {
            changeColor(rgbToHex(rgbColor as rgbColor) as Hex);
            closeSliderBox();
        }

        return (
            <>
                <div className='slider-color-select'>
                    <button type='button' className='slider-color-select-button' onClick={openSliderColorSelect}>
                        <span className='color-box' style={{backgroundColor: rgbToHex(rgbColor as rgbColor)}}></span>
                    </button>
                    <div
                        className='box-arrow'
                        style={{visibility: isOpenSliderSelect ? 'visible' : 'hidden'}}
                    />
                </div>
                <div
                    ref={ref}
                    className='slider-color-select-box select-box'
                    style={{maxHeight: isOpenSliderSelect ? '400px' : 0, visibility: isOpenSliderSelect ? 'visible' : 'hidden'}}
                >
                    <div className='sliders'>
                        {Object.keys(rgbColor as rgbColor).map((item: string) => (
                            <div key={item} className="slidecontainer">
                                <span className="input-prefix">{item.toUpperCase()}</span>
                                <input
                                    type="range"
                                    className="slider"
                                    id={item}
                                    min="0"
                                    max="255"
                                    value={(rgbColor as rgbColor)[item as keyof rgbColor]}
                                    onChange={changeColorHandler}
                                    style={
                                        {background:
                                            `linear-gradient(0.25turn, ${getStartColor(item)} , ${getEndColor(item)})`}
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div className="button-block">
                        <button className='cancel-button' type='button' onClick={closeSliderBox}>
                            CANCEL
                        </button>
                        <button className='ok-button' type='button' onClick={applyColorChagesHandler}>
                            OK
                        </button>
                    </div>
                </div>
            </>
        )
    }
);

export default memo(SliderColorSelectBox);
