"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  }); // Contoh user login

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
