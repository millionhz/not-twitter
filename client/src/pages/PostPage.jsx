import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import Card from '../components/Card';
import Compose from '../components/Compose';
import Comment from '../components/Comment';
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

  return (
    postContent && (
      <div>
        <Card>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>R</Avatar>}
            title={name}
          />
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
        <Compose
          placeholder="Enter comment here..."
          onSubmit={(data) => handleSubmit(data)}
        />
        <div>
          {comments.map(({ content: commentContent, comment_id: id }) => (
            <Comment content={commentContent} key={id} />
          ))}
        </div>
      </div>
    )
  );
}

export default PostPage;
