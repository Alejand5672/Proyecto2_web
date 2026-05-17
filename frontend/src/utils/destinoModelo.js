export const destinoInicial = {
  id: '',
  nombre: '',
  categoriaId: 'ciudad',
  pais: '',
  ciudad: '',
  estado: '',
  calificacion: 0,
  atributos: {
    diasEnDestino: 0,
    notas: '',
    tipoExperiencia: '',
  },
  activo: true,
}

export function crearDestino(datos = {}) {
  return {
    ...destinoInicial,
    ...datos,
    atributos: {
      ...destinoInicial.atributos,
      ...(datos.atributos ?? {}),
    },
  }
}
