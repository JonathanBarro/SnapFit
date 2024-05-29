import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './cambioContraseña.scss'; // Importa los estilos para LogIn

const CambioPass = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3030/users/changePassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire(
        "¡Éxito!",
        "Contraseña actualizada correctamente!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/perfil");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la contraseña",
        text: error.response
          ? error.response.data.message
          : "Error de conexión",
      });
    }
  };

  return (
    <div className="login-wrapper bg-gradient-to-r from-fuchsia-300 to-violet-300">
      <div className="login-container">
        <form id="msform" onSubmit={handleSubmit}>
          <fieldset>
            <h2 className="fs-title">Cambio de Contraseña</h2>
            <h3 className="fs-subtitle">Actualiza tu contraseña</h3>
            <div className="relative mb-4">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Contraseña actual"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="password-toggle-button"
              >
                <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Contraseña nueva"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="password-toggle-button"
              >
                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <input type="submit" name="submit" className="submit action-button" value="Confirmar" />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CambioPass;
