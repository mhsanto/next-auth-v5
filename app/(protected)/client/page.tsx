"use client"
import { UserInfo } from "@/components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <div>
      <UserInfo user={user} label="Client" />
    </div>
  );
};

export default ClientPage;
