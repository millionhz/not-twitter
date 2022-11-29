import React from 'react';
import User from './User';

function UserList({ users }) {
  return (
    <div>
      {users.map(({ name, user_id: id }) => (
        <User name={name} key={id} id={id} />
      ))}
    </div>
  );
}

export default UserList;
