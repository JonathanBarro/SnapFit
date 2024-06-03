import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import './perfil.scss'; // Asegúrate de importar los estilos aquí

const Perfil = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    edad: "",
    peso: "",
    altura: "",
    frec_actividad_sem: "",
    t_disponible: "",
    r_comida: [],
    objetivo: "",
    genero: "",
  });

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3030/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      setUserData(data);
      setInputs({
        ...data,
        r_comida: data.r_comida || [],
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response ? error.response.data.message : "Error de conexión",
      });
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    try {
      const updatedData = { ...inputs };
      await axios.post(
        "http://localhost:3030/users/update",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (inputs.peso && inputs.peso !== userData.peso) {
        await axios.post(
          "http://localhost:3030/weights/updateWeight",
          {
            userId: userData._id,
            peso: inputs.peso,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      Swal.fire("¡Éxito!", "Datos actualizados correctamente!", "success");
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar los cambios",
        text: error.response ? error.response.data.message : "Error de conexión",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInputs((prev) => ({
        ...prev,
        r_comida: checked
          ? [...prev.r_comida, value]
          : prev.r_comida.filter((item) => item !== value),
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const foodRestrictions = ["Vegano", "Celiaco", "Vegetariano"];
  const objectives = [
    "Perder peso", 
    "Ganar masa muscular", 
    "Mejorar salud cardiovascular", 
    "Estilo de vida saludable"
  ];

  const labels = {
    username: "Nombre de usuario",
    email: "Email",
    edad: "Edad",
    peso: "Peso (Kg)",
    altura: "Altura (cm)",
    frec_actividad_sem: "Frecuencia de actividad semanal",
    t_disponible: "Tiempo disponible para hacer ejercicio",
    objetivo: "Objetivo",
    genero: "Género"
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="profile-container">
        <h2 className= "text-3xl font-medium title-font mb-5">
          Datos de {inputs.username || "Usuario"}
        </h2>
        {Object.entries(inputs).filter(([key]) => key !== 'r_comida').map(([key, value]) => (
          <div key={key} className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700">{labels[key]}</label>
            {key === 'objetivo' || key === 'genero' ? (
              <select
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3"
              >
                <option value="">{key === 'genero' ? 'Selecciona tu género' : 'Selecciona tu objetivo'}</option>
                {(key === 'objetivo' ? objectives : ['Masculino', 'Femenino']).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-purple-500 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 py-2 px-3"
                placeholder={`Introduce nuevo valor para ${key}`}
              />
            )}
          </div>
        ))}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700">Restricciones Alimentarias</label>
          <div className="restricciones-items">
            {foodRestrictions.map(restriction => (
              <div key={restriction} className="restriccion-item">
                <label className="container">
                  <input
                    type="checkbox"
                    id={restriction}
                    name="r_comida"
                    value={restriction}
                    checked={inputs.r_comida.includes(restriction)}
                    onChange={handleChange}
                  />
                  <div className="checkmark"></div>
                </label>
                <label htmlFor={restriction}>{restriction.charAt(0).toUpperCase() + restriction.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="button-group">
          <button
            onClick={handleSaveChanges}
            className="mt-4 text-white border-0 py-2 px-8 focus:outline-none hover:bg-purple-400 rounded text-lg"
          >
            Guardar cambios
          </button>
          <NavLink to="/changePassword" className="mt-4 text-purple-500 hover:underline text-center block">
            Cambiar contraseña
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
