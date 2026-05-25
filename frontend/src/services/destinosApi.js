const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
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

export async function guardarDestinoApi(item) {
  const destinos = await obtenerDestinosApi()
  const existeItem = destinos.some((destino) => String(destino.id) === String(item.id))
  const metodo = existeItem ? 'PUT' : 'POST'
  const url = existeItem ? `${ITEMS_ENDPOINT}/${item.id}` : ITEMS_ENDPOINT

  return pedirJson(url, {
    method: metodo,
    body: JSON.stringify(prepararItemParaApi(item)),
  })
}

export async function archivarDestinoApi(id) {
  const destinos = await obtenerDestinosApi()
  const destino = destinos.find((item) => String(item.id) === String(id))

  if (!destino) {
    throw new Error('Destino no encontrado')
  }

  return pedirJson(`${ITEMS_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(
      prepararItemParaApi({
        ...destino,
        activo: false,
      }),
    ),
  })
}

export { API_BASE_URL }
