/* eslint-disable react/prop-types */


const MostrarRegistros = ({ registros, seleccionarRegistro, registrosSeleccionados = [] }) => {
  return (
    <div className="mostrarRegistros">
      <h2>Registros Encontrados</h2>
      <ul>
        {registros.map((registro) => (
          <li key={registro.id}>
            <input
              type="checkbox"
              checked={registrosSeleccionados.includes(registro.id)}
              onChange={() => seleccionarRegistro(registro)}
            />
            <div style={{color:"red"}} className="mostrar">
                <div className="infoContainer">
                  <span>DNI: {registro.dni}</span>
                </div>
                <div className="infoContainer">
                  <span>Nombres: {registro.nombres}</span>
                </div>
                <div className="infoContainer">
                  <span>Apellidos: {registro.apellidos}</span>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};




export default MostrarRegistros;





