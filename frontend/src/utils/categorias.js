export const CATEGORIAS = [
  {
    id: 'playa',
    nombre: 'Playa',
    emoji: '🏖️',
    color: '#0EA5E9',
  },
  {
    id: 'naturaleza',
    nombre: 'Naturaleza',
    emoji: '🌿',
    color: '#16A34A',
  },
  {
    id: 'historico',
    nombre: 'Historico',
    emoji: '🏛️',
    color: '#A855F7',
  },
  {
    id: 'gastronomico',
    nombre: 'Gastronomico',
    emoji: '🍽️',
    color: '#F97316',
  },
  {
    id: 'ciudad',
    nombre: 'Ciudad',
    emoji: '🌆',
    color: '#475569',
  },
]

export function obtenerCategoriaPorId(categoriaId) {
  return CATEGORIAS.find((categoria) => categoria.id === categoriaId) ?? null
}

export function obtenerEtiquetaCategoria(categoria) {
  return categoria ? `${categoria.emoji} ${categoria.nombre}` : 'Sin categoria'
}
