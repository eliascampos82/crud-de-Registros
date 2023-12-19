import { useState } from 'react';
import { obtenerRegistrosPorDni, modificarRegistro } from '../firebase';
import PropTypes from 'prop-types';

const ModificarRegistros = ({ onRegistrosActualizados }) => {
  const [dni, setDni] = useState('');
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
  });
  const [usuarioNoEncontrado, setUsuarioNoEncontrado] = useState(false);
  const [dniDuplicado, setDniDuplicado] = useState(false);
  const [registroModificado, setRegistroModificado] = useState(false);

  const dniRegex = /^\d{8}$/;
  const nombreApellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

  const handleBuscarUsuario = async () => {
    try {
      console.log('Buscando usuario con DNI:', dni);
      const registrosObtenidos = await obtenerRegistrosPorDni(dni);
      console.log('Registros obtenidos:', registrosObtenidos);

      if (registrosObtenidos && registrosObtenidos.length > 0) {
        const primerRegistro = registrosObtenidos[0];
        setRegistroSeleccionado(primerRegistro);
        setNuevosDatos({
          dni: primerRegistro.dni || '',
          nombres: primerRegistro.nombres || '',
          apellidos: primerRegistro.apellidos || '',
        });
        setUsuarioNoEncontrado(false);
        setDniDuplicado(false);
      } else {
        setRegistroSeleccionado(null);
        setNuevosDatos({
          dni: '',
          nombres: '',
          apellidos: '',
        });
        setUsuarioNoEncontrado(true);
        setDniDuplicado(false);
      }

      // Limpiar el campo DNI
      setDni('');
    } catch (error) {
      console.error('Error al buscar usuario: ', error);
      alert('Error al buscar usuario');
    }
  };

  const handleModificarRegistro = async () => {
    try {
      if (!registroSeleccionado) {
        alert('Selecciona un registro antes de modificar.');
        return;
      }

      if (!dniRegex.test(nuevosDatos.dni)) {
        alert('Ingrese un DNI válido de 8 números.');
        return;
      }

      if (!nombreApellidoRegex.test(nuevosDatos.nombres) || !nombreApellidoRegex.test(nuevosDatos.apellidos)) {
        alert('Ingrese nombres y apellidos válidos (solo letras y espacios).');
        return;
      }

      console.log('Modificando registro:', registroSeleccionado.id);
      console.log('Nuevos datos:', nuevosDatos);

      const datosActualizados = {
        dni: nuevosDatos.dni,
        nombres: nuevosDatos.nombres,
        apellidos: nuevosDatos.apellidos,
      };

      await modificarRegistro(registroSeleccionado.id, datosActualizados);

      const registrosActualizados = await obtenerRegistrosPorDni('');
      onRegistrosActualizados(registrosActualizados);

      setRegistroSeleccionado(null);
      setNuevosDatos({
        dni: '',
        nombres: '',
        apellidos: '',
      });
      setRegistroModificado(true);
      setUsuarioNoEncontrado(false);
      setDniDuplicado(false);
    } catch (error) {
      console.error('Error al modificar registro: ', error);
      alert('Error al modificar registro');
    }
  };

  return (
    <div className="ModificarRegistros">
      <h1 style={{ fontSize: '20px', marginBottom: '5px',marginTop:"-15px"}}>Modificar Registros</h1>
      <label>
        Ingrese DNI:
        <input style={{marginBottom:"2px"}}
          type="text"
          value={dni}
          onChange={(e) => {
            if (/^\d{0,8}$/.test(e.target.value)) {
              setDni(e.target.value);
            }
          }}
          placeholder="Ingrese su DNI"
        />
      </label>
      <button onClick={handleBuscarUsuario}>Buscar Usuario</button>

      {usuarioNoEncontrado && <p>Usuario no encontrado</p>}
      {dniDuplicado && <p>¡DNI duplicado! Ingrese un DNI diferente.</p>}
      {registroModificado && <p>Registro modificado con éxito</p>}

      {registroSeleccionado && (
        <div>
          <h3>Registro Encontrado</h3>
          <p style={{ fontSize: '14px' }}>DNI: {registroSeleccionado.dni}</p>
          <p style={{ fontSize: '14px' }}>Nombres: {registroSeleccionado.nombres}</p>
          <p style={{ fontSize: '14px', marginBottom: '5px' }}>Apellidos: {registroSeleccionado.apellidos}</p>

          <h3>Modificar Registro</h3>
          <label>
            Nuevo DNI:
            <input 
              type="text"
              value={nuevosDatos.dni}
              onChange={(e) => {
                if (/^\d{0,8}$/.test(e.target.value)) {
                  setNuevosDatos({ ...nuevosDatos, dni: e.target.value });
                }
              }}
            />
          </label>
          <br />
          <label>
            Nuevos Nombres:
            <input
              type="text"
              value={nuevosDatos.nombres}
              onChange={(e) => {
                if (/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/.test(e.target.value)) {
                  setNuevosDatos({ ...nuevosDatos, nombres: e.target.value });
                }
              }}
            />
          </label>
          <br />
          <label>
            Nuevos Apellidos:
            <input
              type="text"
              value={nuevosDatos.apellidos}
              onChange={(e) => {
                if (/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/.test(e.target.value)) {
                  setNuevosDatos({ ...nuevosDatos, apellidos: e.target.value });
                }
              }}
            />
          </label>
          <br />
          <button onClick={handleModificarRegistro}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

ModificarRegistros.propTypes = {
  onRegistrosActualizados: PropTypes.func.isRequired,
};

export default ModificarRegistros;
