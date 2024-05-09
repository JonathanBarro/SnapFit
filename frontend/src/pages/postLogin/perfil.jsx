import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Perfil = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    edad: '',
    peso: '',
    altura: '',
    frec_actividad_sem: '',
    t_disponible: '',
    r_comida: ''
  });

  // Carga inicial de datos del usuario para referencia, no para mostrar en inputs
  const [userData, setUserData] = useState({});

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3030/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setUserData(response.data);  // Guardamos los datos
    } catch (error) {
      console.error("Error al cargar los datos del usuario:", error.response ? error.response.data : error);
      alert(`Error al cargar los datos: ${error.response ? error.response.data.message : 'Error de conexión'}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    try {
      const updatedData = Object.fromEntries(Object.entries(inputs).filter(([key, value]) => value !== ''));
      const response = await axios.post('http://localhost:3030/users/update', updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Datos actualizados correctamente!');
      setUserData({ ...userData, ...updatedData }); // Actualizar userData con los cambios
      setInputs({}); // Limpiar inputs después de guardar
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error.response ? error.response.data : error);
      alert(`Error al guardar los cambios: ${error.response ? error.response.data.message : 'Error de conexión'}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fieldNames = {
    username: "Usuario",
    email: "Email",
    edad: "Edad",
    peso: "Peso",
    altura: "Altura",
    frec_actividad_sem: "Actividad Semanal",
    t_disponible: "Tiempo Disponible de Entrenamiento",
    r_comida: "Restricciones Alimentarias"
  };

  const fieldUnits = {
    edad: " años",
    peso: " Kg",
    altura: " cm"
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-full md:w-2/5 mx-auto bg-gray-50 shadow-lg rounded-lg overflow-hidden flex-col items-center p-5">
        <div className="w-full">
          <h2 className="text-gray-900 text-3xl font-medium title-font mb-5">Datos de Usuario</h2>
          {Object.entries(fieldNames).map(([key, label]) => (
            <div className="relative mb-4" key={key}>
              <label className="leading-7 text-lg text-gray-600">
                {label} : {userData[key] || 'No disponible'} {fieldUnits[key] || ''}
              </label>
              <input
                type="text"
                name={key}
                value={inputs[key] || ''}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder={`Introduce nuevo valor para ${label}`}
              />
            </div>
          ))}
          <div className="flex justify-between space-x-4 mt-4">
            <button onClick={handleSaveChanges} className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-400 rounded text-lg flex-1 mr-2">
              Guardar cambios
            </button>
            <NavLink to="/changePasswor">
              <button className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-400 rounded text-lg flex-1 ml-2">
                Cambiar contraseña
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
