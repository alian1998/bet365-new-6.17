import React from "react";
import Navbar from "./Navbar";

const MainNav = async ({token} : any) => {
  return (
    <div>
      <Navbar token={token}/>
    </div>
  );
};

export default MainNav;
