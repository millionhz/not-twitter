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

  const { name, is_following: isFollowing } = user;

  const followButton = (
    <Button
      // eslint-disable-next-line
      disabled={userId == currentUserId}
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
      disabled={userId == currentUserId}
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
              m: 'auto',
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
              <Typography variant="h5">{name}</Typography>
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
