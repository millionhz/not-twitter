import React from 'react';
import { FormControlLabel, Switch, Card, CardHeader, Box } from '@mui/material';
import Avatar from './Avatar';

function ManageUser({ userId, name, isActivated, handleStateChange, sx }) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 700,
        paddingY: 1,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <CardHeader
          avatar={<Avatar name={name} />}
          title={`${name}`}
          subheader={`User ID: ${userId}`}
          sx={{ flex: 1 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={Boolean(isActivated)}
              onChange={(e) => {
                handleStateChange(e.target.checked, userId);
              }}
            />
          }
          label={isActivated ? 'Activated' : 'Deactivated'}
        />
      </Box>
    </Card>
  );
}

export default ManageUser;
