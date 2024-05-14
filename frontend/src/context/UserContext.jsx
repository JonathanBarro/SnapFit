import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3030/verifyToken', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          if (response.data.isValid) {
            setUser(response.data.user);
          }
        })
        .catch(error => {
          console.log('Token validation error:', error);
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
