import React from "react";
import Welcome from "Pages/Welcome/Welcome";
import Footer from "Component/Footer/Footer";

export default function Welcometheme() {
  return (
    <div className="welcome-body">
      <Welcome />
      <Footer extraclass="welcomefooter footer-main" />
    </div>
  );
}
