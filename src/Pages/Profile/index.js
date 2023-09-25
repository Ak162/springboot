import React from "react";
import { Row, Col } from "react-bootstrap";
import { Fade } from "react-reveal";
import { Outlet } from "react-router-dom";

import Profilesidebar from "./Profilesidebar";

const Profile = () => {
  return (
    <Fade>
      <section className="profile_main">
        <>
          <div className="profile_bottom">
            <Row>
              <Col lg={3} md={4} sm={12}>
                <div className="profile_sidebar">
                  <Profilesidebar />
                </div>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <div className="profile_right_content">
                  <Outlet />
                </div>
              </Col>
            </Row>
          </div>
        </>
      </section>
    </Fade>
  );
};

export default Profile;
