import React from 'react';
import { ColorPickerState } from './context/colorPicker/colorPicker.state'
import ColorPicker from './components/ColorPicker/ColorPicker'
import './App.css';

function App() {
  return (
    <ColorPickerState>
      <div className="App">
        <div className="content">
          <ColorPicker />
        </div>
      </div>
    </ColorPickerState>

  );
}

export default App;
