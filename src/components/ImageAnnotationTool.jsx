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
      width: 200, 
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
// import React, { useState } from 'react';
// import { Stage, Layer, Image as KonvaImage, Text, Rect, Circle, Transformer } from 'react-konva';

// import useImage from "../hooks/useImage"; 
// const Annotation = ({ shapeProps, onSelect, onChange, onDelete }) => {
//   const shapeRef = React.useRef();
//   const transformerRef = React.useRef();

//   React.useEffect(() => {
//     if (shapeProps.isSelected && transformerRef.current) {
//       transformerRef.current.nodes([shapeRef.current]);
//       transformerRef.current.getLayer().batchDraw();
//     }
//   }, [shapeProps.isSelected]);

//   return (
//     <>
//       {shapeProps.type === 'text' && (
//         <Text
//           ref={shapeRef}
//           {...shapeProps}
//           draggable
//           onClick={onSelect}
//           onTap={onSelect}
//           onDragEnd={(e) => {
//             onChange({
//               ...shapeProps,
//               x: e.target.x(),
//               y: e.target.y(),
//             });
//           }}
//           onTransformEnd={(e) => {
//             const node = shapeRef.current;
//             onChange({
//               ...shapeProps,
//               x: node.x(),
//               y: node.y(),
//               scaleX: node.scaleX(),
//               scaleY: node.scaleY(),
//               rotation: node.rotation(),
//             });
//           }}
//           onDblClick={onDelete}
//         />
//       )}
//       {shapeProps.type === 'rect' && (
//         <Rect
//           ref={shapeRef}
//           {...shapeProps}
//           draggable
//           onClick={onSelect}
//           onTap={onSelect}
//           onDragEnd={(e) => {
//             onChange({
//               ...shapeProps,
//               x: e.target.x(),
//               y: e.target.y(),
//             });
//           }}
//           onTransformEnd={(e) => {
//             const node = shapeRef.current;
//             onChange({
//               ...shapeProps,
//               width: node.width() * node.scaleX(),
//               height: node.height() * node.scaleY(),
//               scaleX: 1,
//               scaleY: 1,
//             });
//           }}
//           onDblClick={onDelete}
//         />
//       )}
//       {shapeProps.type === 'circle' && (
//         <Circle
//           ref={shapeRef}
//           {...shapeProps}
//           draggable
//           onClick={onSelect}
//           onTap={onSelect}
//           onDragEnd={(e) => {
//             onChange({
//               ...shapeProps,
//               x: e.target.x(),
//               y: e.target.y(),
//             });
//           }}
//           onTransformEnd={(e) => {
//             const node = shapeRef.current;
//             onChange({
//               ...shapeProps,
//               radius: node.radius() * node.scaleX(),
//               scaleX: 1,
//               scaleY: 1,
//             });
//           }}
//           onDblClick={onDelete}
//         />
//       )}
//       {shapeProps.isSelected && <Transformer ref={transformerRef} />}
//     </>
//   );
// };

// const ImageAnnotationTool = () => {
//   const [image, setImage] = useState(null);
//   const [annotations, setAnnotations] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [loadedImage] = useImage(image);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => setImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const addAnnotation = (type) => {
//     const newAnnotation = {
//       id: annotations.length + 1,
//       type,
//       x: 100,
//       y: 100,
//       width: 100,
//       height: 100,
//       radius: 50,
//       text: type === 'text' ? 'Sample Text' : '',
//       fontSize: 20,
//       isSelected: false,
//     };
//     setAnnotations([...annotations, newAnnotation]);
//   };

//   const updateAnnotation = (id, newProps) => {
//     setAnnotations(
//       annotations.map((ann) => (ann.id === id ? { ...ann, ...newProps } : ann))
//     );
//   };

//   const deleteAnnotation = (id) => {
//     setAnnotations(annotations.filter((ann) => ann.id !== id));
//   };

//   const increaseSize = () => {
//     setAnnotations(
//       annotations.map((ann) =>
//         ann.id === selectedId
//           ? {
//               ...ann,
//               width: ann.width + 20,
//               height: ann.height + 20,
//               radius: ann.radius + 10,
//               fontSize: ann.fontSize + 5,
//             }
//           : ann
//       )
//     );
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageUpload} accept="image/*" />
//       <button onClick={() => addAnnotation('text')}>Add Text</button>
//       <button onClick={() => addAnnotation('rect')}>Add Rectangle</button>
//       <button onClick={() => addAnnotation('circle')}>Add Circle</button>
//       <button onClick={increaseSize} disabled={!selectedId}>
//         Increase Size
//       </button>

//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight}
//         onMouseDown={(e) => {
//           if (e.target === e.target.getStage()) {
//             setSelectedId(null);
//           }
//         }}
//       >
//         <Layer>
//           {image && <KonvaImage image={loadedImage} />}
//           {annotations.map((ann) => (
//             <Annotation
//               key={ann.id}
//               shapeProps={{ ...ann, isSelected: ann.id === selectedId }}
//               onSelect={() => setSelectedId(ann.id)}
//               onChange={(newProps) => updateAnnotation(ann.id, newProps)}
//               onDelete={() => deleteAnnotation(ann.id)}
//             />
//           ))}
//         </Layer>
//       </Stage>
//     </div>
//   );
// };

// export default ImageAnnotationTool;
// import React, { useState, useRef } from 'react';
// import { Stage, Layer, Image as KonvaImage, Text, Rect, Circle, Transformer } from 'react-konva';
// import useImage from "../hooks/useImage"; 

// const Annotation = ({ shapeProps, onSelect, onChange, onDelete }) => {
//   const shapeRef = useRef();
//   const transformerRef = useRef();

//   React.useEffect(() => {
//     if (shapeProps.isSelected) {
//       transformerRef.current.nodes([shapeRef.current]);
//       transformerRef.current.getLayer().batchDraw();
//     }
//   }, [shapeProps.isSelected]);

//   return (
//     <>
//       {shapeProps.type === 'text' && (
//         <Text
//           ref={shapeRef}
//           {...shapeProps}
//           draggable
//           text={shapeProps.text} // Prevent typing but still display text
//           onClick={onSelect}
//           onDragEnd={(e) => {
//             onChange({
//               ...shapeProps,
//               x: e.target.x(),
//               y: e.target.y(),
//             });
//           }}
//           onTransformEnd={(e) => {
//             const node = shapeRef.current;
//             onChange({
//               ...shapeProps,
//               scaleX: node.scaleX(),
//               scaleY: node.scaleY(),
//               rotation: node.rotation(),
//             });
//           }}
//           onDblClick={onDelete}
//         />
//       )}

//       {shapeProps.type === 'rect' && (
//         <Rect
//           ref={shapeRef}
//           {...shapeProps}
//           draggable
//           onClick={onSelect}
//           onDragEnd={(e) => {
//             onChange({
//               ...shapeProps,
//               x: e.target.x(),
//               y: e.target.y(),
//             });
//           }}
//           onTransformEnd={(e) => {
//             const node = shapeRef.current;
//             onChange({
//               ...shapeProps,
//               width: node.width() * node.scaleX(),
//               height: node.height() * node.scaleY(),
//               scaleX: 1,
//               scaleY: 1,
//             });
//           }}
//           onDblClick={onDelete}
//         />
//       )}

//       {shapeProps.type === 'circle' && (
//         <Circle
//           ref={shapeRef}
//           {...shapeProps}
//           draggable
//           onClick={onSelect}
//           onDragEnd={(e) => {
//             onChange({
//               ...shapeProps,
//               x: e.target.x(),
//               y: e.target.y(),
//             });
//           }}
//           onTransformEnd={(e) => {
//             const node = shapeRef.current;
//             onChange({
//               ...shapeProps,
//               radius: node.radius() * node.scaleX(),
//               scaleX: 1,
//               scaleY: 1,
//             });
//           }}
//           onDblClick={onDelete}
//         />
//       )}

//       {shapeProps.isSelected && <Transformer ref={transformerRef} />}
//     </>
//   );
// };

// const ImageAnnotationTool = () => {
//   const [image, setImage] = useState(null);
//   const [annotations, setAnnotations] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [loadedImage] = useImage(image);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => setImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const addAnnotation = (type) => {
//     const newAnnotation = {
//       id: annotations.length + 1,
//       type,
//       x: 150,
//       y: 150,
//       width: 100,
//       height: 100,
//       radius: 50,
//       text: type === 'text' ? 'Sample Text' : '',
//       fontSize: 20,
//       isSelected: false,
//     };
//     setAnnotations([...annotations, newAnnotation]);
//   };

//   const updateAnnotation = (id, newProps) => {
//     setAnnotations(
//       annotations.map((ann) => (ann.id === id ? { ...ann, ...newProps } : ann))
//     );
//   };

//   const deleteAnnotation = (id) => {
//     setAnnotations(annotations.filter((ann) => ann.id !== id));
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageUpload} accept="image/*" />
//       <button onClick={() => addAnnotation('text')}>Add Text</button>
//       <button onClick={() => addAnnotation('rect')}>Add Rectangle</button>
//       <button onClick={() => addAnnotation('circle')}>Add Circle</button>

//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight}
//         onMouseDown={(e) => {
//           if (e.target === e.target.getStage()) {
//             setSelectedId(null);
//           }
//         }}
//       >
//         <Layer>
//           {loadedImage && <KonvaImage image={loadedImage} />}
//           {annotations.map((ann) => (
//             <Annotation
//               key={ann.id}
//               shapeProps={{ ...ann, isSelected: ann.id === selectedId }}
//               onSelect={() => setSelectedId(ann.id)}
//               onChange={(newProps) => updateAnnotation(ann.id, newProps)}
//               onDelete={() => deleteAnnotation(ann.id)}
//             />
//           ))}
//         </Layer>
//       </Stage>
//     </div>
//   );
// };

// export default ImageAnnotationTool;
