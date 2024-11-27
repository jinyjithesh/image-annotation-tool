import React, { useState } from 'react';

const TextEditor = ({ text, setText }) => {
  const [fontSize, setFontSize] = useState(16); // Initial font size


  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };


  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(8, prevSize - 2)); 
  };
  const deleteText = () => {
    setText('');
  };
  return (
    <div className="text-editor" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h3>Add Text</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ fontSize: `${fontSize}px`, padding: '5px', marginBottom: '10px' }}
      /><button onClick={deleteText}>Delete</button>  
      <div>
        {/* <button onClick={increaseFontSize} style={{ marginRight: '10px' }}>
     +
        </button>
        <button onClick={decreaseFontSize}>-</button> */}
        
      </div>
    </div>
  );
};

export default TextEditor;
