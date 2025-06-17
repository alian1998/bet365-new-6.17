import { cookies } from "next/headers";
import Container from "@/components/shared/container/Container";
import MainNav from "@/components/shared/navbar/MainNav";

import SingUpButton from "@/components/ui/Home/SignUpButton/SingUpButton";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("gameToken");

  return (
    <Container>
      <div className="relative min-h-screen mainBgColor">
        <MainNav token={token} />
        {children}
        <SingUpButton token={token} />
      </div>
    </Container>
  );
};

export default MainLayout;
