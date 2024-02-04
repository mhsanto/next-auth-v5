"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/lib/action/logout.action";

const SettingsPage = () => {
  const session = useCurrentUser();
  const handleSignOut = () => {
    logout();
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
