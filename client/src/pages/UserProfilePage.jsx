import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostByUserId, getUserById, followUser } from '../api/backend';
import PostList from '../components/PostList';
import Avatar from '../components/Avatar';
import AuthContext from '../context/AuthContext';

function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const {
    user: { userId: currentUserId },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getUserById(userId)
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => {
        navigate('/error');
      });
  }, [userId, navigate]);

  useEffect(() => {
    getPostByUserId(userId).then((data) => {
      setPosts(data.data);
    });
  }, [userId]);

  const handleFollow = () => {
    followUser(userId);
    setUser((prev) => ({ ...prev, is_following: !prev.is_following }));
  };

  const { name, is_following: isFollowing, bio } = user;

  const followButton = (
    <Button
      // eslint-disable-next-line
      disabled={userId == currentUserId || !name}
      onClick={handleFollow}
      variant="contained"
      type="submit"
      sx={{
        mt: 3,
        mb: 3,
        width: '8rem',
        height: '3rem',
        fontSize: 17,
      }}
    >
      FOLLOW
    </Button>
  );

  const followingButton = (
    <Button
      // eslint-disable-next-line
      disabled={userId == currentUserId || !name}
      onClick={handleFollow}
      variant="outlined"
      type="submit"
      sx={{
        mt: 3,
        mb: 3,
        width: '8rem',
        height: '3rem',
        fontSize: 17,
      }}
    >
      FOLLOWING
    </Button>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ p: 3, width: '100vw', backgroundColor: '#efefef' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: '15%',
              p: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Avatar
                name={name}
                sx={{ width: 100, height: 100, fontSize: 30 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: 3,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ pt: 3 }}>
                  {name}
                </Typography>
                <Typography variant="body1" sx={{ pt: 3 }}>
                  {bio}
                </Typography>
              </Box>
              {isFollowing ? followingButton : followButton}
            </Box>
          </Box>
        </Box>
      </Box>
      <Container>
        <Box
          sx={{
            m: 'auto',
            mt: '5%',
            width: 600,
          }}
        >
          <PostList posts={posts} />
        </Box>
      </Container>
    </Box>
  );
}

export default UserProfilePage;
