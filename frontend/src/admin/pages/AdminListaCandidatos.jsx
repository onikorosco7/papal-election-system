import { useEffect, useState } from 'react';
import './admin.css';

function AdminListaCandidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Debes iniciar sesión primero');
          setLoading(false);
          return;
        }

        const res = await fetch('http://localhost:9000/api/candidatos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Error al obtener candidatos');
        }

        const data = await res.json();
        setCandidatos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCandidatos();
  }, []);

  if (loading) return <div className="admin-container">Cargando candidatos...</div>;
  if (error) return <div className="admin-container error">{error}</div>;

  return (
    <div className="admin-container">
      <h2>Lista de Candidatos</h2>
      {candidatos.length === 0 ? (
        <p>No hay candidatos registrados.</p>
      ) : (
        <ul className="candidato-lista">
          {candidatos.map((candidato) => (
            <li key={candidato._id} className="candidato-card">
              <h3>{candidato.nombre}</h3>
              <p><strong>Función Eclesiástica:</strong> {candidato.funcionEclesiastica}</p>
              <p><strong>Nacionalidad:</strong> {candidato.nacionalidad}</p>
              <p><strong>Votos:</strong> {candidato.votos}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminListaCandidatos;