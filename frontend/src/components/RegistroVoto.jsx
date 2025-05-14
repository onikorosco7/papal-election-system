import { useState } from 'react';
import axios from 'axios';

const RegistroVoto = ({ candidatoId }) => {
  const [documentoIdentidad, setDocumentoIdentidad] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarVoto = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/api/votos', {
        documentoIdentidad,
        candidatoId
      });
      setMensaje(res.data.mensaje || '✅ Voto registrado con éxito');
      setDocumentoIdentidad('');
    } catch (error) {
      setMensaje('❌ ' + (error.response?.data?.error || 'Error al registrar voto'));
    }
  };

  return (
    <div className="container">
      <h2>Registro de Voto</h2>
      <form onSubmit={enviarVoto}>
        <input
          type="text"
          placeholder="Documento de Identidad"
          value={documentoIdentidad}
          onChange={(e) => setDocumentoIdentidad(e.target.value)}
        />
        <button type="submit">Votar</button>
      </form>

      {mensaje && <p style={{ marginTop: '10px' }}>{mensaje}</p>}
    </div>
  );
};

export default RegistroVoto;