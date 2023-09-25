import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-reveal";

const teamdata = [
  {
    memimg: "/images/memone.png",
    memname: "Mehdi - The Visionary Heartbeat",
    memdesi: "Founder, CEO, Creative Director, Sole Investor, & Head Designer",
    memdescription:
      "As the foundation stone of our Syndicate, Mehdi infuses life into our mission. Every pixel dances with his vision, every design narrates his story. Dive into the world he envisions, and witness the magic first-hand",
  },
  {
    memimg: "/images/memtwo.png",
    memname: "Lucian - The Palette Magician",
    memdesi: "Lead Artist/Illustrator",
    memdescription:
      "Where words fail, Lucian’s art speaks. Each artwork is a universe in itself, echoing the emotions, tales, and dreams of the Robotic Rabbit Syndicate.",
  },
  {
    memimg: "/images/memthree.png",
    memname: "Can - The Anime Alchemist",
    memdesi: "Anime Animator",
    memdescription:
      "To Can, anime is more than a medium - it’s an essence. Merging reality with fantasy, his animations embody the spirit of our Syndicate with every frame.",
  },
  {
    memimg: "/images/memfour.png",
    memname: "Luck - The Digital Dynamo",
    memdesi: "Web3 & Website Engineer Guru",
    memdescription:
      "In the world of 1s and 0s, Luck crafts masterpieces. Merging the realms of web3 and classic web design, he ensures our digital presence is not just functional but also transcendent.",
  },
];

const Team = ({ TeamData }) => {
  return (
    // <Fade>
      <section id="team" className="team_section">
        <Container>
          <div className="heading_wrap position-relative">
            <div className="inner position-relative">
              <h2 className="front_heading">Team</h2>
              <span className="back_heading">Team</span>
            </div>
          </div>

          <div className="team_column">
            {TeamData?.length > 0 ? (
              <Row>
                {TeamData?.map((team, idx) => {
                  return (
                    <Col key={idx} lg={6} sm={6} className="my-3">
                      <div className="team_warp_box h-100">
                        <div className="team_top">
                          {/* <div className="team_img">
                            <img
                              src={team.memimg}
                              alt=""
                              className="img-fluid"
                            />
                          </div> */}
                          <div className="team_content">
                            <h3>{team.title}</h3>
                            <p>{team.name}</p>
                          </div>
                        </div>
                        <p dangerouslySetInnerHTML={{__html:team.description}} className="member_description">
                          
                        </p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <p>No Team member Found!!</p>
            )}
          </div>
        </Container>
      </section>
    // </Fade>
  );
};

export default Team;
