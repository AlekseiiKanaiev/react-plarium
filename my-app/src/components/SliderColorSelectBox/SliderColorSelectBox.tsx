import React, { memo } from 'react';
import './SliderColorSelectBox.css';
import color from '../../interfaceses/color';
import rgbColor from '../../interfaceses/color';

interface SliderColorSelectBoxProps {
    isSliderColorSelectOpen: boolean,
    rgbColor: rgbColor,
    changeSingleColor: (newColor: color) => void,
    closeSliderBox: () => void,
    applyColorChages: () => void,
}
const SliderColorSelectBox = React.forwardRef<HTMLDivElement, SliderColorSelectBoxProps>(
    ({isSliderColorSelectOpen, rgbColor, changeSingleColor, closeSliderBox, applyColorChages}: SliderColorSelectBoxProps, ref) => {

        const changeColorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            changeSingleColor({[event.target.id]: +event.target.value});
        };

        const getStartColor = (item: string): string => {
            const color = Object.assign({}, rgbColor, {[item]: 0});
            return `rgb(${color.r}, ${color.g}, ${color.b})`;
        };

        const getEndColor = (item: string): string => {
            const color = Object.assign({}, rgbColor, {[item]: 255});
            return `rgb(${color.r}, ${color.g}, ${color.b})`;
        };

        return (
            <div
                ref={ref}
                className='slider-color-select-box select-box'
                style={{maxHeight: isSliderColorSelectOpen ? '300px' : 0, visibility: isSliderColorSelectOpen ? 'visible' : 'hidden'}}
            >
                <div className='sliders'>
                    {Object.keys(rgbColor).map((item: string) => (
                        <div key={item} className="slidecontainer">
                            <span className="input-prefix">{item.toUpperCase()}</span>
                            <input
                                type="range"
                                className="slider"
                                id={item}
                                min="0"
                                max="255"
                                value={rgbColor[item as keyof rgbColor]}
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
                    <button className='ok-button' type='button' onClick={applyColorChages}>
                        OK
                    </button>
                </div>
            </div>
        )
    }
);

export default memo(SliderColorSelectBox);
