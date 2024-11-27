import { useState, useEffect } from "react";

const useImage = (src) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!src) {
      setImage(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous"; // Optional, if needed for cross-origin images
    img.src = src;

    img.onload = () => setImage(img);
    img.onerror = () => setImage(null);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return [image];
};

export default useImage;
