import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/backend';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function CreatePostPage() {
  const MAX_LENGTH = 256;
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Show Error message when input limit exceeded
    if (content.length >= MAX_LENGTH) {
      setErrorMessage(
        'The input has exceeded the maximum number of characters'
      );
    }
  }, [content]);

  useEffect(() => {
    // Remove error message when input size is back in limit. Only set errorMessage to empty if it doesnt already exist
    if (content.length < MAX_LENGTH && errorMessage) {
      setErrorMessage('');
    }
  }, [content, errorMessage]);

  function handleSubmit() {
    createPost(content).then(() => {
      navigate('/');
    });
  }

  function handleUploadClick() {
    var image = document.getElementById('output-image');
    var container = document.getElementById('image-container');
	  image.src = URL.createObjectURL(event.target.files[0]);
    container.style.border = 'solid';
    container.style.borderWidth = '0.1rem';
  };

  return (
    <Container component="main">
      <Box
        sx={{
          m: 'auto',
          mt: '15%',
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
        >
          <TextField
            fullWidth
            required
            error={content.length >= MAX_LENGTH}
            helperText={errorMessage}
            value={content}
            inputProps={{ maxLength: MAX_LENGTH }}
            placeholder="What's on your mind..."
            onChange={(event) => setContent(event.target.value)}
            autoComplete="off"
          />
          <Box fullwidth sx={{
            my:3,
            fontSize:18,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
          }}>
            <label htmlFor="contained-button-file"><typography >Show everyone what you're up to...</typography></label>
            <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'space-between' }}>
              {/* <label htmlFor="contained-button-file">
                <div component="span">
                  <AddPhotoAlternateIcon sx={{mx:1}}/>
                </div>
              </label> */}
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event)=>{handleUploadClick()}}
                sx={{display:'none', visibility:'hidden'}}
              />
            </Box>
          </Box>
          <Box id='image-container' sx={{ my:5, p:2 }}>
            <img id="output-image" width="100%" height="auto" />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            POST
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreatePostPage;