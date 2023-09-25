import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//action
import { loginUser } from "store/actions";
///hook
// import useWallet from "hooks/wallet";
import HeaderRightSide from "./HeaderRightSide";

export default function Header() {
  const [nav, setNav] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [navactive, setNavactive] = useState("home");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const handleactive = (type) => {
    setNavactive(type);
  };

  return (
    <>
      {/* <Walletconnetmod show={walletmod} onhide={() => setwalletmod(false)} /> */}
      <section className={scroll ? "header-main  fixed-header" : "header-main"}>
        <Container fluid>
          <div className="header">
            <nav class="navbar navbar-expand-lg">
              <div class="container-fluid">
                <Link to="/" class="navbar-brand">
                  <img
                    src="images/headerlogo.png"
                    alt="logo"
                    className="img-fluid"
                  />
                </Link>

            <HeaderRightSide disableButton={false} />

                {/* <button
                  className={
                    nav ? "navbar-toggler" : "navbar-toggler collapsed"
                  }
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setNav(!nav)}
                >
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </button>
                <div
                  class={
                    nav
                      ? "collapse navbar-collapse show"
                      : "collapse navbar-collapse"
                  }
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav scroll-menu m-auto mb-2 mb-lg-0">
                    <Button
                      onClick={() => setNav(false)}
                      className="close-menu"
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        class="iconify iconify--gg"
                        width="28"
                        height="28"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z"
                        />
                      </svg>
                    </Button>

                    <li
                      className={navactive == "home" ? "active" : "nav-item"}
                      onClick={() => handleactive("home")}
                    >
                      <a href="#homesection" className="nav-link gradient-text">
                        Home
                      </a>
                    </li>

                    <li
                      className={navactive == "mint" ? "active" : "nav-item"}
                      onClick={() => handleactive("mint")}
                    >
                      <a href="#mintsection" className="nav-link gradient-text">
                        Minting
                      </a>
                    </li>
                    <li
                      className={navactive == "roadmap" ? "active" : "nav-item"}
                      onClick={() => handleactive("roadmap")}
                    >
                      <a href="#roadmap" className="nav-link gradient-text">
                        Roadmap
                      </a>
                    </li>

                    <li
                      className={navactive == "team" ? "active" : "nav-item"}
                      onClick={() => handleactive("team")}
                    >
                      <a href="#team" className="nav-link gradient-text">
                        Team
                      </a>
                    </li>

                    <li
                      className={navactive == "faq" ? "active" : "nav-item"}
                      onClick={() => handleactive("faq")}
                    >
                      <a href="#faq" className="nav-link gradient-text">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </nav>

          
          </div>
        </Container>
      </section>
    </>
  );
}
