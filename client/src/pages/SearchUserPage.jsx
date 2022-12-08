import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Compose from '../components/Compose';
import UserList from '../components/UserList';
import { searchUser } from '../api/backend';

function SearchUserPage() {
  const [users, setUsers] = useState([]);

  const handleSubmit = (name) => {
    if (name.length < 1) {
      setUsers([]);
      return;
    }

    searchUser(name)
      .then((data) => {
        setUsers(data.data);
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
          placeholder="User to search for..."
          title="Search"
        />
        <Box sx={{ paddingY: 2 }} />
        {users.length === 0 ? (
          <Typography textAlign="center" variant="h4">
            No Users Found
          </Typography>
        ) : (
          <UserList users={users} />
        )}
      </Box>
    </Container>
  );
}

export default SearchUserPage;
