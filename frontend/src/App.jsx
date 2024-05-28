import { Navigate, Route, Routes } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import Home from "./pages/nav/home";
import AboutUs from "./pages/nav/oboutUs";
import Tips from "./pages/nav/tips";
import Exercise from "./pages/nav/exercises";
import LogIn from "./pages/login/login";
import LearNutrititon from "./pages/nav/aprendeNutricion";
import NotFoud from "./pages/notFound";
import Footer from "./components/Footer/footer";
import Suplements from "./pages/nav/suplements";
import NavBar from "./components/NavBar/navBar";
import SignUp from "./pages/login/signup";
import Perfil from "./pages/postLogin/perfil";
import Salud from "./pages/postLogin/salud"
import CambioPass from "./pages/postLogin/cambioContraseña";
import './components/Footer/footer.scss'; // Ajusta la ruta según donde coloques el archivo
import Ejercicios from "./pages/postLogin/ejercicios";
import ProtectedRoute from "./components/protected/rutasProtejida"
import Nutricion from "./pages/postLogin/nutricion";
import ScrollToTop from "./components/scroll/scrollTop";



function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <NavBar />
        <ScrollToTop />
        <div className="content-wrap"> 
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/exercise' element={<Exercise />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/learnnutrition' element={<LearNutrititon />}></Route>
            <Route path='/notfound' element={<NotFoud/>}></Route>
            <Route path='/suplements' element={<Suplements/>}></Route>
            <Route path='/perfil' element={<ProtectedRoute><Perfil/></ProtectedRoute>}></Route>
            <Route path='/salud' element={<ProtectedRoute><Salud/></ProtectedRoute>}></Route>
            <Route path='/ejercicios' element={<ProtectedRoute><Ejercicios/></ProtectedRoute>}></Route>
            <Route path='/nutricion' element={<ProtectedRoute><Nutricion/></ProtectedRoute>}></Route>
            <Route path='/changePassword' element={<ProtectedRoute><CambioPass/></ProtectedRoute>}></Route>
            <Route path='*' element={<Navigate to="/notfound"/>}></Route>
          </Routes>
        </div>
        <Footer/>
      </div>
    </UserProvider>
  );
}

export default App;
