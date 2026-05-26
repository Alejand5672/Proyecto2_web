import { useState } from 'react'
import { CATEGORIAS } from '../utils/categorias'
import { crearDestino, destinoInicial } from '../utils/destinoModelo'

const camposIniciales = {
  nombre: '',
  categoriaId: destinoInicial.categoriaId,
  pais: '',
  ciudad: '',
  estado: '',
  calificacion: 5,
  diasEnDestino: 1,
  tipoExperiencia: '',
  notas: '',
  activo: true,
}

function prepararCampos(destino) {
  if (!destino) {
    return camposIniciales
  }

  return {
    nombre: destino.nombre,
    categoriaId: destino.categoriaId,
    pais: destino.pais,
    ciudad: destino.ciudad,
    estado: destino.estado,
    calificacion: destino.calificacion,
    diasEnDestino: destino.atributos.diasEnDestino,
    tipoExperiencia: destino.atributos.tipoExperiencia,
    notas: destino.atributos.notas,
    activo: destino.activo,
  }
}

function FormularioItem({ destinoEditando, nombreInputRef, onGuardar, onCancelar }) {
  const [campos, setCampos] = useState(() => prepararCampos(destinoEditando))

  function actualizarCampo(evento) {
    const { name, type, checked, value } = evento.target
    const nuevoValor = type === 'checkbox' ? checked : value

    setCampos((camposActuales) => ({
      ...camposActuales,
      [name]: nuevoValor,
    }))
  }

  function enviarFormulario(evento) {
    evento.preventDefault()

    const destino = crearDestino({
      id: destinoEditando?.id ?? crypto.randomUUID(),
      nombre: campos.nombre.trim(),
      categoriaId: campos.categoriaId,
      pais: campos.pais.trim(),
      ciudad: campos.ciudad.trim(),
      estado: campos.estado.trim(),
      calificacion: Number(campos.calificacion),
      atributos: {
        diasEnDestino: Number(campos.diasEnDestino),
        tipoExperiencia: campos.tipoExperiencia.trim(),
        notas: campos.notas.trim(),
      },
      activo: campos.activo,
    })

    onGuardar(destino)
    setCampos(camposIniciales)
  }

  return (
    <form className="item-form" onSubmit={enviarFormulario}>
      <div className="form-header">
        <div>
          <span>CRUD LocalStorage</span>
          <h2>{destinoEditando ? 'Editar destino' : 'Nuevo destino'}</h2>
        </div>
        {destinoEditando && (
          <button className="button button--ghost" type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>

      <div className="form-grid">
        <label>
          Nombre
          <input
            name="nombre"
            ref={nombreInputRef}
            value={campos.nombre}
            onChange={actualizarCampo}
            required
          />
        </label>

        <label>
          Categoria
          <select
            name="categoriaId"
            value={campos.categoriaId}
            onChange={actualizarCampo}
          >
            {CATEGORIAS.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Pais
          <input
            name="pais"
            value={campos.pais}
            onChange={actualizarCampo}
            required
          />
        </label>

        <label>
          Ciudad
          <input
            name="ciudad"
            value={campos.ciudad}
            onChange={actualizarCampo}
            required
          />
        </label>

        <label>
          Estado
          <input
            name="estado"
            value={campos.estado}
            onChange={actualizarCampo}
            required
          />
        </label>

        <label>
          Calificacion
          <input
            min="1"
            max="5"
            name="calificacion"
            type="number"
            value={campos.calificacion}
            onChange={actualizarCampo}
            required
          />
        </label>

        <label>
          Dias en destino
          <input
            min="1"
            name="diasEnDestino"
            type="number"
            value={campos.diasEnDestino}
            onChange={actualizarCampo}
            required
          />
        </label>

        <label>
          Tipo de experiencia
          <input
            name="tipoExperiencia"
            value={campos.tipoExperiencia}
            onChange={actualizarCampo}
            required
          />
        </label>
      </div>

      <label>
        Notas
        <textarea
          name="notas"
          value={campos.notas}
          onChange={actualizarCampo}
          required
        />
      </label>

      <label className="checkbox-field">
        <input
          checked={campos.activo}
          name="activo"
          type="checkbox"
          onChange={actualizarCampo}
        />
        Destino activo
      </label>

      <button className="button" type="submit">
        {destinoEditando ? 'Guardar cambios' : 'Agregar destino'}
      </button>
    </form>
  )
}

export default FormularioItem
