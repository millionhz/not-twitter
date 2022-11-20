import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utilities/localStorage';

function NewComment() {
  const MAX_LENGTH = 256;
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleComments = (event) => {
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
      .post('/comment', { postId: 5, content })
      .then(() => {
        // comment successfully inserted into database
        alert('Comment Posted!');
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
          m: 'auto',
          mt: '40%',
          width: '800px',
        }}
      >
        <Box component="form" onSubmit={handleComments} sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            error={content.length >= MAX_LENGTH}
            id="commenttext"
            name="comment content"
            helperText={errorMessage}
            value={content}
            inputProps={{ maxLength: MAX_LENGTH }}
            multiline
            minRows="5"
            placeholder="Your comment ..."
            onChange={(event) => setContent(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            POST COMMENT
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NewComment;
