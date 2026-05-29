import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import heroImg from './assets/hero.png'
import FormularioItem from './components/FormularioItem'
import GraficasDestinos from './components/GraficasDestinos'
import ListaItems from './components/ListaItems'
import { useStorage } from './context/storageContext'
import { useTheme } from './context/themeContext'
import {
  destinosInitialState,
  destinosReducer,
} from './reducers/destinosReducer'
import { CATEGORIAS, obtenerEtiquetaCategoria } from './utils/categorias'
import './App.css'

const MS_POR_DIA = 24 * 60 * 60 * 1000

function crearActividadDestino(tipo, destino) {
  return {
    id: crypto.randomUUID(),
    tipo,
    destinoId: destino.id,
    destinoNombre: destino.nombre,
    fecha: new Date().toISOString(),
  }
}

function normalizarTexto(texto) {
  return texto.toLowerCase().trim()
}

function App() {
  const { eliminarItem, guardarItem, modo, obtenerItems, setModo } = useStorage()
  const { alternarTema, setTema, tema } = useTheme()
  const [destinosState, dispatchDestinos] = useReducer(
    destinosReducer,
    destinosInitialState,
  )
  const { destinos } = destinosState
  const [destinoEditando, setDestinoEditando] = useState(null)
  const [cargandoDestinos, setCargandoDestinos] = useState(true)
  const [errorDatos, setErrorDatos] = useState('')
  const [ultimoDestinoId, setUltimoDestinoId] = useState(null)
  // useRef: enfoca el campo nombre despues de guardar y con Ctrl + N.
  const nombreInputRef = useRef(null)
  // useRef: apunta al destino recien agregado para hacer scroll automatico.
  const ultimoDestinoRef = useRef(null)

  useEffect(() => {
    let componenteActivo = true

    async function cargarDestinos() {
      try {
        setCargandoDestinos(true)
        const destinosGuardados = await obtenerItems()

        if (componenteActivo) {
          dispatchDestinos({
            type: 'CARGAR_DESTINOS',
            payload: destinosGuardados,
          })
          setErrorDatos('')
        }
      } catch {
        if (componenteActivo) {
          setErrorDatos('No se pudieron cargar los destinos.')
        }
      } finally {
        if (componenteActivo) {
          setCargandoDestinos(false)
        }
      }
    }

    cargarDestinos()

    return () => {
      componenteActivo = false
    }
  }, [obtenerItems])

  const destinosFiltrados = useMemo(() => {
    const busquedaNormalizada = normalizarTexto(destinosState.busqueda)

    return destinos.filter(
      (destino) =>
        (destinosState.filtroCategoria === 'todas' ||
          destino.categoriaId === destinosState.filtroCategoria) &&
        (destinosState.filtroEstado === 'todos' ||
          (destinosState.filtroEstado === 'activos' && destino.activo) ||
          (destinosState.filtroEstado === 'inactivos' && !destino.activo)) &&
        destino.nombre.toLowerCase().includes(busquedaNormalizada),
    )
  }, [
    destinos,
    destinosState.busqueda,
    destinosState.filtroCategoria,
    destinosState.filtroEstado,
  ])

  const destinosFiltradosIds = useMemo(
    () => new Set(destinosFiltrados.map((destino) => destino.id)),
    [destinosFiltrados],
  )

  const actividadPorDia = useMemo(() => {
    const hoy = new Date()
    const dias = Array.from({ length: 7 }, (_, index) => {
      const fecha = new Date(hoy.getTime() - (6 - index) * MS_POR_DIA)
      const clave = fecha.toISOString().slice(0, 10)

      return {
        clave,
        dia: fecha.toLocaleDateString('es-MX', {
          day: '2-digit',
          month: 'short',
        }),
        actividad: 0,
      }
    })

    const diasPorClave = new Map(dias.map((dia) => [dia.clave, dia]))

    destinosState.actividad.forEach((registro) => {
      if (!destinosFiltradosIds.has(registro.destinoId)) {
        return
      }

      const dia = diasPorClave.get(registro.fecha.slice(0, 10))

      if (dia) {
        dia.actividad += 1
      }
    })

    return dias
  }, [destinosFiltradosIds, destinosState.actividad])

  const destinosPorCategoria = useMemo(
    () =>
      CATEGORIAS.map((categoria) => ({
        categoriaId: categoria.id,
        categoria: categoria.nombre,
        color: categoria.color,
        total: destinosFiltrados.filter(
          (destino) => destino.categoriaId === categoria.id,
        ).length,
      })).filter((categoria) => categoria.total > 0),
    [destinosFiltrados],
  )

  const diasPorCategoria = useMemo(
    () =>
      CATEGORIAS.map((categoria) => ({
        categoriaId: categoria.id,
        categoria: categoria.nombre,
        color: categoria.color,
        dias: destinosFiltrados
          .filter((destino) => destino.categoriaId === categoria.id)
          .reduce(
            (total, destino) => total + destino.atributos.diasEnDestino,
            0,
          ),
      })).filter((categoria) => categoria.dias > 0),
    [destinosFiltrados],
  )

  const cambiarFiltros = useCallback((evento) => {
    const { name, value } = evento.target

    dispatchDestinos({
      type: 'ACTUALIZAR_FILTROS',
      payload: {
        [name]: value,
      },
    })
  }, [])

  const limpiarFiltros = useCallback(() => {
    dispatchDestinos({ type: 'LIMPIAR_FILTROS' })
  }, [])

  const guardarDestino = useCallback(
    async (destinoGuardado) => {
      try {
        const esDestinoNuevo = !destinos.some(
          (destino) => destino.id === destinoGuardado.id,
        )
        const destinoPersistido = await guardarItem(destinoGuardado)

        dispatchDestinos({
          type: esDestinoNuevo ? 'AGREGAR_DESTINO' : 'ACTUALIZAR_DESTINO',
          payload: destinoPersistido,
        })
        dispatchDestinos({
          type: 'REGISTRAR_ACTIVIDAD_DESTINO',
          payload: crearActividadDestino(
            esDestinoNuevo ? 'agregado' : 'actualizado',
            destinoPersistido,
          ),
        })

        setDestinoEditando(null)
        setErrorDatos('')
        nombreInputRef.current?.focus()

        if (esDestinoNuevo) {
          setUltimoDestinoId(destinoPersistido.id)
        }
      } catch {
        setErrorDatos('No se pudo guardar el destino.')
      }
    },
    [destinos, guardarItem],
  )

  const eliminarDestino = useCallback(
    async (destinoId) => {
      try {
        const destinoArchivado = await eliminarItem(destinoId)
        const destinoActual = destinos.find((destino) => destino.id === destinoId)

        dispatchDestinos({
          type: 'ARCHIVAR_DESTINO',
          payload: destinoId,
        })

        if (destinoActual || destinoArchivado) {
          dispatchDestinos({
            type: 'REGISTRAR_ACTIVIDAD_DESTINO',
            payload: crearActividadDestino(
              'archivado',
              destinoArchivado ?? destinoActual,
            ),
          })
        }

        if (destinoEditando?.id === destinoId) {
          setDestinoEditando(null)
        }

        setErrorDatos('')
      } catch {
        setErrorDatos('No se pudo archivar el destino.')
      }
    },
    [destinoEditando, destinos, eliminarItem],
  )

  const cambiarActivo = useCallback(
    async (destinoId) => {
      const destinoActual = destinos.find((destino) => destino.id === destinoId)

      if (!destinoActual) {
        return
      }

      try {
        const destinoActualizado = await guardarItem({
          ...destinoActual,
          activo: !destinoActual.activo,
        })

        dispatchDestinos({
          type: 'CAMBIAR_ESTADO_DESTINO',
          payload: destinoActualizado,
        })
        dispatchDestinos({
          type: 'REGISTRAR_ACTIVIDAD_DESTINO',
          payload: crearActividadDestino('estado cambiado', destinoActualizado),
        })
        setErrorDatos('')
      } catch {
        setErrorDatos('No se pudo cambiar el estado del destino.')
      }
    },
    [destinos, guardarItem],
  )

  function cambiarModo(nuevoModo) {
    setDestinoEditando(null)
    setErrorDatos('')
    setModo(nuevoModo)
  }

  function cambiarTema(nuevoTema) {
    setTema(nuevoTema)
  }

  useEffect(() => {
    if (!ultimoDestinoId) {
      return
    }

    ultimoDestinoRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [ultimoDestinoId, destinos])

  useEffect(() => {
    function estaEscribiendo(elemento) {
      const etiqueta = elemento?.tagName
      return (
        elemento?.isContentEditable ||
        etiqueta === 'INPUT' ||
        etiqueta === 'SELECT' ||
        etiqueta === 'TEXTAREA'
      )
    }

    const handler = (evento) => {
      if (evento.ctrlKey && evento.key.toLowerCase() === 'n') {
        evento.preventDefault()
        nombreInputRef.current?.focus()
        return
      }

      if (!estaEscribiendo(evento.target) && evento.key.toLowerCase() === 't') {
        alternarTema()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [alternarTema])

  return (
    <main className="app">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Fase 1</p>
          <h1>Viajes y Lugares</h1>
        </div>

        <img
          className="hero__image"
          src={heroImg}
          alt="Ilustracion de destinos de viaje"
        />
      </section>

      <section className="summary" aria-label="Datos base del proyecto">
        <div>
          <span>Item</span>
          <strong>Destino visitado</strong>
        </div>
        <div>
          <span>Registro</span>
          <strong>Días en ese destino</strong>
        </div>
        <div>
          <span>Categorías</span>
          <strong>
            {CATEGORIAS.map((categoria) =>
              obtenerEtiquetaCategoria(categoria),
            ).join(', ')}
          </strong>
        </div>
        <div>
          <span>Destinos base</span>
          <strong>{cargandoDestinos ? 'Cargando...' : destinos.length}</strong>
        </div>
        <div>
          <span>Storage</span>
          <div className="mode-switch" aria-label="Cambiar modo de almacenamiento">
            <button
              className={modo === 'local' ? 'mode-switch__option active' : 'mode-switch__option'}
              type="button"
              onClick={() => cambiarModo('local')}
            >
              Local
            </button>
            <button
              className={modo === 'api' ? 'mode-switch__option active' : 'mode-switch__option'}
              type="button"
              onClick={() => cambiarModo('api')}
            >
              API
            </button>
          </div>
        </div>
        <div>
          <span>Tema</span>
          <div className="mode-switch" aria-label="Cambiar tema visual">
            <button
              className={tema === 'claro' ? 'mode-switch__option active' : 'mode-switch__option'}
              type="button"
              onClick={() => cambiarTema('claro')}
            >
              Claro
            </button>
            <button
              className={tema === 'oscuro' ? 'mode-switch__option active' : 'mode-switch__option'}
              type="button"
              onClick={() => cambiarTema('oscuro')}
            >
              Oscuro
            </button>
          </div>
        </div>
      </section>

      {errorDatos && (
        <p className="data-message" role="alert">
          {errorDatos}
        </p>
      )}

      <section className="filters-panel" aria-label="Filtrar destinos">
        <label>
          Categoria
          <select
            name="filtroCategoria"
            value={destinosState.filtroCategoria}
            onChange={cambiarFiltros}
          >
            <option value="todas">Todas</option>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {obtenerEtiquetaCategoria(categoria)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Estado
          <select
            name="filtroEstado"
            value={destinosState.filtroEstado}
            onChange={cambiarFiltros}
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
          </select>
        </label>

        <label>
          Busqueda
          <input
            name="busqueda"
            type="search"
            value={destinosState.busqueda}
            onChange={cambiarFiltros}
            placeholder="Buscar por destino"
          />
        </label>

        <div className="filters-panel__actions">
          <span>
            {destinosFiltrados.length} de {destinos.length}
          </span>
          <button
            className="button button--ghost"
            type="button"
            onClick={limpiarFiltros}
          >
            Limpiar
          </button>
        </div>
      </section>

      <GraficasDestinos
        actividadPorDia={actividadPorDia}
        destinosPorCategoria={destinosPorCategoria}
        diasPorCategoria={diasPorCategoria}
      />

      <section className="crud-layout" aria-label="Administrar destinos">
        <FormularioItem
          destinoEditando={destinoEditando}
          key={destinoEditando?.id ?? 'nuevo-destino'}
          nombreInputRef={nombreInputRef}
          onCancelar={() => setDestinoEditando(null)}
          onGuardar={guardarDestino}
        />

        <ListaItems
          destinos={destinosFiltrados}
          ultimoDestinoId={ultimoDestinoId}
          ultimoDestinoRef={ultimoDestinoRef}
          onCambiarActivo={cambiarActivo}
          onEditar={setDestinoEditando}
          onEliminar={eliminarDestino}
        />
      </section>
    </main>
  )
}

export default App
