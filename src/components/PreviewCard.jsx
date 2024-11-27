import React from 'react';

const PreviewCard = ({ handleTextChange,text, image, bgColor, setText, fontSize, setFontSize }) => {
  const cardStyle = {
    backgroundColor: bgColor,
    padding: '20px',
    width: '600px',
    height: '800px',
    position: 'relative',
    textAlign: 'center',
    border: '1px solid black',
  };

  const textStyle = {
    fontSize: `${fontSize}px`,
    margin: '20px 0',
  };

  // Handlers to increase/decrease font size
  const increaseFontSize = () => setFontSize((prevSize) => prevSize + 2);
  const decreaseFontSize = () => setFontSize((prevSize) => Math.max(8, prevSize - 2)); 

  return (
    <div className="preview-card" style={cardStyle}>
   <h2 style={textStyle}>{text}</h2>
      {image && <img src={image} alt="Card" style={{ width: '100%', height: 'auto' }} />}
      
      <div>
        <button onClick={increaseFontSize} style={{ marginRight: '10px' }}>Text Size +</button>
        <button onClick={decreaseFontSize}>Text Size -</button>
      </div>
    </div>
  );
};

export default PreviewCard;
