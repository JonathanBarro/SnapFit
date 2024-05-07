import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/oboutUs";
import Tips from "./pages/tips";
import Exercise from "./pages/exercises";
import LogIn from "./pages/login";
import LearNutrititon from "./pages/aprendeNutricion";
import NotFoud from "./pages/notFound";
import Footer from "./components/Footer/footer";
import Suplements from "./pages/suplements";
import NavBar from "./components/NavBar/navBar";
import SignUp from "./pages/signup";
import './components/Footer/footer.scss'; // Ajusta la ruta según donde coloques el archivo



function App() {
  return (
    <div className="app-container"> {/* Contenedor principal */}
      <NavBar />
      <div className="content-wrap"> {/* Este div envuelve todo el contenido que no es el footer */}
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/tips' element={<Tips />}></Route>
          <Route path='/exercise' element={<Exercise />}></Route>
          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/learnnutrition' element={<LearNutrititon />}></Route>
          <Route path='/notfound' element={<NotFoud/>}></Route>
          <Route path='/suplements' element={<Suplements/>}></Route>
          <Route path='*' element={<Navigate to="/notfound"/>}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
