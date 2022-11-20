import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PostAddIcon from '@mui/icons-material/PostAdd';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { getPosts } from '../../api/backend';
import { getToken } from '../../utilities/localStorage';
// import SideBar from '../sidebar/SideBar';
import Post from '../post/Post';

const drawerWidth = 240;
const sideBarNav = [
  {
    route: '/home',
    icon: <HomeIcon sx={{ margin: 1 }} />,
    label: 'Home',
  },
  {
    route: '/myprofile',
    icon: <PersonIcon sx={{ margin: 1 }} />,
    label: 'My Profile',
  },
];

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', options);

const dummyPosts = [
  {
    postID: 1,
    postedBy: 'Humaira',
    date: formattedDate,
    numLikes: 20,
    numComments: 15,
    content: 'Hello There! This is dummy caption on my post!',
    // media: '../../assets/dostiyan-logo.png',
  },
  {
    postID: 2,
    postedBy: 'Someone else',
    date: formattedDate,
    numLikes: 30,
    content: 'Hello There! This is dummy caption on my post!',
    // media: '',
  },
];

function HomePage() {
  const [posts, setPosts] = useState([]);
  // const [checkMorePosts, setCheck] = useState(true);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: '/api',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    axiosInstance
      .get('/post')
      .then((postList) => {
        // posts successfully fetched
        console.log('fetched posts');
        setPosts(...postList);
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        console.log(message);
      });
  });

  //   const fetchMorePosts = () => {
  //     if (dummyPosts.length >= 500) {
  //       setCheck(false);
  //     }
  //   };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="h4" noWrap sx={{ flex: 1 }}>
            Dostiyan
          </Typography>
          <Link
            to="/myprofile"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              width: 'fullWidth',
            }}
          >
            <Avatar sx={{ bgcolor: '#513' }}>N</Avatar>
          </Link>
          <IconButton aria-label="notifications icon" component="label">
            <NotificationsIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {sideBarNav.map(({ route, icon, label }) => (
              <ListItem key={label} disablePadding>
                <Link
                  to={route}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: 'fullWidth',
                  }}
                >
                  <ListItemButton>
                    {icon}
                    <ListItemText primary={label} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Link
            to="/home/createpost"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              width: 'fullWidth',
            }}
          >
            <IconButton
              aria-label="create post icon"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 95,
                marginLeft: 2,
                borderRadius: 0,
              }}
            >
              <PostAddIcon sx={{ fontSize: 40, color: '#000' }} />
              <Typography sx={{ marginLeft: 1, fontSize: 18 }}>
                Create Post
              </Typography>
            </IconButton>
          </Link>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {posts.map((post) => (
          <Post {...post} key={post.postID} />
        ))}
      </Box>
    </Box>
  );
}

//  <input hidden accept="image/*" type="file" />;

export default HomePage;
