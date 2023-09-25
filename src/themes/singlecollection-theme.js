import React from "react";
import Header from "Component/Header/Header";
import Footer from "Component/Footer/Footer";
import Singlecollection from "Pages/Singlecollection/Singlecollection";

export default function Singlecollectiontheme() {
  return (
    <>
      <Header />
      <Singlecollection />
      <Footer extraclass="footer-main" />
    </>
  );
}
