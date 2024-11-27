import React, { useState } from 'react';
import TextEditor from './TextEditor';
import ImageEditor from './ImageEditor';
import ColorPicker from './ColorPicker';
import PreviewCard from './PreviewCard';
import ImageAnnotationTool from './ImageAnnotationTool';
import DraggableTextCard from './DraggableTextCard';

const CardEditor = ({text,setText,handleTextChange}) => {

  const [cardText, setCardText] = useState("Enter text");
  const [image, setImage] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(16);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  return (
    <div className="card-editor">
     
      <div className="controls">
        <TextEditor text={cardText} setText={setCardText} />
        {/* <DraggableTextCard  text={text} setText={setText}/> */}
        <ImageEditor setImage={setImage} />
        {/* <ImageAnnotationTool/> */}
        <ColorPicker color={bgColor} setColor={setBgColor} />
      </div>
      <PreviewCard  handleTextChange={handleTextChange} text={cardText} setText={setCardText} image={image} bgColor={bgColor}  fontSize={fontSize} setFontSize={setFontSize}  />
    </div>
  );
}

export default CardEditor;