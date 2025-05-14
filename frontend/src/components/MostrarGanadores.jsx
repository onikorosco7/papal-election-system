import { useEffect, useState } from 'react';
import axios from 'axios';
import './MostrarGanadores.css';

const MostrarGanadores = () => {
  const [ganadores, setGanadores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerGanadores = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/ganadores');
        setGanadores(response.data);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener los ganadores:', error);
        setCargando(false);
      }
    };

    obtenerGanadores();
  }, []);

  return (
    <div className="ganadores-container">
      <h2 className="titulo">🏆 TOP 3 GANADORES</h2>
      {cargando ? (
        <p className="cargando">Cargando ganadores...</p>
      ) : (
        <div>
          {ganadores.length === 0 ? (
            <p className="no-ganadores">No hay candidatos disponibles.</p>
          ) : (
            <ul className="ganadores-list">
              {ganadores.map((candidato, index) => (
                <li className="ganador-item" key={candidato._id}>
                  <h3>{index + 1}° {candidato.nombre}</h3>
                  <p><strong>Función:</strong> {candidato.funcionEclesiastica}</p>
                  <p><strong>Nacionalidad:</strong> {candidato.nacionalidad}</p>
                  <p><strong>Votos:</strong> {candidato.votos}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MostrarGanadores;