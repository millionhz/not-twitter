import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getAllReportedPosts } from '../api/backend';
import ManagePostList from '../components/ManagePostList';

function ManagePostPage() {
  const [posts, setPosts] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    getAllReportedPosts()
      .then((reportedPostList) => {
        setPosts(reportedPostList.data);
        setFetched(true);
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
      {posts.length === 0 && fetched ? (
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
