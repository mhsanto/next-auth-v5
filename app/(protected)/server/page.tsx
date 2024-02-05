import {UserInfo} from "@/components/auth/user-info";
import { Auth } from "@/lib/auth";

const ServerPage = async () => {
  const user = await Auth();
  return (
    <div>
      <UserInfo user={user} label="Server" />
    </div>
  );
};

export default ServerPage;
