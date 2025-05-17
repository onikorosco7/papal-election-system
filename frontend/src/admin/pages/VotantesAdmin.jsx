import { useEffect, useState } from 'react';
import './admin.css';

function VotantesAdmin() {
  const [votantes, setVotantes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/api/votantes')
      .then(res => res.json())
      .then(data => setVotantes(data))
      .catch(err => console.error('Error cargando votantes:', err));
  }, []);

  return (
    <div className="admin-container">
      <h2>Lista de Votantes</h2>
      <ul>
        {votantes.map(v => (
          <li key={v._id}>{v.nombre} - {v.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default VotantesAdmin;