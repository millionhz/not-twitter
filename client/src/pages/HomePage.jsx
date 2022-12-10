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

import { getPosts } from '../api/backend';
import PostList from '../components/PostList';
import AuthContext from '../context/AuthContext';
import sideBarNav from '../components/SideBarNav';

function HomePage() {
  const [posts, setPosts] = useState([]);

  const {
    user: { userId, isAdmin },
  } = useContext(AuthContext);

  const drawerWidth = 250;

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
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography textAlign="center" variant="h3" noWrap sx={{ flex: 1 }}>
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
            {sideBarNav(userId).map(({ route, icon, label }) =>
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
                      <ListItemText primary={label} sx={{ width: 177 }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingLeft: '18%', paddingY: 3 }}
      >
        <Toolbar />
        <PostList posts={posts} />
      </Box>
    </Box>
  );
}

export default HomePage;
