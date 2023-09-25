import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import HeaderRightSide from "./HeaderRightSide";

// images

export default function Header() {
  
  // const [togglemenu, settogglemenu] = useState(false);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    window.reload();
  };

  return (
    <>
      <section className={scroll ? "header-main" : "header-main"}>
        <Container fluid>
          <div className="header d-flex py-3">
            <Link to="/" class="navbar-brand">
              <img src="images/dashlogo.png" alt="logo" className="img-fluid" />
            </Link>
            <HeaderRightSide disableButton={false} /> 
            {/* <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <Link to="/" class="navbar-brand">
                <img src="images/logo.png" alt="logo" className="img-fluid" />
              </Link>
              <button
                class="navbar-toggler"
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
                  <Button onClick={() => setNav(false)} className="close-menu">
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
                  <li class="nav-item">
                    <Link
                      to="/"
                      class="nav-link gradient-text"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link to="/" class="nav-link gradient-text">
                    Leader Board
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="" class="nav-link gradient-text">
                    Predictions
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/" class="nav-link gradient-text">
                    Coin Flip
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav> */}

            
          </div>
        </Container>
      </section>
    </>
  );
}
