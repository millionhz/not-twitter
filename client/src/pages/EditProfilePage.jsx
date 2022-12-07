import React, { useState, useContext, useEffect } from 'react';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { editProfile, getUserById } from '../api/backend';
import AuthContext from '../context/AuthContext';

function EditProfilePage() {
  const navigate = useNavigate();
  const {
    user: { userId },
  } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    getUserById(userId)
      .then(({ data }) => {
        setName(data.name);
        setBio(data.bio);
      })
      .catch(() => {
        navigate('/error');
      });
  }, [userId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile(name, bio).then(() => {
      navigate(`/user/${userId}`);
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        component="form"
        sx={{
          mt: '40%',
          height: 450,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            width: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            Username
          </Typography>
          <TextField
            autoComplete="off"
            hiddenLabel
            variant="filled"
            fullWidth
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: 600,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            Bio
          </Typography>
          <TextField
            autoComplete="off"
            hiddenLabel
            multiline
            rows={4}
            variant="filled"
            fullWidth
            name="bio"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 3,
            width: '8rem',
            height: '3rem',
            fontSize: 17,
          }}
        >
          UPDATE
        </Button>
      </Box>
    </Container>
  );
}

export default EditProfilePage;
