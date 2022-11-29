import React, { useEffect, useState } from 'react';
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
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import Card from '../components/Card';
import Compose from '../components/Compose';
import Comment from '../components/Comment';
import Avatar from '../components/Avatar';
import { addComment, getPostById, toggleLike } from '../api/backend';

function PostPage() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
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

  function handleLike() {
    toggleLike(postId);
    setPost((prevPost) => ({
      ...prevPost,
      isLiked: !prevPost.isLiked,
      likes: isLiked ? prevPost.likes - 1 : prevPost.likes + 1,
    }));
  }

  function handleSubmit(content) {
    addComment(postId, content).then(() => {
      navigate(0);
    });
  }

  const { content: postContent, name, likes, isLiked, comments } = post;
  console.log(comments);
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
            <CardHeader avatar={<Avatar name={name} />} title={name} />
            <CardContent>
              <Typography variant="body.1">{postContent}</Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleLike()}>
                {isLiked ? (
                  <Favorite color="secondary" />
                ) : (
                  <FavoriteBorder color="primary" />
                )}
              </IconButton>
              <p>
                {likes} {likes === 1 ? 'like' : 'likes'}
              </p>
            </CardActions>
          </Card>
          <Box sx={{ py: '5%' }}>
            <Compose
              placeholder="Enter comment here..."
              title="Post"
              onSubmit={(data) => handleSubmit(data)}
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
