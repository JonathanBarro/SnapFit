import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [frec_actividad_sem, setFrec_actividad_sem] = useState('');
  const [t_disponible, setT_disponible] = useState('');
  const [r_comida, setR_comida] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const setters = {
      username: setUsername,
      email: setEmail,
      password: setPassword,
      edad: setEdad,
      peso: setPeso,
      altura: setAltura,
      frec_actividad_sem: setFrec_actividad_sem,
      t_disponible: setT_disponible,
      r_comida: value => setR_comida(value.split(',').map(item => item.trim())) // Split and trim the string to convert it into an array
    };
    const setter = setters[name];
    if (setter) {
      setter(value);
    } else {
      console.error(`Unknown form field: ${name}`);
    }
  };

  const handleCancel = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setEdad('');
    setPeso('');
    setAltura('');
    setFrecActividadSem('');
    setTDisponible('');
    setRComida([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3030/users/', {
        username,
        email,
        password,
        edad,
        peso,
        altura,
        frec_actividad_sem,
        t_disponible,
        r_comida
      });
      setIsLoading(false);
      if (response.status === 201) {
        console.log('Usuario registrado:', response.data);
        alert('Registro completado con éxito.');
        handleCancel(); // Limpia el formulario después del envío exitoso
      } else {
        throw new Error('Respuesta no esperada del servidor');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error al registrar:', error.response ? error.response.data : error);
      alert('Error al registrar. Por favor, intenta de nuevo.');
    }
  };



  return (
    <div className='mx-auto max-w-lg px-4'>
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
       

        <div className="border-b border-gray-900/10 pb-12 pt-10"> 
          <h2 className="text-base font-semibold leading-7 text-gray-900">Información personal</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  value={username}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  value={email}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Edad
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="edad"
                  value={edad}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Altura
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="altura"
                  value={altura}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Peso
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="peso"
                  value={peso}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Actividad
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="frec_actividad_sem"
                  value={frec_actividad_sem}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Días disponibles para entrenar
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="t_disponible"
                  value={t_disponible}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Restricciones alimenticias
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="r_comida"
                  value={r_comida}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=" Vegano, celiaco, alergico a..."
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" onClick={handleCancel} className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading} // Deshabilitar durante la carga
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {isLoading ? 'Guardando...' : 'Save'}
          </button>
        </div>
    </form>
    </div>
  )
}

  
  export default SignUp;