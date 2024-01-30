"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const SettingsPage = () => {
  const session = useSession();
  const handleSignOut = () => {
    signOut();
  };
  return (
    <form>
      {JSON.stringify(session)}
      <Button variant="destructive" onClick={handleSignOut}>
        Sign out
      </Button>
    </form>
  );
};

export default SettingsPage;
