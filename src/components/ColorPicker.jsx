import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, setColor }) => {
  return (
    <div className="color-picker">
      <h3>Choose Background Color</h3>
      <SketchPicker color={color} onChangeComplete={(newColor) => setColor(newColor.hex)} />
    </div>
  );
}

export default ColorPicker;
