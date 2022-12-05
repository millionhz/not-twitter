import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
// import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Key,
  Search,
  PostAdd,
  Person,
  Notifications,
  Upload,
} from '@mui/icons-material';

import { getPosts } from '../api/backend';
import PostList from '../components/PostList';
import AuthContext from '../context/AuthContext';

function HomePage() {
  const [posts, setPosts] = useState([]);

  const {
    user: { userId },
  } = useContext(AuthContext);

  const drawerWidth = 240;
  const sideBarNav = [
    {
      route: `/user/${userId}`,
      icon: <Person sx={{ margin: 1 }} />,
      label: 'My Profile',
    },
    {
      route: '/notifications',
      icon: <Notifications sx={{ margin: 1 }} />,
      label: 'Notifications',
    },
    {
      route: '/post/compose',
      icon: <PostAdd sx={{ margin: 1 }} />,
      label: 'Create Post',
    },
    {
      route: '/image/compose',
      icon: <Upload sx={{ margin: 1 }} />,
      label: 'Upload Image',
    },
    {
      route: '/post/search',
      icon: <Search sx={{ margin: 1 }} />,
      label: 'Search Post',
    },
    {
      route: '/user/search',
      icon: <Search sx={{ margin: 1 }} />,
      label: 'Search User',
    },
    {
      route: '/updatepassword',
      icon: <Key sx={{ margin: 1 }} />,
      label: 'Update Password',
    },
    {
      route: '/logout',
      icon: <LogoutIcon sx={{ margin: 1 }} />,
      label: 'Logout',
    },
  ];

  useEffect(() => {
    getPosts()
      .then((postList) => {
        // posts successfully fetched
        setPosts(postList.data);
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        console.log(message);
      });
  }, []);

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
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <PostList posts={posts} />
      </Box>
    </Box>
  );
}

//  <input hidden accept="image/*" type="file" />;

export default HomePage;
