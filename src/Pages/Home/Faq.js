import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Fade } from "react-reveal";  

const Faq = ({ FaqData }) => {
  return (
    
      <section id="faq" className="faq_section">
        <Container>
          <div className="heading_wrap position-relative">
            <div className="inner position-relative">
              <h2 className="front_heading">FAQ</h2>
              <span className="back_heading">FAQ</span>
            </div>
          </div>

          <div className="faq_column">
            <Row className="align-items-center">
              <Col lg={6} md={6} sm={12}>
                <div className="faq_left">
                  <img src="/images/8.png" alt="" className="img-fluid" />
                </div>
              </Col>
              <Col lg="6" className="my-2">
                {FaqData?.length > 0 ? (
                  <>
                    <div className="faq_right_accord">
                      {FaqData?.map((faq, idx) => {
                        console.log(idx, "idxasdfasdf");
                        return (
                          <Accordion defaultActiveKey={0}>
                            <Accordion.Item className="my-2 " eventKey={idx}>
                              <Accordion.Header>
                                {faq?.question}
                              </Accordion.Header>
                              <Accordion.Body>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: faq.answer,
                                  }}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p>No Faq's Found!!</p>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </section>

  );
};

export default Faq;
