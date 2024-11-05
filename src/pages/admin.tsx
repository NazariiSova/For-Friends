'use client';

import { useState, useEffect } from "react";
import { User } from 'firebase/auth';
import { auth } from "../firebase/config";
import Login from '../components/Login';
import Manage from '../components/Manage';

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  if (user) {
    return <Manage />;
  }
  return <Login />;
};

export default Admin;
