import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { activateUser, deactivateUser, getAllUsers } from '../api/backend';
import ManageUser from '../components/ManageUser';
import Compose from '../components/Compose';

function ManageUserPage() {
  const [users, setUsers] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    getAllUsers().then(({ data }) => {
      const filteredData = data.filter(({ is_admin: isAdmin }) => !isAdmin);
      setUsers(filteredData);
    });
  }, []);

  const toggleState = (value, userId) => {
    const func = value ? activateUser : deactivateUser;
    func(userId).then(() => {
      const userIdx = users.findIndex((user) => user.user_id === userId);
      users[userIdx].is_activated = value ? 1 : 0;
      setUsers([...users]);
    });
  };

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
      <Typography variant="h4" sx={{ paddingTop: 6 }}>
        Manage Users
      </Typography>
      <Compose
        title="Filter"
        placeholder="Enter name here..."
        sx={{ paddingY: 4 }}
        onSubmit={(value) => setTerm(value)}
      />
      {users.length === 0 ? (
        <Typography textAlign="center" variant="h4">
          Loading...
        </Typography>
      ) : (
        <div>
          {users
            .filter(({ name }) =>
              name.toLowerCase().includes(term.toLowerCase())
            )
            .map(
              (
                { user_id: userId, name, is_activated: isActivated },
                idx,
                arr
              ) => (
                <ManageUser
                  key={userId}
                  userId={userId}
                  name={name}
                  isActivated={isActivated}
                  handleStateChange={toggleState}
                  sx={{
                    borderBottom: idx === arr.length - 1 ? undefined : 0,
                  }}
                />
              )
            )}
        </div>
      )}
    </Box>
  );
}

export default ManageUserPage;
