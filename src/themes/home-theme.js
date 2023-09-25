import React, { useEffect } from "react";

// Components
import Header from "Component/Header/Header";
import Footer from "Component/Footer/Footer";
import Homebanner from "Pages/Home/Homebanner";
import Mintsection from "Pages/Home/Mintsection";
import Roadmap from "Pages/Home/Roadmap";
import Team from "Pages/Home/Team";
import Faq from "Pages/Home/Faq";
import Joincommunity from "Pages/Home/Joincommunity";

import { useDispatch, useSelector } from "react-redux";

// Store
import { getCollection, getFaqs, getTeams } from "store/actions";

export default function Hometheme() {
  const { faqs, teams, roadmaps } = useSelector((state) => state?.Contents);
  const { settings } = useSelector((state) => state?.Setting);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFaqs());
  }, []);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    if (settings?.activeCollectionId) {
      dispatch(getCollection(settings?.activeCollectionId));
    }
  }, [settings]);

  return (
    <>
      <Header />
      <Homebanner />
      {/* <Mintsection /> */}
      {/* <Roadmap roadMapData={roadmaps} /> */}
      <Team TeamData={teams} />
      <Faq FaqData={faqs} />
      {/* <Joincommunity /> */}
      <Footer extraclass="footer-main" />
    </>
  );
}
