import React from 'react'
import {
  obtenerCategoriaPorId,
  obtenerEtiquetaCategoria,
} from '../utils/categorias'

function ItemCard({ destino, itemRef, onEditar, onEliminar, onCambiarActivo }) {
  const categoria = obtenerCategoriaPorId(destino.categoriaId)

  return (
    <article className="destination-card" ref={itemRef}>
      <div className="card-header">
        <div>
          <span>{destino.pais}</span>
          <h2>{destino.nombre}</h2>
        </div>
        <strong className={destino.activo ? 'status active' : 'status'}>
          {destino.activo ? 'Activo' : 'Inactivo'}
        </strong>
      </div>

      <dl>
        <div>
          <dt>Ciudad</dt>
          <dd>{destino.ciudad}</dd>
        </div>
        <div>
          <dt>Estado</dt>
          <dd>{destino.estado}</dd>
        </div>
        <div>
          <dt>Categoria</dt>
          <dd>
            <span
              className="category-badge"
              style={{ '--categoria-color': categoria?.color }}
            >
              {obtenerEtiquetaCategoria(categoria)}
            </span>
          </dd>
        </div>
        <div>
          <dt>Calificacion</dt>
          <dd>{destino.calificacion}/5</dd>
        </div>
        <div>
          <dt>Dias</dt>
          <dd>{destino.atributos.diasEnDestino}</dd>
        </div>
        <div>
          <dt>Experiencia</dt>
          <dd>{destino.atributos.tipoExperiencia}</dd>
        </div>
      </dl>

      <p>{destino.atributos.notas}</p>

      <div className="card-actions">
        <button
          className="button button--ghost"
          type="button"
          onClick={() => onEditar(destino)}
        >
          Editar
        </button>
        <button
          className="button button--ghost"
          type="button"
          onClick={() => onCambiarActivo(destino.id)}
        >
          {destino.activo ? 'Desactivar' : 'Activar'}
        </button>
        <button
          className="button button--danger"
          type="button"
          onClick={() => onEliminar(destino.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default React.memo(ItemCard)
