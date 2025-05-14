import React from 'react';
import './Inicio.css';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <h2 className="inicio-titulo">
        🕊️ <span>Bienvenido</span> a las <span>Elecciones del Papa</span>
      </h2>

      <p className="inicio-parrafo">
        En esta histórica elección, <strong>cada voto cuenta</strong>. Como miembro del cónclave, estás invitado a participar en la elección del próximo Papa,
        una figura espiritual que guiará a millones de personas alrededor del mundo.
      </p>

      <div className="inicio-seccion">
        <h3>📋 ¿Cómo funciona?</h3>
        <ul className="inicio-lista">
          <li>📌 Regístrate con tu nombre y documento de identidad.</li>
          <li>🗳️ Revisa la lista de candidatos disponibles.</li>
          <li>✅ Emite tu voto de manera segura y única.</li>
        </ul>
      </div>

      <div className="inicio-seccion">
        <h3>👑 ¿Quiénes son los candidatos?</h3>
        <p>
          Los cardenales nominados provienen de distintas partes del mundo, cada uno con su historia, sabiduría y liderazgo espiritual. Explora sus perfiles antes de emitir tu voto.
        </p>
      </div>

      <div className="inicio-seccion">
        <h3>🔐 Transparencia y Seguridad</h3>
        <p>
          Cada votante solo puede participar una vez. Los resultados son almacenados de forma segura y auditables. La integridad del proceso es nuestra máxima prioridad.
        </p>
      </div>

      <div className="inicio-seccion">
        <h3>🕯️ Un momento histórico</h3>
        <p>
          Participar en esta elección significa formar parte de una tradición milenaria. Tu elección influirá en el rumbo espiritual de la Iglesia y de millones de fieles.
        </p>
      </div>

      <div className="inicio-cta">
        <a href="/registro-votante" className="inicio-boton">
          🗳️ Emitir mi voto ahora
        </a>
      </div>
    </div>
  );
};

export default Inicio;