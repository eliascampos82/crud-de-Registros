import { useState } from 'react';
import { obtenerRegistrosPorDni } from '../firebase';
import MostrarRegistros from './MostrarRegistros';
//import { validarDNI } from '../validaciones'; // Importa la función de validación

const BuscarRegistros = () => {
  const [dniBuscar, setDniBuscar] = useState('');
  const [registrosEncontrados, setRegistrosEncontrados] = useState([]);
  const [error, setError] = useState('');

  const handleBuscarRegistros = async () => {
    try {
      setError(''); // Limpiar el mensaje de error

      const registrosEncontrados = await obtenerRegistrosPorDni(dniBuscar);

      if (registrosEncontrados.length > 0) {
        setRegistrosEncontrados(registrosEncontrados);
      } else {
        setRegistrosEncontrados([]);
        setError('No se encontraron registros.');
      }
    } catch (error) {
      console.error('Error al buscar registros: ', error);
      setError('Error al buscar registros. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="BuscarRegistros">
      <h1>Buscar Registros por DNI</h1>
      <label>
        DNI a buscar:
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MostrarRegistros registros={registrosEncontrados} />
    </div>
  );
};

export default BuscarRegistros;
