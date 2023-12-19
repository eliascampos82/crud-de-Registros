/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import { agregarRegistro, obtenerRegistrosPorDni } from '../firebase';
import { validarDNI, validarNombreApellido } from '../validaciones';

const AgregarRegistro = ({ onRegistroAgregado }) => {
  const [nuevoRegistro, setNuevoRegistro] = useState({ dni: '', nombres: '', apellidos: '' });

  const handleAgregarRegistro = async () => {
    try {
      // Validar DNI
      if (!validarDNI(nuevoRegistro.dni)) {
        alert('Ingrese un DNI válido de 8 números.');
        return;
      }

      // Verificar si el DNI ya existe en la base de datos
      const registroExistente = await obtenerRegistrosPorDni(nuevoRegistro.dni);
      if (registroExistente) {
        alert('Ya existe un registro con este DNI.');
        return;
      }

      // Validar nombres y apellidos
      if (!validarNombreApellido(nuevoRegistro.nombres) || !validarNombreApellido(nuevoRegistro.apellidos)) {
        alert('Ingrese nombres y apellidos válidos (solo letras y espacios).');
        return;
      }

      // Agregar el nuevo registro a la base de datos
      const nuevoId = await agregarRegistro(nuevoRegistro);
      alert(`Registro agregado con ID: ${nuevoId}`);

      // Llamar a la función proporcionada para notificar la actualización
      if (onRegistroAgregado) {
        onRegistroAgregado();
      }

      // Limpiar el formulario después de agregar el registro
      setNuevoRegistro({ dni: '', nombres: '', apellidos: '' });
    } catch (error) {
      console.error('Error al agregar registro: ', error);
      alert('Error al agregar registro');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dni' && !/^\d{0,8}$/.test(value)) {
      // Display an error message or handle it as per your UI/UX design
      return;
    }
    setNuevoRegistro((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Agregar un registro</h2>
        <label>
          DNI:
          <input type="text" name="dni" value={nuevoRegistro.dni} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Nombres:
          <input type="text" name="nombres" value={nuevoRegistro.nombres} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Apellidos:
          <input type="text" name="apellidos" value={nuevoRegistro.apellidos} onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={handleAgregarRegistro}>
          Agregar Registro
        </button>
      </div>
    </div>
  );
};

export default AgregarRegistro;



