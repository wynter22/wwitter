import React from 'react';
import { authService } from 'utils/firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    const auth = authService.getAuth();
    authService.signOut(auth);
    navigate('/');
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
