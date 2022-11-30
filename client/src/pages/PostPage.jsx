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
  Alert,
  Collapse,
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  DeleteOutline,
  ReportGmailerrorred,
  Close,
} from '@mui/icons-material';
import Card from '../components/Card';
import Compose from '../components/Compose';
import Comment from '../components/Comment';
import Avatar from '../components/Avatar';
import AuthContext from '../context/AuthContext';
import {
  addComment,
  deletePost,
  reportPost,
  getPostById,
  toggleLike,
} from '../api/backend';

function PostPage() {
  const [post, setPost] = useState({});
  const [reportAlert, setReportAlert] = useState(false);
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
    image_path: imagePath,
  } = post;

  console.log(imagePath);

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

  const handleReport = () => {
    reportPost(postId).then(() => {
      setReportAlert(true);
    });
  };

  return (
    name && (
      <Container>
        <Box
          sx={{
            m: 'auto',
            mt: '5%',
            width: 600,
          }}
        >
          <Card>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <CardHeader
                sx={{ flex: 1 }}
                avatar={<Avatar name={name} />}
                title={name}
                onClick={() => {
                  navigate(`/user/${userId}`);
                }}
              />
              <IconButton
                aria-label="report-button"
                onClick={handleReport}
                sx={{ width: 50, height: 50 }}
              >
                <ReportGmailerrorred />
              </IconButton>
            </Box>
            <CardContent>
              {imagePath && (
                <img
                  src={`\\${imagePath.split(`\\`)[1]}`}
                  alt="post"
                  height="300"
                />
              )}
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
          <Collapse in={reportAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setReportAlert(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Post successfully reported!
            </Alert>
          </Collapse>

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
