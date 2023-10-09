"use client";

import React, { useContext, useEffect, useReducer, useState } from "react";

const AuthContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "Login":
      return { ...state, user: action.payload, isAuthneticated: true };
  }
};
const AuthProvider = ({ children }) => {
  const [{ user, isAuthneticated }, dispatch] = useReducer(reducer, {
    user: null,
    isAuthneticated: false,
  });
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      dispatch({ type: "Login", payload: JSON.parse(localUser) });
    }
  }, []);

  const setUserAuthInfo = ({ data }) => {
    const userData = localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: "Login", payload: data });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (userInfo) => setUserAuthInfo(userInfo),
        isAuthneticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
