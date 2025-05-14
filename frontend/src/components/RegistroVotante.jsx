// RegistroVotante.jsx
import { useState } from 'react';
import axios from 'axios';

const RegistroVotante = () => {
  const [nombre, setNombre] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('dni');
  const [documentoIdentidad, setDocumentoIdentidad] = useState('');
  const [mensaje, setMensaje] = useState('');

  const validarDocumento = (tipo, valor) => {
    if (tipo === 'dni') {
      return /^\d{8}$/.test(valor); // Ej: Perú
    } else if (tipo === 'pasaporte') {
      return /^[A-Z0-9]{6,9}$/i.test(valor); // Formato general
    }
    return false;
  };

  const registrar = async (e) => {
    e.preventDefault();

    if (!validarDocumento(tipoDocumento, documentoIdentidad)) {
      setMensaje('❌ Documento inválido para el tipo seleccionado.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:9000/api/votantes', {
        nombre,
        documentoIdentidad,
        tipoDocumento,  // Incluir tipo de documento aquí
      });
      setMensaje('✅ Votante registrado correctamente');
      setNombre('');
      setDocumentoIdentidad('');
    } catch (error) {
      setMensaje('❌ Error: ' + (error.response?.data?.error || 'Error al registrar'));
    }
  };

  return (
    <div className="container">
      <h2>Registro de Votante</h2>
      <form onSubmit={registrar}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        
        <select
          value={tipoDocumento}
          onChange={(e) => setTipoDocumento(e.target.value)}
        >
          <option value="dni">DNI</option>
          <option value="pasaporte">Pasaporte</option>
        </select>

        <input
          type="text"
          placeholder="Número de documento"
          value={documentoIdentidad}
          onChange={(e) => setDocumentoIdentidad(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>
      </form>

      {mensaje && <p style={{ marginTop: '10px' }}>{mensaje}</p>}
    </div>
  );
};

export default RegistroVotante;