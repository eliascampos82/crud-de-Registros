import { useEffect, useState } from 'react';
import { obtenerRegistros } from '../firebase';


const ListarRegistros = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        // Obtener registros desde Firestore
        const registrosObtenidos = await obtenerRegistros();
        setRegistros(registrosObtenidos);
      } catch (error) {
        console.error('Error al obtener registros: ', error);
      }
    };

    // Llamar a la función para obtener registros al montar el componente
    fetchRegistros();
    console.log('ListarRegistros se ha montado.');
  }, []); // Array vacío indica que el useEffect solo se ejecuta al montar el componente

  return (
    <div className="listarRegistrosContainer">
      <h1>Listar Registros</h1>
      <ul className="registrosList">
        {registros.map((registro) => (
          <li key={registro.id} className="registroItem">
            {/* Mostrar información del registro, puedes personalizar según tus datos */}
            <p className="registroInfo">(DNI:) {registro.dni}, (Nombres:) {registro.nombres}, (Apellido:) {registro.apellidos}</p>
            {/* <p>Nombres: {registro.nombres}</p>
            <p>Apellido: {registro.apellido}</p> */}
            {/* Agrega más campos según la estructura de tus registros */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarRegistros;
