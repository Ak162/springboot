import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default function Footer(props) {
  const { settings } = useSelector((state) => state?.Setting);
  console.log("socialMediaLinks",settings?.socialMediaSetting)
  return (
    // <section className={props.extraclass} style={{backgroundImage:'url("images/footerBack.png")',backgroundSize:"cover"}}>
    <section className={props.extraclass}>
      {/* footer-main position-relative */}
      <Container>
        <div className="footer_top">
          {/* <ul className="footer-links">
            <li class="nav-item">
              <a
                href="#homesection"
                class="nav-link gradient-text"
                aria-current="page"
              >
                Home
              </a>
            </li>

            <li class="nav-item">
              <a href="#mintsection" class="nav-link gradient-text">
                Mint
              </a>
            </li>
            <li class="nav-item">
              <a href="#roadmap" class="nav-link gradient-text">
                Roadmap
              </a>
            </li>

            <li class="nav-item">
              <a href="#team" class="nav-link gradient-text">
                Team
              </a>
            </li>

            <li class="nav-item">
              <a href="#faq" class="nav-link gradient-text">
                FAQ
              </a>
            </li>
          </ul> */}
          <img src="/images/logo.png" alt="" className="img-fluid" />
        </div>
        <div className="social_list">
          <ul>
            <li>
              <a href={`${settings?.socialMediaSetting?.opensea ? settings?.socialMediaSetting?.opensea : "https://opensea.io/collection/robotic-rabbit-syndicate-1" }`} target="_blank">
                <img src="/images/socialone.png" alt="" className="img-fluid" />
              </a>
            </li>
            <li>
              <a 
              href={`${settings?.socialMediaSetting?.opensea ? settings?.socialMediaSetting?.youtube : "javascript:void(0)" }`}
                  >
                <img src="/images/socialtwo.png" alt="" className="img-fluid" />
              </a>
            </li>
            <li>
              <a 
              href={`${settings?.socialMediaSetting?.opensea ? settings?.socialMediaSetting?.twitter : "https://x.com/roboticrabbits_" }`}

             >
                <img src="/images/socialthree.png" alt="" className="img-fluid" />
              </a>
            </li>
            <li>
              <a 
                href={`${settings?.socialMediaSetting?.opensea ? settings?.socialMediaSetting?.tiktok : "javascript:void(0)" }`}
              >
                <img src="/images/socialfour.png" alt="" className="img-fluid" />
              </a>
            </li>
            <li>
              <a 
                 href={`${settings?.socialMediaSetting?.opensea ? settings?.socialMediaSetting?.discord : "https://discord.gg/rrs" }`}
               target="_blank">
                <img src="/images/socialfive.png" alt="" className="img-fluid" />
              </a>
            </li>
          </ul>
        </div>

      </Container>
      <div className="footer-copyright text-center">
        <p>© 2023 Robotic Rabbit Syndicate</p>
      </div>
    </section>
  );
}
