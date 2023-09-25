import React from "react";
import Headerlogin from "../Component/Header/Headerlogin";
import Dashfooter from "Component/Footer/Dashfooter";
import Profile from "Pages/Profile";

export default function Myprofiletheme() {
  return (
    <>
      <Headerlogin />
      <Profile />
      <Dashfooter extraclass="footer-main Dashfooter" />
    </>
  );
}
