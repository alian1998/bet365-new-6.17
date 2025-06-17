import Container from "@/components/shared/container/Container";
import Navbar from "@/components/shared/navbar/Navbar";
import SingUpButton from "@/components/ui/Home/SignUpButton/SingUpButton";
import React from "react";

const NotFound = () => {
  return (
    <Container>
      <div className="relative mainBgColor min-h-screen overflow-auto">
        <Navbar />
        <div className="w-full text-center pt-10">
          <p className="font-semibold text-secondary">Comming Soon</p>
        </div>
        <SingUpButton />
      </div>
    </Container>
  );
};

export default NotFound;
