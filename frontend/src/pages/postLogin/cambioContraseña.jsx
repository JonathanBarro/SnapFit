import React, { useState } from 'react';
import axios from 'axios';

const CambioPass = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario

        try {
            const response = await axios.post('http://localhost:3030/users/changePassword', {
                oldPassword,
                newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            alert('Contraseña actualizada correctamente!');
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error.response ? error.response.data : error);
            alert(`Error al actualizar la contraseña: ${error.response ? error.response.data.message : 'Error de conexión'}`);
        }
    };

    return (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Cambio de contraseña</h2>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <label htmlFor="oldPassword" className="leading-7 text-sm text-gray-600">Contraseña actual</label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="relative mb-4">
                  <label htmlFor="newPassword" className="leading-7 text-sm text-gray-600">Contraseña nueva</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-400 rounded text-lg">Confirmar</button>
              </form>
            </div>
          </div>
        </section>
      );
}

export default CambioPass;
