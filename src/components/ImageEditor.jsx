import React from 'react';
import { useDropzone } from 'react-dropzone';

const ImageEditor = ({ setImage }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);  
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  });

  return (
    <div className="image-editor">
      <h3>Upload an Image</h3>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop an image, or click to select one</p>
      </div>
    </div>
  );
}

export default ImageEditor;
