import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Joi from "@hapi/joi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [frec_actividad_sem, setFrec_actividad_sem] = useState("");
  const [t_disponible, setT_disponible] = useState("");
  const [r_comida, setR_comida] = useState("");
  const [objetivo, setObjetivo] = useState(""); // Nuevo estado para el objetivo
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Esquema de validación con Joi
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .pattern(new RegExp("^\\S+@(\\S+\\.com|\\S+\\.es)$"))
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    edad: Joi.number().integer().min(0).required(),
    peso: Joi.number().min(0).required(),
    altura: Joi.number().integer().min(0).required(),
    frec_actividad_sem: Joi.number().integer().required(),
    t_disponible: Joi.number().integer().min(1).required(),
    r_comida: Joi.string().allow("").optional(),
    objetivo: Joi.string()
      .valid(
        "Perder peso",
        "Ganar masa muscular",
        "Mejorar salud cardiovascular",
        "Estilo de vida saludable"
      )
      .required(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "objetivo") {
      setObjetivo(value);
    } else {
      const setters = {
        username: setUsername,
        email: setEmail,
        password: setPassword,
        edad: setEdad,
        peso: setPeso,
        altura: setAltura,
        frec_actividad_sem: setFrec_actividad_sem,
        t_disponible: setT_disponible,
        r_comida: setR_comida,
      };
      setters[name](value);
    }
  };

  const handleCancel = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setEdad("");
    setPeso("");
    setAltura("");
    setFrec_actividad_sem("");
    setT_disponible("");
    setR_comida("");
    setObjetivo(""); // Limpiar también el objetivo
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      email,
      password,
      edad,
      peso,
      altura,
      frec_actividad_sem,
      t_disponible,
      r_comida,
      objetivo,
    }; // Incluye el objetivo en el objeto user
    const { error } = schema.validate(user);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.details[0].message, // Muestra el primer error encontrado
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3030/users/signup",
        user
      );
      setIsLoading(false);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Registrado!",
          text: "Registro completado con éxito.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login"); // Usa navigate('/profile') para redirigir
          }
        });
        handleCancel(); // Limpia el formulario después del envío exitoso
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: "Error al registrar. Por favor, intenta de nuevo.",
        footer: error.response
          ? JSON.stringify(error.response.data)
          : "No hay información del error",
      });
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4">
      <div className="pt-16 pb-3">
        <h1 className="text-4xl font-bold text-white text-center py-4 bg-purple-500 d5Bcfc rounded-lg">
          ¡Bienvenido a SnapFitnes!
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 pt-10">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Información personal
            </h2>

            <div className="border-t border-gray-900/10 pt-7 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    placeholder="Usuario  "
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="password"
                    value={password}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    placeholder="*****"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    value={email}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    placeholder="usuario@usuario.com"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Edad
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="edad"
                    value={edad}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    placeholder="26"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Altura
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="altura"
                    value={altura}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    placeholder="178 cm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Peso
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="peso"
                    value={peso}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    placeholder="80 kg"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Actividad
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="frec_actividad_sem"
                    value={frec_actividad_sem}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    placeholder="3 días a la semana"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Días disponibles para entrenar
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="t_disponible"
                    value={t_disponible}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    placeholder="4 días a la semana"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Restricciones alimenticias
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="r_comida"
                    value={r_comida}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    placeholder=" Vegano, celiaco, alergico a..."
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="objetivo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Objetivo
                </label>
                <div className="mt-2">
                  <select
                    name="objetivo"
                    value={objetivo}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                  >
                    <option value="">Selecciona un objetivo</option>
                    <option value="Perder peso">Perder peso</option>
                    <option value="Ganar masa muscular">
                      Ganar masa muscular
                    </option>
                    <option value="Mejorar salud cardiovascular">
                      Mejorar salud cardiovascular
                    </option>
                    <option value="Estilo de vida saludable">
                      Estilo de vida saludable
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading} // Deshabilitar durante la carga
            className="rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? "Guardando..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
