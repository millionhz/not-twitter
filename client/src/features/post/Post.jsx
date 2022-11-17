import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
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

function Post({ postedBy, date, numLikes, content, mediaURL }) {
  const [expanded, setExpanded] = useState(false);
  const [likeIconColor, setLikeIconColor] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeColor = () => {
    setLikeIconColor('#0047ab');
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="post">
            R
          </Avatar>
        }
        title={postedBy}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        width="300"
        image={mediaURL}
        alt="Post Media"
      />
      <Typography>{numLikes} likes</Typography>
      <CardActions disableSpacing>
        <IconButton onClick={changeColor} aria-label="like post">
          <ThumbUpIcon style={{ color: { likeIconColor } }} />
        </IconButton>
        <IconButton
          onClick={() => {
            console.log('Comment button clicked');
          }}
          aria-label="add comment"
        >
          <AddCommentIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Some textbox for adding comment may be opened here
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
