import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevenir la recarga de la página

    try {
      const response = await axios.post('http://localhost:3030/users/login', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      // Aquí puedes almacenar el token recibido en localStorage o manejar el estado de autenticación
      localStorage.setItem('token', response.data.token);
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Has iniciado sesión correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.log('Error:', error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: error.response.data.message,
          confirmButtonColor: '#d33',
          confirmButtonText: 'Intentar de nuevo'
        });
      } else {
        // Algo salió mal en la configuración al enviar la solicitud
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
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">Inicio de Sesión Seguro</h1>
          <p className="leading-relaxed mt-4">
            Por favor, inicia sesión para continuar.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Log In</button>
            {errorMessage && <p className="text-red-500 text-xs italic mt-3">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
