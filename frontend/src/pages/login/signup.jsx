import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Joi from "@hapi/joi";
import { useNavigate } from "react-router-dom";
import './signup.scss';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [frec_actividad_sem, setFrec_actividad_sem] = useState("");
  const [t_disponible, setT_disponible] = useState("");
  const [restricciones, setRestricciones] = useState({
    vegano: false,
    celiaco: false,
    vegetariano: false,
  });
  const [objetivo, setObjetivo] = useState("");
  const [genero, setGenero] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().pattern(new RegExp("^\\S+@(\\S+\\.com|\\S+\\.es)$")).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    edad: Joi.number().integer().min(0).required(),
    peso: Joi.number().min(0).required(),
    altura: Joi.number().integer().min(0).required(),
    frec_actividad_sem: Joi.number().integer().required(),
    t_disponible: Joi.number().integer().min(1).required(),
    r_comida: Joi.array().items(Joi.string()).required(),
    objetivo: Joi.string().valid("Perder peso", "Ganar masa muscular", "Mejorar salud cardiovascular", "Estilo de vida saludable").required(),
    genero: Joi.string().valid("Masculino", "Femenino").required(),
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "restricciones") {
      setRestricciones((prev) => ({
        ...prev,
        [value]: checked,
      }));
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
        genero: setGenero,
        objetivo: setObjetivo,
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
    setObjetivo("");
    setGenero("");
    setRestricciones({
      vegano: false,
      celiaco: false,
      vegetariano: false,
    });
    setStep(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const restriccionesSeleccionadas = Object.entries(restricciones)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    const user = {
      username,
      email,
      password,
      edad,
      peso,
      altura,
      frec_actividad_sem,
      t_disponible,
      r_comida: restriccionesSeleccionadas,
      objetivo,
      genero,
    };

    const { error } = schema.validate(user);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.details[0].message,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3030/users/signup", user);
      setIsLoading(false);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Registrado!",
          text: "Registro completado con éxito.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        handleCancel();
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: "Error al registrar. Por favor, intenta de nuevo.",
        footer: error.response ? JSON.stringify(error.response.data) : "No hay información del error",
      });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="signup-wrapper bg-gradient-to-r from-fuchsia-300 to-violet-300">
      <div className="signup-container">
        <form id="msform" onSubmit={handleSubmit}>
          <ul id="progressbar">
            <li className={step === 1 ? "active" : ""}>Detalles Personales</li>
            <li className={step === 2 ? "active" : ""}>Detalles de Salud</li>
            <li className={step === 3 ? "active" : ""}>Configuración de Cuenta</li>
          </ul>
          {step === 1 && (
            <fieldset>
              <h2 className="fs-title">Detalles Personales</h2>
              <h3 className="fs-subtitle">Cuéntanos algo más sobre ti</h3>
              <input type="text" name="username" placeholder="Nombre" value={username} onChange={handleChange} />
              <input type="text" name="edad" placeholder="Edad" value={edad} onChange={handleChange} />
              <select name="genero" value={genero} onChange={handleChange}>
                <option value="">Seleccione Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <input type="button" name="next" className="next action-button" value="Siguiente" onClick={nextStep} />
            </fieldset>
          )}
          {step === 2 && (
            <fieldset>
              <h2 className="fs-title">Detalles de Salud</h2>
              <h3 className="fs-subtitle">Tu situación actual</h3>
              <input type="text" name="peso" placeholder="Peso" value={peso} onChange={handleChange} />
              <input type="text" name="altura" placeholder="Altura" value={altura} onChange={handleChange} />
              <input type="text" name="frec_actividad_sem" placeholder="Frecuencia de Actividad" value={frec_actividad_sem} onChange={handleChange} />
              <input type="text" name="t_disponible" placeholder="Tiempo Disponible" value={t_disponible} onChange={handleChange} />
              <div className="restricciones">
                <label>Restricciones alimenticias:</label>
                <div className="restricciones-items">
                  {Object.keys(restricciones).map((key) => (
                    <div key={key} className="restriccion-item">
                      <input type="checkbox" id={key} name="restricciones" value={key} checked={restricciones[key]} onChange={handleChange} />
                      <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </div>
              <input type="button" name="previous" className="previous action-button-previous" value="Anterior" onClick={previousStep} />
              <input type="button" name="next" className="next action-button" value="Siguiente" onClick={nextStep} />
            </fieldset>
          )}
          {step === 3 && (
            <fieldset>
              <h2 className="fs-title">Configuración de Cuenta</h2>
              <h3 className="fs-subtitle">Llena tus credenciales</h3>
              <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange} />
              <input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange} />
              <select name="objetivo" value={objetivo} onChange={handleChange}>
                <option value="">Seleccione Objetivo</option>
                <option value="Perder peso">Perder peso</option>
                <option value="Ganar masa muscular">Ganar masa muscular</option>
                <option value="Mejorar salud cardiovascular">Mejorar salud cardiovascular</option>
                <option value="Estilo de vida saludable">Estilo de vida saludable</option>
              </select>
              <input type="button" name="previous" className="previous action-button-previous" value="Anterior" onClick={previousStep} />
              <input type="submit" name="submit" className="submit action-button" value="Finalizar" />
            </fieldset>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
