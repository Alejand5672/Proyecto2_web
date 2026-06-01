function normalizarApiBaseUrl(url) {
  const urlSinSlashFinal = url.replace(/\/$/, '')

  return urlSinSlashFinal.endsWith('/api')
    ? urlSinSlashFinal
    : `${urlSinSlashFinal}/api`
}

const API_BASE_URL = normalizarApiBaseUrl(
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
)
const ITEMS_ENDPOINT = `${API_BASE_URL}/items`

async function pedirJson(url, options = {}) {
  const respuesta = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`)
  }

  if (respuesta.status === 204) {
    return null
  }

  return respuesta.json()
}

function prepararItemParaApi(item) {
  return {
    nombre: item.nombre,
    categoriaId: item.categoriaId,
    pais: item.pais,
    ciudad: item.ciudad,
    estado: item.estado,
    calificacion: item.calificacion,
    atributos: item.atributos,
    activo: item.activo,
  }
}

export async function obtenerDestinosApi() {
  return pedirJson(ITEMS_ENDPOINT)
}

async function obtenerDestinoApiPorId(id) {
  return pedirJson(`${ITEMS_ENDPOINT}/${id}`)
}

export async function guardarDestinoApi(item) {
  const existeItem = await obtenerDestinoApiPorId(item.id)
    .then(() => true)
    .catch(() => false)

  const metodo = existeItem ? 'PUT' : 'POST'
  const url = existeItem ? `${ITEMS_ENDPOINT}/${item.id}` : ITEMS_ENDPOINT

  return pedirJson(url, {
    method: metodo,
    body: JSON.stringify(prepararItemParaApi(item)),
  })
}

export async function archivarDestinoApi(id) {
  return pedirJson(`${ITEMS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  })
}

export { API_BASE_URL }
