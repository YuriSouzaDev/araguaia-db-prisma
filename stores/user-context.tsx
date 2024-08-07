'use client';

import { logout } from '@/app/actions/logout';
import { validateToken } from '@/app/actions/validate';
import { User } from '@prisma/client';
import React, { useEffect } from 'react';

interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = React.createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null)
    throw new Error('useContext deve estar dentro do Provider');
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode | null;
  user: User | null;
}) {
  const [userState, setUser] = React.useState<User | null>(user);

  useEffect(() => {
    async function validate() {
      const { ok } = await validateToken();
      if (!ok) await logout();
    }
    if (userState) validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
