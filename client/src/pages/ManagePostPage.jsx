import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getAllReportedPosts } from '../api/backend';
import ManagePostList from '../components/ManagePostList';

function ManagePostPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllReportedPosts()
      .then((reportedPostList) => {
        setPosts(reportedPostList.data);
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingY: 2,
      }}
    >
      <Typography variant="h4" sx={{ paddingY: 3 }}>
        Manage Posts
      </Typography>
      {posts.length === 0 ? (
        <Typography textAlign="center" variant="h6" marginTop="2">
          No Reported Posts Found
        </Typography>
      ) : (
        <ManagePostList posts={posts} />
      )}
    </Box>
  );
}

export default ManagePostPage;
