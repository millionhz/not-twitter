import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box,
  CardHeader,
} from '@mui/material';
import { FavoriteBorder, Favorite, DeleteOutline } from '@mui/icons-material';
import Card from '../components/Card';
import Compose from '../components/Compose';
import Comment from '../components/Comment';
import Avatar from '../components/Avatar';
import AuthContext from '../context/AuthContext';
import {
  addComment,
  deletePost,
  getPostById,
  toggleLike,
} from '../api/backend';

function PostPage() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const {
    user: { userId: myUserId },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId)
      .then((data) => {
        setPost(data.data);
      })
      .catch(() => {
        navigate('/error');
      });
  }, [postId, navigate]);

  const {
    content: postContent,
    name,
    likes,
    isLiked,
    comments,
    user_id: userId,
  } = post;

  const handleLike = () => {
    toggleLike(postId);
    setPost((prevPost) => ({
      ...prevPost,
      isLiked: !prevPost.isLiked,
      likes: isLiked ? prevPost.likes - 1 : prevPost.likes + 1,
    }));
  };

  const handleSubmit = (content) => {
    addComment(postId, content).then(() => {
      navigate(0);
    });
  };

  const handleDelete = () => {
    deletePost(postId).then(() => {
      navigate('/');
    });
  };

  return (
    postContent && (
      <Container>
        <Box
          sx={{
            m: 'auto',
            mt: '5%',
            width: 600,
          }}
        >
          <Card>
            <CardHeader
              avatar={<Avatar name={name} />}
              title={name}
              onClick={() => {
                navigate(`/user/${userId}`);
              }}
            />
            <CardContent>
              <Typography variant="body.1">{postContent}</Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={handleLike}>
                {isLiked ? (
                  <Favorite color="secondary" />
                ) : (
                  <FavoriteBorder color="primary" />
                )}
              </IconButton>
              <p>
                {likes} {likes === 1 ? 'like' : 'likes'}
              </p>
              {myUserId === userId && (
                <IconButton onClick={handleDelete} color="primary">
                  <DeleteOutline />
                </IconButton>
              )}
            </CardActions>
          </Card>
          <Box sx={{ py: '5%' }}>
            <Compose
              placeholder="Enter comment here..."
              title="Post"
              onSubmit={handleSubmit}
            />
          </Box>
          <div>
            {comments.map(
              (
                { content: commentContent, comment_id: id, name: userName },
                idx
              ) => (
                <Comment
                  content={commentContent}
                  name={userName}
                  key={id}
                  sx={{
                    borderBottom: idx === comments.length - 1 ? undefined : 0,
                  }}
                />
              )
            )}
          </div>
        </Box>
      </Container>
    )
  );
}

export default PostPage;
