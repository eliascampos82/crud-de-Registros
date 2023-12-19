
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import AgregarRegistro from './componentes/AgregarRegistro';
import BuscarRegistros from './componentes/BuscarRegistros';
import ModificarRegistros from './componentes/ModificarRegistros';
import ListarRegistros from './componentes/ListarRegistros';
import EliminarRegistros from './componentes/EliminarRegistros';
import { obtenerRegistros } from './firebase';
import Fondo from './componentes/Fondo';
import Footer from './componentes/Footer';

const App = () => {
  const [registros, setRegistros] = useState([]);

  const handleRegistrosActualizados = async () => {
    try {
      // Obtener registros desde Firestore después de la modificación
      const registrosObtenidos = await obtenerRegistros();
      setRegistros(registrosObtenidos);
    } catch (error) {
      console.error('Error al obtener registros después de la modificación: ', error);
    }
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Fondo />} />
          <Route path="/inicio" element={<Fondo />} />
          <Route path="/agregarRegistro" element={<AgregarRegistro />} />
          <Route path="/buscarRegistro" element={<BuscarRegistros />} />
          <Route path="/modificarRegistros" element={<ModificarRegistros onRegistrosActualizados={handleRegistrosActualizados} />} />
          <Route path="/listarRegistros" element={<ListarRegistros registros={registros} />} />
          <Route path="/eliminarRegistros" element={<EliminarRegistros onRegistrosActualizados={handleRegistrosActualizados} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    
  );
};

export default App;
