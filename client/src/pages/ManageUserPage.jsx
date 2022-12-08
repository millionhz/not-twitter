import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { activateUser, deactivateUser, getAllUsers } from '../api/backend';
import ManageUser from '../components/ManageUser';

function ManageUserPage() {
  const [users, setUsers] = useState([]);

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
      <Typography variant="h4" sx={{ paddingY: 3 }}>
        Manage Users
      </Typography>
      {users.map(({ user_id: userId, name, is_activated: isActivated }) => (
        <ManageUser
          key={userId}
          userId={userId}
          name={name}
          isActivated={isActivated}
          handleStateChange={toggleState}
        />
      ))}
    </Box>
  );
}

export default ManageUserPage;
