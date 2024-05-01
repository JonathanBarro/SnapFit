import { NavLink } from "react-router-dom";
import Logo from "./logo";

const NavBar2 = () => {
    const btnLink = 'block inline-block py-1 text-black hover:text-morado-clarito cursor-pointer mr-4'
    const activateLink = 'block inline-block py-1 text-morado-clarito mr-4'
    return (
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="http://localhost:5173/">
              <img src="src/img/ejercicio.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          <span className="ml-3 text-3xl font-semibold text-black">SnapFit</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <NavLink to="/" className={({isActive}) => isActive?activateLink:btnLink}>Inicio</NavLink>
          <NavLink to="/aboutus" className={({isActive}) => isActive?activateLink:btnLink}>¿Qué es SnapFit?</NavLink>
          <NavLink to="/learnnutrition" className={({isActive}) => isActive?activateLink:btnLink}>Aprende a comer</NavLink>
          <NavLink to="/exercise" className={({isActive}) => isActive?activateLink:btnLink}>Ejercicio</NavLink>
          <NavLink to="/tips" className={({isActive}) => isActive?activateLink:btnLink}>Tips</NavLink>
          <NavLink to="/suplements" className={({isActive}) => isActive?activateLink:btnLink}>Suplementación</NavLink>
        </nav>
        <button class="flex-none px-2 btn btn-black btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="w-5 h-5"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span class="sr-only">Open Menu</span>
        </button>
      </div>
  );
};

export default NavBar2;
