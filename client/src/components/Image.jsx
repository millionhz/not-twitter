import React, { useEffect, useState } from 'react';
import { getImage } from '../api/backend';

function Image({ imageId }) {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (imageId) {
      getImage(imageId).then(({ data: { data: bytes } }) => {
        const blob = new Blob([new Int8Array(bytes).buffer], {
          type: 'image/jpeg',
        });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      });
    }
  }, [imageId]);

  return imageUrl && <img src={imageUrl} alt="post" width={500} />;
}

export default Image;
