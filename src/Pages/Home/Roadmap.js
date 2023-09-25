import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-reveal";

const roadMapData = [
  {
    date: "Q1 - 2022",
    title: "Community DAO",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  {
    date: "Q1 - 2022",
    title: "Community DAO",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  {
    date: "Q1 - 2022",
    title: "Community DAO",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const Roadmap = (
  {
    //  roadMapData
  }
) => {
  return (
    <Fade>
      <section id="roadmap" className="roadmap_section">
        <Container>
          <div className="heading_wrap position-relative">
            <div className="inner position-relative">
              <h2 className="front_heading">Roadmap</h2>
              <span className="back_heading">Roadmap</span>
            </div>
          </div>

          <div className="roadmap_column">
            <Row>
              <Col lg={6} md={6} sm={12}>
                <div className="roadmap_left">
                  <img src="/images/paw.png" alt="" className="img-fluid" />
                </div>
              </Col>

              {roadMapData?.length > 0 ? (
                <Col lg={6} md={6} sm={12}>
                  {roadMapData?.map((roadmap, idx) => {
                    return (
                      <div key={idx} className="roadmap_right">
                        <ul>
                          <li>
                            <div className="roadmapqa">
                              <p className="roadmap_green">{roadmap?.date}</p>
                              <h4>{roadmap?.title}</h4>
                              <p>{roadmap?.description}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </Col>
              ) : (
                <p>No Data Found!!</p>
              )}
            </Row>
          </div>
        </Container>
      </section>
    </Fade>
  );
};

export default Roadmap;
