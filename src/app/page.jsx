'use client'

import 'font-awesome/css/font-awesome.min.css'; 
import React, { useState } from 'react';
import './comentarios.css';

export default function ChatDeComentarios() {
  const [comentarios, setComentarios] = useState([
    { id: 1, usuario: 'Juan', texto: 'Me parece una buena elección.' },
    { id: 2, usuario: 'Pedro', texto: 'No te arrepentirás.' },
    { id: 3, usuario: 'Emmanuel', texto: '¿Dónde lo adquiriste?' },
    { id: 4, usuario: 'Alan', texto: 'Muy buena compra.' },
    { id: 5, usuario: 'Dinocio', texto: 'tiene un estilo bueno' },
    { id: 6, usuario: 'Eduardo', texto: 'el color es agradable' },
  ]);

  const [nuevoComentario, setNuevoComentario] = useState({
    usuario: '',
    texto: '',
  });

  const [comentarioEditado, setComentarioEditado] = useState({
    id: null,
    texto: '',
  });

  const manejarCambioComentario = (evento) => {
    if (comentarioEditado.id !== null) {
      setComentarioEditado({ ...comentarioEditado, texto: evento.target.value });
    } else {
      setNuevoComentario({ ...nuevoComentario, texto: evento.target.value });
    }
  };

  const manejarCambioUsuario = (evento) => {
    setNuevoComentario({ ...nuevoComentario, usuario: evento.target.value });
  };

  const manejarAgregarComentario = () => {
    if (nuevoComentario.texto.trim() !== '' && nuevoComentario.usuario.trim() !== '') {
      const nuevoId = comentarios.length + 1;
      setComentarios([...comentarios, { id: nuevoId, ...nuevoComentario }]);
      setNuevoComentario({ usuario: '', texto: '' });
    }
  };

  const manejarEditarComentario = () => {
    if (comentarioEditado.texto.trim() !== '') {
      const comentariosActualizados = comentarios.map((comentario) =>
        comentario.id === comentarioEditado.id
          ? { ...comentario, texto: comentarioEditado.texto }
          : comentario
      );
      setComentarios(comentariosActualizados);
      setComentarioEditado({ id: null, texto: '' });
    }
  };

  const manejarEliminarComentario = (idComentario) => {
    const comentariosActualizados = comentarios.filter((comentario) => comentario.id !== idComentario);
    setComentarios(comentariosActualizados);
  };

  return (
    <div className="chat-de-comentarios">
      <h2>Chat de Comentarios</h2>
      <div className="comentarios">
        <ul>
            {comentarios.map((comentario) => (
            <li key={comentario.id}>
           <div className="comentario">
           <div className="usuario">
           <i className="fa fa-user" /> {comentario.usuario}:
        </div>
            {comentarioEditado.id === comentario.id ? (
            <div className="editar-comentario">
            <input
            type="text"
            value={comentarioEditado.texto}
            onChange={manejarCambioComentario}
          />
          <button onClick={manejarEditarComentario}>Guardar</button>
          </div>
          ) : (
          <div className="texto-comentario">{comentario.texto}</div>
           )}
          <div className="acciones">
           {comentarioEditado.id === comentario.id ? (
             <></>
            ) : (
            <>
            <button onClick={() => {setComentarioEditado({ id: comentario.id, texto: comentario.texto }); }}>Editar </button>
            <button onClick={() => manejarEliminarComentario(comentario.id)}> Eliminar</button>
                 </>
                 )}
             </div>
           </div>
          </li>
         ))}
        </ul>
      </div>
      <div className="nuevo-comentario">
        <input
          type="text"
          placeholder="Usuario"
          value={nuevoComentario.usuario}
          onChange={manejarCambioUsuario}
        />
        <input
          type="text"
          placeholder="Agregar un comentario..."
          value={nuevoComentario.texto}
          onChange={manejarCambioComentario}
        />
        <button onClick={manejarAgregarComentario}>Agregar Comentario</button>
      </div>
    </div>
  );
}
