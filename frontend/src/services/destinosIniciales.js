import { crearDestino } from '../utils/destinoModelo'

export const destinosIniciales = [
  crearDestino({
    id: 'destino-1',
    nombre: 'Cancun',
    categoriaId: 'playa',
    pais: 'Mexico',
    ciudad: 'Cancun',
    estado: 'Quintana Roo',
    calificacion: 5,
    atributos: {
      diasEnDestino: 4,
      notas: 'Playas, descanso y actividades acuaticas.',
      tipoExperiencia: 'Relajacion',
    },
  }),
  crearDestino({
    id: 'destino-2',
    nombre: 'Ciudad de Mexico',
    categoriaId: 'ciudad',
    pais: 'Mexico',
    ciudad: 'Ciudad de Mexico',
    estado: 'Ciudad de Mexico',
    calificacion: 4,
    atributos: {
      diasEnDestino: 3,
      notas: 'Museos, comida y recorridos urbanos.',
      tipoExperiencia: 'Cultural',
    },
  }),
  crearDestino({
    id: 'destino-3',
    nombre: 'Chichen Itza',
    categoriaId: 'historico',
    pais: 'Mexico',
    ciudad: 'Tinum',
    estado: 'Yucatan',
    calificacion: 5,
    atributos: {
      diasEnDestino: 1,
      notas: 'Zona arqueologica y patrimonio historico.',
      tipoExperiencia: 'Historia',
    },
  }),
]
