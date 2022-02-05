import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCredit } from '../../store/credit';
import { logout } from '../../store/session';
import './auth.css';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    clearCredit()
    await dispatch(logout());
  };

  return <button className= "logoutButton" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
