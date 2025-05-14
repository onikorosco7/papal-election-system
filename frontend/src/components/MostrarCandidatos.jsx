import { useEffect, useState } from 'react';
import axios from 'axios';
import './MostrarCandidatos.css';

const MostrarCandidatos = ({ onCandidatoSeleccionado }) => {
  const [candidatos, setCandidatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCandidatos = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/candidatos');
        setCandidatos(response.data);
      } catch (error) {
        console.error('Error al obtener los candidatos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerCandidatos();
  }, []);

  return (
    <div className="candidatos-container">
      <h2 className="candidatos-titulo">Seleccione un Candidato</h2>
      {cargando ? (
        <p className="candidatos-cargando">⏳ Cargando candidatos...</p>
      ) : (
        <select
          className="candidatos-select"
          onChange={(e) => onCandidatoSeleccionado(e.target.value)}
          defaultValue=""
        >
          <option value="">Seleccione un candidato</option>
          {candidatos.map((candidato) => (
            <option key={candidato._id} value={candidato._id}>
              {candidato.nombre} - {candidato.funcion}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default MostrarCandidatos;