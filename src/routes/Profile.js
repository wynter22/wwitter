import React from 'react';
import { authService } from '../firebase';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    const auth = authService.getAuth();
    authService.signOut(auth);
    history.push('/');
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
