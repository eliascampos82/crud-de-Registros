/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { obtenerRegistrosPorDni, eliminarRegistro } from '../firebase';
import MostrarRegistros from './MostrarRegistros';
import { validarDNI } from '../validaciones';

const EliminarRegistros = ({ onRegistrosActualizados }) => {
  const [dniBuscar, setDniBuscar] = useState('');
  const [registrosEliminar, setRegistrosEliminar] = useState([]);
  const [registrosSeleccionados, setRegistrosSeleccionados] = useState([]);
  const [confirmacionChecked, setConfirmacionChecked] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    console.log('Registros seleccionados (en render):', registrosSeleccionados);
    console.log('Confirmación checked (en render):', confirmacionChecked);
  }, [registrosSeleccionados, confirmacionChecked]);

  const handleBuscarRegistros = async () => {
    try {
      if (!validarDNI(dniBuscar)) {
        setMensajeError('Ingrese un DNI válido de 8 dígitos numéricos.');
        return;
      }

      const registrosEncontrados = await obtenerRegistrosPorDni(dniBuscar);

      if (registrosEncontrados) {
        setRegistrosEliminar(registrosEncontrados);
        setMensajeError('');
      } else {
        setRegistrosEliminar([]);
        setMensajeError('Registro no encontrado.');
      }

      setRegistrosSeleccionados([]); // Limpiar la lista de registros seleccionados al buscar
    } catch (error) {
      console.error('Error al buscar registros: ', error);

      if (error.message && error.message.includes('usuario no encontrado')) {
        setRegistrosEliminar([]);
        setMensajeError('Registro no encontrado.');
      } else {
        setMensajeError('Error al buscar registros. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleSeleccionarRegistro = (registro) => {
    setRegistrosSeleccionados((prevSeleccionados) => {
      const registroId = registro.id;

      if (prevSeleccionados.includes(registroId)) {
        return prevSeleccionados.filter((id) => id !== registroId);
      } else {
        return [...prevSeleccionados, registroId];
      }
    });
  };

  const handleConfirmacionChange = (e) => {
    console.log('Nuevo valor de confirmacionChecked:', e.target.checked);
    setConfirmacionChecked(e.target.checked);
  };

  const handleEliminarRegistro = async () => {
    setMensajeExito('');
    setMensajeError('');

    if (!confirmacionChecked) {
      console.log('Error: No se confirmó la eliminación.');
      setMensajeError('Confirma la eliminación marcando la casilla de confirmación.');
      return;
    }

    try {
      for (const idRegistro of registrosSeleccionados) {
        await eliminarRegistro(idRegistro);
      }

      setRegistrosEliminar([]);
      const registrosActualizados = await obtenerRegistrosPorDni(dniBuscar);
      console.log('Registros actualizados después de la eliminación:', registrosActualizados);
      onRegistrosActualizados(registrosActualizados);

      setDniBuscar('');
      setRegistrosSeleccionados([]);
      setConfirmacionChecked(false);
      setMensajeExito('Registros eliminados con éxito');
    } catch (error) {
      console.error('Error al eliminar registros: ', error);
      setMensajeError('Error al eliminar registros');
    }
  };

  return (
    <div className="eliminarRegistros">
      <h1>Eliminar Registros</h1>
      <label>
        Buscar por DNI:
        <input
          type="text"
          value={dniBuscar}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d{0,8}$/.test(inputValue)) {
              setDniBuscar(inputValue);
            }
          }}
        />
      </label>
      <button type="button" onClick={handleBuscarRegistros}>
        Buscar Registros
      </button>
      {mensajeError && <p>{mensajeError}</p>}
      
      <MostrarRegistros
        registros={registrosEliminar}
        seleccionarRegistro={handleSeleccionarRegistro}
        registrosSeleccionados={registrosSeleccionados}
      />
      
      <div className="seleccionarEliminar">
        <label>
          Confirmar eliminación:
          <input
            type="checkbox"
            checked={confirmacionChecked}
            onChange={handleConfirmacionChange}
          />
        </label>
        {registrosSeleccionados.length > 0 && (
          <button type="button" onClick={handleEliminarRegistro}>
            Confirma para eliminar
          </button>
        )}
      </div>
      {mensajeExito && <p>{mensajeExito}</p>}
    </div>
  );
};

export default EliminarRegistros;


