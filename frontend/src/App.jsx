import { useCallback, useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import FormularioItem from './components/FormularioItem'
import ListaItems from './components/ListaItems'
import { useStorage } from './context/storageContext'
import { CATEGORIAS } from './utils/categorias'
import './App.css'

function App() {
  const { eliminarItem, guardarItem, modo, obtenerItems, setModo } = useStorage()
  const [destinos, setDestinos] = useState([])
  const [destinoEditando, setDestinoEditando] = useState(null)
  const [cargandoDestinos, setCargandoDestinos] = useState(true)
  const [errorDatos, setErrorDatos] = useState('')

  useEffect(() => {
    let componenteActivo = true

    async function cargarDestinos() {
      try {
        setCargandoDestinos(true)
        const destinosGuardados = await obtenerItems()

        if (componenteActivo) {
          setDestinos(destinosGuardados)
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

  const guardarDestino = useCallback(
    async (destinoGuardado) => {
      try {
        const destinoPersistido = await guardarItem(destinoGuardado)

        setDestinos((destinosActuales) => {
          const existeDestino = destinosActuales.some(
            (destino) => destino.id === destinoPersistido.id,
          )

          if (existeDestino) {
            return destinosActuales.map((destino) =>
              destino.id === destinoPersistido.id ? destinoPersistido : destino,
            )
          }

          return [destinoPersistido, ...destinosActuales]
        })

        setDestinoEditando(null)
        setErrorDatos('')
      } catch {
        setErrorDatos('No se pudo guardar el destino.')
      }
    },
    [guardarItem],
  )

  const eliminarDestino = useCallback(
    async (destinoId) => {
      try {
        const destinoArchivado = await eliminarItem(destinoId)

        setDestinos((destinosActuales) =>
          destinosActuales.map((destino) =>
            destino.id === destinoId
              ? {
                  ...destino,
                  activo: destinoArchivado?.activo ?? false,
                }
              : destino,
          ),
        )

        if (destinoEditando?.id === destinoId) {
          setDestinoEditando(null)
        }

        setErrorDatos('')
      } catch {
        setErrorDatos('No se pudo archivar el destino.')
      }
    },
    [destinoEditando, eliminarItem],
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

        setDestinos((destinosActuales) =>
          destinosActuales.map((destino) =>
            destino.id === destinoId ? destinoActualizado : destino,
          ),
        )
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
          <strong>{CATEGORIAS.map((categoria) => categoria.nombre).join(', ')}</strong>
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
      </section>

      {errorDatos && (
        <p className="data-message" role="alert">
          {errorDatos}
        </p>
      )}

      <section className="crud-layout" aria-label="Administrar destinos">
        <FormularioItem
          destinoEditando={destinoEditando}
          key={destinoEditando?.id ?? 'nuevo-destino'}
          onCancelar={() => setDestinoEditando(null)}
          onGuardar={guardarDestino}
        />

        <ListaItems
          destinos={destinos}
          onCambiarActivo={cambiarActivo}
          onEditar={setDestinoEditando}
          onEliminar={eliminarDestino}
        />
      </section>
    </main>
  )
}

export default App
