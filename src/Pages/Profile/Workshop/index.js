import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Fade } from "react-reveal";

const Workshop = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log("coming")
    navigate("/wallet-link")
  }
  return (
    <Fade>
      <section className="Workshop_main common-pad">
        <Container>
          <div className="Workshop_content">
            <h1>Workshop</h1>
            <p>
              Under Construction
            </p>
            {/* <Button className="link_wallet" onClick={handleClick}>Link Wallets</Button> */}
          </div>
        </Container>
      </section>
    </Fade>
  );
};

export default Workshop;
