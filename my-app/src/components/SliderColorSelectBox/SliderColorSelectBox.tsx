import React from 'react';
import './SliderColorSelectBox.css';

interface SliderColorSelectBoxProps {
    isSliderColorSelectOpen: boolean,
    // openSliderColorSelect: (b: boolean) => void,
}
const SliderColorSelectBox = React.forwardRef<HTMLDivElement, SliderColorSelectBoxProps>(
    ({isSliderColorSelectOpen}: SliderColorSelectBoxProps, ref) => {
        return (
            <div
                ref={ref}
                className='slider-color-select-box select-box'
                style={{height: isSliderColorSelectOpen ? '70px' : 0, visibility: isSliderColorSelectOpen ? 'visible' : 'hidden'}}
            >
            </div>
        )
    }
);

export default SliderColorSelectBox
