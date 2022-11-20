import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { createPost } from '../../api/backend';
import { getToken } from '../../utilities/localStorage';

function CreatePostPage() {
  const MAX_LENGTH = 256;
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePost = (event) => {
    event.preventDefault();
    console.log('here');
    console.log(content);

    const axiosInstance = axios.create({
      baseURL: '/api',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    axiosInstance
      .post('/post', { postContent: content })
      .then(() => {
        // post successfully inserted into database
        alert('Posted!');
        navigate('/home');
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        console.log(message);
      });
  };

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

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handlePost} sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            error={content.length >= MAX_LENGTH}
            id="posttext"
            name="post content"
            helperText={errorMessage}
            value={content}
            inputProps={{ maxLength: MAX_LENGTH }}
            multiline
            minRows="5"
            placeholder="Enter post text here .."
            onChange={(event) => setContent(event.target.value)}
          />
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
