import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Compose from '../components/Compose';
import PostList from '../components/PostList';
import { searchPost } from '../api/backend';

function SearchPostPage() {
  const [posts, setPosts] = useState([]);

  const handleSubmit = (word) => {
    if (word.length < 1) {
      setPosts([]);
      return;
    }

    searchPost(word)
      .then((data) => {
        setPosts(data.data);
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;

        console.log(message);
      });
  };

  return (
    <Container>
      <Box
        sx={{
          m: 'auto',
          mt: '5%',
          width: 600,
        }}
      >
        <Compose
          onSubmit={handleSubmit}
          placeholder="Term to search for..."
          title="Search"
        />
        <Box sx={{ paddingY: 2 }} />
        {posts.length === 0 ? (
          <Typography textAlign="center" variant="h4">
            No Posts Found
          </Typography>
        ) : (
          <PostList posts={posts} />
        )}
      </Box>
    </Container>
  );
}

export default SearchPostPage;
