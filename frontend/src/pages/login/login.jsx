import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../context/UserContext'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Para redireccionar después del login
import './login.scss'; // Importa los estilos para LogIn

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(UserContext); // Usar UserContext
  const navigate = useNavigate(); // Hook para la navegación

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3030/users/login', { email, password });
      console.log('Login successful:', response.data);
      setUser(response.data.user); // Actualiza el estado global del usuario
      localStorage.setItem('token', response.data.token); // Guarda el token en localStorage
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Has iniciado sesión correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          navigate('/'); // Redirecciona a la página de inicio después del login
        }
      });
    } catch (error) {
      if (error.response) {
        console.log('Error:', error.response.data);
        setErrorMessage(error.response.data.message);
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: error.response.data.message,
          confirmButtonColor: '#d33',
          confirmButtonText: 'Intentar de nuevo'
        });
      } else {
        console.log('Error:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Reintentar'
        });
      }
    }
  };

  return (
    <div className="login-wrapper  bg-gradient-to-r from-slate-400 to-slate-100">
      <div className="login-container ">
        <form id="msform" onSubmit={handleLogin}>
          <fieldset>
            <h2 className="fs-title">Inicio de Sesión</h2>
            <h3 className="fs-subtitle">Ingresa tus credenciales</h3>
            <div className="relative mb-4">

              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Contraseña'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-button">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <input type="submit" name="submit" className="submit action-button" value="Log In" />
            {errorMessage && <p className="text-red-500 text-xs italic mt-3">{errorMessage}</p>}
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
