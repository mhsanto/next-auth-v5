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
    <div className="bg-white p-10 rounded-xl">
      <Button onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default SettingsPage;
