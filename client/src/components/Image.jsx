import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
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

  return (
    imageUrl && (
      <Box sx={{ textAlign: 'center' }}>
        <img src={imageUrl} alt="post" width={500} />
      </Box>
    )
  );
}

export default Image;
