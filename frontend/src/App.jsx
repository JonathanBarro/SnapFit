import { Navigate, Route, Routes } from "react-router-dom";
import { UserProvider } from './context/UserContext';
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
import Perfil from "./pages/postLogin/perfil";
import Salud from "./pages/postLogin/salud"
import CambioPass from "./pages/postLogin/cambioContraseña";
import './components/Footer/footer.scss'; // Ajusta la ruta según donde coloques el archivo
import Ejercicios from "./pages/postLogin/ejercicios";
import ProtectedRoute from "./components/protected/rutasProtejida"



function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <NavBar />
        <div className="content-wrap"> 
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
            <Route path='/perfil' element={<ProtectedRoute><Perfil/></ProtectedRoute>}></Route>
            <Route path='/salud' element={<ProtectedRoute><Salud/></ProtectedRoute>}></Route>
            <Route path='/ejercicios' element={<ProtectedRoute><Ejercicios/></ProtectedRoute>}></Route>
            
            <Route path='/changePasswor' element={<CambioPass/>}></Route>
            <Route path='*' element={<Navigate to="/notfound"/>}></Route>
          </Routes>
        </div>
        <Footer/>
      </div>
    </UserProvider>
  );
}

export default App;
