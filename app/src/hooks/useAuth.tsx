"use client";

import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";

interface AuthType {
  isAuth: boolean;
  firstName: string;
  lastName?: string;
  photo?: string;
  username: String;
  id: number;
  setAuthData: any;
  signOut: any;
}

const defaultVal = {
  isAuth: false,
  firstName: "",
  lastName: undefined,
  photo: "",
  username: "",
  id: 0,
  setAuthData: () => {},
  signOut: () => {},
};

export const AuthContext = React.createContext<AuthType>(defaultVal);

export default function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [id, setID] = useState(0);
  const [isAuth, setIsAuth] = useState(false);

  const setAuthData = (data: any) => {
    setFirstName(data?.firstName);
    setLastName(data?.lastName);
    setUsername(data?.usernmae);
    setPhoto(data?.photo_url);
    setID(data?.id);

    localStorage.setItem("auth", JSON.stringify(data));
    setIsAuth(true);
  };

  const signOut = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    console.log(auth);

    if (auth) {
      try {
        const data = JSON.parse(auth);
        setFirstName(data?.firstName);
        setLastName(data?.lastName);
        setUsername(data?.usernmae);
        setPhoto(data?.photo_url);
        setID(data?.id);
        setIsAuth(true);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        firstName,
        lastName,
        username,
        photo,
        id,
        isAuth,
        setAuthData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
