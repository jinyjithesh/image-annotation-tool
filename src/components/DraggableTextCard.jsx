import React, { useState } from 'react';
import { useRef } from 'react';

const DraggableTextCard = () => {
  const [text, setText] = useState('Editable Text');
  const [fontSize, setFontSize] = useState(16);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const textRef = useRef(null);

  // Function to handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Function to increase font size
  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  // Function to decrease font size
  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(8, prevSize - 2)); // Prevent text from becoming too small
  };

  // Handle dragging logic
  const handleMouseDown = (e) => {
    const offsetX = e.clientX - position.left;
    const offsetY = e.clientY - position.top;

    const onMouseMove = (moveEvent) => {
      setPosition({
        left: moveEvent.clientX - offsetX,
        top: moveEvent.clientY - offsetY,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Function to delete text
  const deleteText = () => {
    setText('');
  };

  return (
    <div className="text-editor" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h3>Add Text</h3>
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          fontSize: `${fontSize}px`,
          cursor: 'move',
        }}
        onMouseDown={handleMouseDown}
      >
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          style={{ fontSize: `${fontSize}px`, border: 'none', background: 'transparent' }}
        />
      </div>
      <button onClick={increaseFontSize}>+</button>Size text
      <button onClick={decreaseFontSize}>-</button>
      <button onClick={deleteText}>Delete</button>    
    </div>
  );
};

export default DraggableTextCard;
