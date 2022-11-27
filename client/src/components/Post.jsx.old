import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const dummyComments = [
  {
    commentedBy: 'Anonymous',
    comment: 'L post!',
  },
  {
    commentedBy: 'Anonymous2',
    comment: 'L post (2)',
  },
];

function Post({ post }) {
  const { post_id: postId, likes: numLikes, name: postedBy, content } = post;
  const [expanded, setExpanded] = useState(false);
  const [likeIconColor, setLikeIconColor] = useState('#000');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeColor = () => {
    setLikeIconColor('#0047ab');
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="post">
            R
          </Avatar>
        }
        title={postedBy}
        // subheader={date}
      />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      {/* <CardMedia
        component="img"
        height="200"
        width="300"
        image={mediaURL}
        alt="Post Media"
      /> */}
      <Typography>{numLikes} likes</Typography>
      <CardActions disableSpacing>
        <IconButton onClick={changeColor} aria-label="like post">
          <ThumbUpIcon style={{ color: { likeIconColor } }} />
        </IconButton>
        <IconButton onClick={handleOpen} aria-label="add comment">
          <AddCommentIcon />
        </IconButton>
        <Modal
          aria-labelledby="post"
          aria-describedby="a pop up of the post"
          open={open}
          onClose={handleClose}
          sx={{
            mx: 'auto',
            mt: '7rem',
            mb: '3rem',
            p: '2rem',
            maxWidth: '700px',
            bgcolor: blueGrey[50],
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              mx: 'auto',
              mt: '7rem',
              mb: '3rem',
              p: '2rem',
              maxWidth: '700px',
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="post">
                  R
                </Avatar>
              }
              title={postedBy}
              // subheader={date}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {content}
              </Typography>
            </CardContent>
            {/* <CardMedia
            component="img"
            height="200"
            width="300"
            // image={mediaURL}
            alt="Post Media"
          /> */}
            <Typography>{numLikes} likes</Typography>
            <Divider />
            <CardContent>
              {dummyComments.map((comments) => (
                <Typography variant="body1" color="text.secondary">
                  <b>{comments.commentedBy}:</b> {comments.comment}
                </Typography>
              ))}
            </CardContent>
          </Box>
        </Modal>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );

  // <Collapse in={expanded} timeout="auto" unmountOnExit>
  //   <CardContent>
  //     <Typography paragraph>
  //       Some textbox for adding comment may be opened here
  //     </Typography>
  //   </CardContent>
  // </Collapse>;
}

export default Post;
