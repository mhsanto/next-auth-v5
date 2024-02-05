"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";
type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};
const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return <FormError message="You are not authorized to view this page" />;
  }
  return <>{children}</>;
};

export default RoleGate;
