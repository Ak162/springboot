import React from "react";
import { Container } from "react-bootstrap";
import { Progress } from "reactstrap";

const Scannizer = () => {
  return (
    <section className="Scannizer_main common-pad">
      <Container>
        <div className="Workshop_content scanner_head">
          <h1>Staking</h1>
          <p>Under Construction</p>
        </div>

        <div className="scanning_wrap">
          <div className="top_sanning">
            <div className="scanning_head">
              <p>TOTAL RABBITS STAKED</p>
              <p className="scaning_vlaue">0/3333</p>
            </div>
            <div className="progreessing">
              <Progress value={0} />
            </div>
          </div>

          <div className="sccing_content">
            <div className="scanning_box">
              {/* <h5>SCAN & COLLECT</h5> */}
              <p>
              Under Construction
              </p>
            </div>
            {/* <div className="scanning_box">
              <h5>HOW IT WORKS:</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy .
              </p>
            </div>
            <div className="scanning_box">
              <h5>SCAN TIME: 30 DAYS</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy .
              </p>
            </div> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Scannizer;
