import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Fade } from "react-reveal";

const Joincommunity = () => {
  const redirectToNewPage = () => {
    window.open("https://discord.gg/rrs", "_blank");
  };
  return (
    <Fade>
      {/* <section id="joincommunity" className="joincommunity_section">
        <Container>
          <div className="heading_wrap position-relative">
            <div className="inner position-relative">
              <h2 className="front_heading">JOIN OUR COMMUNITY</h2>
              <span className="back_heading">JOIN OUR COMMUNITY</span>
            </div>

            <div className="button_banner mt-5">
              <Button className="Whitelists_btn" onClick={redirectToNewPage}>
                DISCORD
              </Button>
            </div>
          </div>
        </Container> */}

        {/* <div className="joincommuity_img mt-5">
            <img src="/images/joinimg.png" alt="" className="img-fluid"/>
         </div> */}
      {/* </section> */}
    </Fade>
  );
};

export default Joincommunity;
