import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Key,
  Search,
  PostAdd,
  Person,
  Notifications,
  Upload,
  Edit,
  ManageAccounts,
  ReportProblem,
  Logout,
} from '@mui/icons-material';

import { getPosts } from '../api/backend';
import PostList from '../components/PostList';
import AuthContext from '../context/AuthContext';
// import InfiniteScroll from 'react-infinite-scroll-component';

function HomePage() {
  const [posts, setPosts] = useState([]);

  const {
    user: { userId, isAdmin },
  } = useContext(AuthContext);

  const drawerWidth = 240;
  const sideBarNav = [
    {
      route: `/user/${userId}`,
      icon: <Person sx={{ margin: 1 }} />,
      label: 'My Profile',
    },
    {
      route: '/user/edit',
      icon: <Edit sx={{ margin: 1 }} />,
      label: 'Edit Profile',
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
      route: '/user/manage',
      icon: <ManageAccounts sx={{ margin: 1 }} />,
      label: 'Manage Users',
    },
    {
      route: '/post/report',
      icon: <ReportProblem sx={{ margin: 1 }} />,
      label: 'Manage Posts',
    },
    {
      route: '/updatepassword',
      icon: <Key sx={{ margin: 1 }} />,
      label: 'Update Password',
    },
    {
      route: '/logout',
      icon: <Logout sx={{ margin: 1 }} />,
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
            {sideBarNav.map(({ route, icon, label }) =>
              !isAdmin &&
              (label === 'Manage Users' || label === 'Manage Posts') ? null : (
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
              )
            )}
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

export default HomePage;
