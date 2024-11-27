import React, { useState, useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Rect, Circle, Text } from "react-konva";
import useImage from "../hooks/useImage"; 

const ImageAnnotationTool = () => {
  const [annotations, setAnnotations] = useState([]);
  const [selectedTool, setSelectedTool] = useState("text");
  const [uploadedImage, setUploadedImage] = useState(null);
  const stageRef = useRef(null);

 
  const [image] = useImage(uploadedImage || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    if (!uploadedImage) return;
    const { x, y } = e.target.getStage().getPointerPosition();
    const newAnnotation = {
      x,
      y,
      type: selectedTool,
      id: annotations.length + 1,
      width: 100, 
      height: 50, 
      radius: 30,
    };
    setAnnotations([...annotations, newAnnotation]);
  };

  const handleResize = (id, newAttrs) => {
    setAnnotations((prevAnnotations) =>
      prevAnnotations.map((annot) =>
        annot.id === id ? { ...annot, ...newAttrs } : annot
      )
    );
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <select onChange={(e) => setSelectedTool(e.target.value)}>
        <option value="text">Text</option>
        <option value="rect">Rectangle</option>
        <option value="circle">Circle</option>
      </select>

      <Stage
        width={image ? image.width : 800}
        height={image ? image.height : 600}
        ref={stageRef}
        onMouseDown={handleMouseDown}
      >
        <Layer>
          {image && <KonvaImage image={image} />}
          {annotations.map((annot) => {
            switch (annot.type) {
              case "rect":
                return (
                  <Rect
                    key={annot.id}
                    x={annot.x}
                    y={annot.y}
                    width={annot.width}
                    height={annot.height}
                    fill="transparent"
                    stroke="red"
                    draggable
                    onDragEnd={(e) => {
                      handleResize(annot.id, { x: e.target.x(), y: e.target.y() });
                    }}
                    onTransformEnd={() => {
                      const newWidth = Math.max(5, annot.width * annot.scaleX());
                      const newHeight = Math.max(5, annot.height * annot.scaleY());
                      handleResize(annot.id, { width: newWidth, height: newHeight });
                    }}
                  />
                );
              case "circle":
                return (
                  <Circle
                    key={annot.id}
                    x={annot.x}
                    y={annot.y}
                    radius={annot.radius}
                    fill="transparent"
                    stroke="blue"
                    draggable
                    onDragEnd={(e) => {
                      handleResize(annot.id, { x: e.target.x(), y: e.target.y() });
                    }}
                    onTransformEnd={() => {
                      const newRadius = Math.max(5, annot.radius * annot.scaleX());
                      handleResize(annot.id, { radius: newRadius });
                    }}
                  />
                );
              case "text":
                return (
                  <Text
                    key={annot.id}
                    x={annot.x}
                    y={annot.y}
                    text="Annotation"
                    fontSize={20}
                    fill="black"
                    draggable
                    onDragEnd={(e) => {
                      handleResize(annot.id, { x: e.target.x(), y: e.target.y() });
                    }}
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageAnnotationTool;
