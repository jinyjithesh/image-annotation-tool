import React, { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage,Textbox, Rect, Circle } from 'fabric';


const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); 

  useEffect(() => {
    const fabricCanvas = new Canvas(canvasRef.current, {
      height: 500,
      width: 900,
      backgroundColor: '#f3f3f3',
    });
    setCanvas(fabricCanvas);
    return () => fabricCanvas.dispose(); 
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => {
        const dataUrl = f.target.result;
        setImageSrc(dataUrl); 

        FabricImage.fromURL(dataUrl, (img) => {
          img.set({
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
            selectable: true,
          });
          canvas.add(img);
          canvas.renderAll();
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const addText = () => {
    const text = new Textbox('Enter text', {
      left: 100,
      top: 100,
      fontSize: 20,
      editable: true,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addRectangle = () => {
    const rect = new Rect({
      left: 150,
      top: 150,
      width: 100,
      height: 50,
      fill: 'rgba(0,0,255,0.5)',
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
  };

  const addCircle = () => {
    const circle = new Circle({
      left: 200,
      top: 200,
      radius: 50,
      fill: 'rgba(255,0,0,0.5)',
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
  };

  const deleteSelected = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  const clearCanvas = () => {
    canvas.clear();
  };
  const addimage = () => {

  }
 
    return (
    <div>
      <div style={{ margin: '10px 10px', padding:'10px' }}>
        <button onClick={addText} style={{ margin: '10px 10px', }}>Add Text</button>
        <button onClick={addRectangle} style={{ margin: '10px 10px', }}>Add Rectangle</button>
        <button onClick={addCircle} style={{ margin: '10px 10px', }}>Add Circle</button>
        <button onClick={deleteSelected} style={{ margin: '10px 10px', }}>Delete Selected</button>
        <button onClick={clearCanvas} style={{ margin: '10px 10px', }}>Clear Canvas</button>
        <input type="file" onChange={handleImageUpload} />
      </div>
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc', marginTop: '10px' }} ></canvas>
      {/* Image Preview */}
      {imageSrc && (
        <div style={{ marginTop: '20px' }}>
          <h2>Uploaded Image Preview:</h2>
          <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )} 
    </div>
  );
};

export default ImageEditor;

