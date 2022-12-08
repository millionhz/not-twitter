import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/backend';

function UploadImagePage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    uploadImage(image).then(() => {
      navigate('/');
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const imageData = e.target.files[0];
    setImage(imageData);

    setImageUrl(URL.createObjectURL(imageData));
  };

  return (
    <Container component="main">
      <Box
        sx={{
          m: 'auto',
          mt: '30%',
          width: 600,
        }}
      >
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          onChange={handleChange}
        >
          <Box
            sx={{
              my: 3,
              fontSize: 18,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <label htmlFor="contained-button-file">
              <Typography>Show everyone what you're up to...</Typography>
            </label>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <label htmlFor="contained-button-file">
                <div>
                  <AddAPhotoIcon sx={{ mx: 1 }} />
                </div>
              </label>
              <input
                onChange={handleChange}
                accept="image/*"
                id="contained-button-file"
                type="file"
                name="image"
              />
            </Box>
          </Box>
          <Box id="image-container" sx={{ my: 5, p: 2 }}>
            {imageUrl && (
              <img
                src={imageUrl}
                id="output-image"
                width="100%"
                height="auto"
                alt="uploaded"
              />
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            UPLOAD
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default UploadImagePage;
