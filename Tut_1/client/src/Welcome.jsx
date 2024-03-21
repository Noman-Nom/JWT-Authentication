import React from 'react';

const Welcome = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>You are logged in as {user.isAdmin ? 'Admin' : 'User'}.</p>
    </div>
  );
};

export default Welcome;
