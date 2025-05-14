import { useState } from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegistroVotante from './components/RegistroVotante';
import RegistroVoto from './components/RegistroVoto';
import MostrarCandidatos from './components/MostrarCandidatos';
import MostrarGanadores from './components/MostrarGanadores';
import Inicio from './pages/Inicio';

import './index.css';

function App() {
  const [registroCompletado, setRegistroCompletado] = useState(false);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState('');

  const handleRegistroExitoso = () => {
    setRegistroCompletado(true);
  };

  const handleCandidatoSeleccionado = (id) => {
    setCandidatoSeleccionado(id);
  };

  return (
    <Router>
      <Navbar />
      <div>
        <h1>🕊️ Elección del nuevo</h1>

        <Routes>
          <Route path="/" element={<Inicio />} />
          
          <Route
            path="/registro-votante"
            element={<RegistroVotante onRegistroExitoso={handleRegistroExitoso} />}
          />
          
          <Route
            path="/votar"
            element={
              <>
                <MostrarCandidatos onCandidatoSeleccionado={handleCandidatoSeleccionado} />
                {candidatoSeleccionado && <RegistroVoto candidatoId={candidatoSeleccionado} />}
              </>
            }
          />
          <Route path="/ganadores" element={<MostrarGanadores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;