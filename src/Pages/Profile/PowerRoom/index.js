import React from "react";
import { Container } from "react-bootstrap";
import { Fade } from "react-reveal";

const Powerroom = () => {
  
  return (
    <Fade>
      <section className="Workshop_main common-pad">
        <Container>
          <div className="Workshop_content">
            <h1>Power Room</h1>
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

export default Powerroom