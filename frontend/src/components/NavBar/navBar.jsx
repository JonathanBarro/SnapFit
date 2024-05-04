import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navBar.scss";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./icons";
import Logo from "../logo";
import { Button } from "@material-tailwind/react";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a className="nav-logo" href="http://localhost:5173/">
            <span className="icon">
              <Logo />
            </span>
            <span className="ml-3xl text-4xl font-semibold text-white">
              SnapFit
            </span>
          </a>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/aboutus"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/learnnutrition"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Nutrición
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/exercise"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Ejercicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/tips"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Tips
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/suplements"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Suplementación
              </NavLink>
            </li>
            <li className="bttn-item">
              <div className="bttn-menu">
                <a href="/login">
                  <Button
                    variant="gradient"
                    className="bttn-color text-sm flex items-center gap-3 text-#712ce0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    Log in
                  </Button>
                </a>
              </div>
            </li>
            <li className="bttn-item">
              <div className="bttn-menu">
                <a href="/signup">
                  <Button
                    variant="gradient"
                    className="bttn-color text-sm flex items-center gap-3 text-#712ce0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                      />
                    </svg>
                    Sign up
                  </Button>
                </a>
              </div>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuClose />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;