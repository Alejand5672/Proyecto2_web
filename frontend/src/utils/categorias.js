export const CATEGORIAS = [
  {
    id: 'playa',
    nombre: 'Playa',
  },
  {
    id: 'naturaleza',
    nombre: 'Naturaleza',
  },
  {
    id: 'historico',
    nombre: 'Histórico',
  },
  {
    id: 'gastronomico',
    nombre: 'Gastronómico',
  },
  {
    id: 'ciudad',
    nombre: 'Ciudad',
  },
]

export function obtenerCategoriaPorId(categoriaId) {
  return CATEGORIAS.find((categoria) => categoria.id === categoriaId) ?? null
}
