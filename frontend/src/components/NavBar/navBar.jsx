import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext"; // Importa correctamente el contexto
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import Logo from "../logo";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./icons";
import "./navBar.scss";

function NavBar() {
  const [click, setClick] = useState(false);
  const { user, setUser } = useContext(UserContext); // Esto te mostrará si `user` se actualiza cuando cambia el contexto
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const handleLogout = () => {
    setUser(null); // Asumiendo que esta función elimina correctamente el usuario del estado
    localStorage.removeItem("token"); // Asegúrate de limpiar el token o cualquier dato de sesión
    navigate("/login"); // Redirige al usuario a la página de login
  };

  const handleMenuItemClick = () => {
    handleClick(); // Cierra el menú
  };

  return (
    <nav className="navbar bg-gradient-to-r from-black to-slate-700">
      <div className="nav-container">
        <a className="nav-logo">
          <span className="icon">
            <Logo />
          </span>
          <span className="ml-3xl text-4xl font-normal text-white">
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
              to="/suplements"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Suplementación
            </NavLink>
          </li>
          
          {user ? (
            <li className="bttn-item bttn-menu">
              <Menu>
                <MenuHandler>
                  <Button 
                    variant="gradient"
                    className="bttn-color text-sm flex items-center gap-3 text-#712ce0 mt-0.5"> Menu</Button>
                </MenuHandler>
                <MenuList className="menu-list mt-5">
                  <MenuItem className="menu-item" onClick={handleMenuItemClick}> <NavLink to="/perfil">Mi perfil</NavLink></MenuItem>
                  <MenuItem className="menu-item" onClick={handleMenuItemClick}><NavLink to="/salud">Progresión</NavLink></MenuItem>
                  <MenuItem className="menu-item" onClick={handleMenuItemClick}><NavLink to="/nutricion">Nutrición</NavLink></MenuItem>
                  <MenuItem className="menu-item" onClick={handleMenuItemClick}><NavLink to="/ejercicios">Ejercicios</NavLink></MenuItem>
                  <hr className="menu-divider my-1" />
                  <MenuItem className="menu-item" onClick={handleLogout}>Cerrar sesión</MenuItem>
                </MenuList>
              </Menu>
            </li>
          ) : (
            <>
              <li className="bttn-item">
                <NavLink to="/login" className="bttn-menu">
                  <Button
                    variant="gradient"
                    className="bttn-color text-sm flex items-center gap-3 text-#712ce0"
                    onClick={handleMenuItemClick}
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
                </NavLink>
              </li>
              <li className="bttn-item">
                <NavLink to="/signup" className="bttn-menu">
                  <Button
                    variant="gradient"
                    className="bttn-color text-sm flex items-center gap-3 text-#712ce0"
                    onClick={handleMenuItemClick}
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
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? <HamburgetMenuClose /> : <HamburgetMenuOpen />}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
