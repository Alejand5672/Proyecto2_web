export const filtrosIniciales = {
  filtroCategoria: 'todas',
  filtroEstado: 'todos',
  busqueda: '',
}

export const destinosInitialState = {
  destinos: [],
  actividad: [],
  ...filtrosIniciales,
}

function reemplazarDestino(destinos, destinoActualizado) {
  return destinos.map((destino) =>
    destino.id === destinoActualizado.id ? destinoActualizado : destino,
  )
}

export function destinosReducer(state, action) {
  switch (action.type) {
    case 'CARGAR_DESTINOS':
      return {
        ...state,
        destinos: action.payload,
      }

    case 'AGREGAR_DESTINO':
      return {
        ...state,
        destinos: [action.payload, ...state.destinos],
      }

    case 'ACTUALIZAR_DESTINO':
      return {
        ...state,
        destinos: reemplazarDestino(state.destinos, action.payload),
      }

    case 'ARCHIVAR_DESTINO':
      return {
        ...state,
        destinos: state.destinos.filter((destino) => destino.id !== action.payload),
      }

    case 'CAMBIAR_ESTADO_DESTINO':
      return {
        ...state,
        destinos: reemplazarDestino(state.destinos, action.payload),
      }

    case 'ACTUALIZAR_FILTROS':
      return {
        ...state,
        ...action.payload,
      }

    case 'LIMPIAR_FILTROS':
      return {
        ...state,
        ...filtrosIniciales,
      }

    case 'REGISTRAR_ACTIVIDAD_DESTINO':
      return {
        ...state,
        actividad: [action.payload, ...state.actividad],
      }

    default:
      return state
  }
}
