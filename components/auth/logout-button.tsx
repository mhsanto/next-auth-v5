"use client";

import { logout } from "@/lib/action/logout.action";

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const handleSignOut = () => {
    logout();
  };
  return (
    <button type="button" onClick={handleSignOut}>
      {children}
    </button>
  );
};
