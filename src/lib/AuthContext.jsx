import React, { createContext, useState, useContext, useEffect } from 'react';
import { localAuth } from '@/lib/localAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = () => {
    try {
      const session = localAuth.getSession();
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoadingAuth(false);
      setAuthChecked(true);
    } catch (error) {
      console.error('User auth check failed:', error);
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      setAuthChecked(true);
    }
  };

  const login = async (email, password) => {
    const session = await localAuth.login(email, password);
    setUser(session.user);
    setIsAuthenticated(true);
    setAuthChecked(true);
    return session;
  };

  const logout = (shouldRedirect = true) => {
    localAuth.logout();
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);
    
    if (shouldRedirect) {
      window.location.href = '#/';
    }
  };

  const navigateToLogin = () => {
    window.location.href = '#/login';
  };

  const isAdmin = user?.isAdmin === true;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated,
      isAdmin,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      login,
      logout,
      navigateToLogin,
      checkUserAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
