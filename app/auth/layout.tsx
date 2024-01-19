import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-foreground h-full w-full flex items-center justify-center">
      {children}
    </main>
  );
};

export default LoginLayout;
