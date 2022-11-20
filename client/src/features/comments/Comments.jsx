import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blueGrey, red } from '@mui/material/colors';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { Divider } from '@mui/material';
import { Backdrop } from '@mui/material';


const dummyComments = [
  {
    commentedBy: 'Anonymous',
    comment: 'L post!'
  },
  {
    commentedBy: 'Anonymous2',
    comment: 'L post (2)'
  }
];


function Comments({ postedBy, date, numLikes, content, mediaURL }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
          Open Modal
      </Button>
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          sx={{ mx: 'auto', mt: '7rem', mb:'3rem', p:'2rem', maxWidth:'700px', bgcolor:blueGrey[50], zIndex:5000 }}
      >
        <div> 
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
          <Divider/>
          <CardContent>
            {dummyComments.map((comments) => (
              <Typography variant="body2" color="text.secondary">
                <b>{comments.commentedBy}:</b> {comments.comment}
              </Typography>
            ))}
          </CardContent>
        </div>
      </Modal>
    </Card>
  );
}

export default Comments;