import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import FormularioItem from './components/FormularioItem'
import ListaItems from './components/ListaItems'
import {
  guardarDestinos,
  obtenerDestinosGuardados,
} from './services/destinosStorage'
import { CATEGORIAS } from './utils/categorias'
import './App.css'

function App() {
  const [destinos, setDestinos] = useState(() => obtenerDestinosGuardados())
  const [destinoEditando, setDestinoEditando] = useState(null)

  useEffect(() => {
    guardarDestinos(destinos)
  }, [destinos])

  function guardarDestino(destinoGuardado) {
    setDestinos((destinosActuales) => {
      const existeDestino = destinosActuales.some(
        (destino) => destino.id === destinoGuardado.id,
      )

      if (existeDestino) {
        return destinosActuales.map((destino) =>
          destino.id === destinoGuardado.id ? destinoGuardado : destino,
        )
      }

      return [destinoGuardado, ...destinosActuales]
    })

    setDestinoEditando(null)
  }

  function eliminarDestino(destinoId) {
    setDestinos((destinosActuales) =>
      destinosActuales.filter((destino) => destino.id !== destinoId),
    )

    if (destinoEditando?.id === destinoId) {
      setDestinoEditando(null)
    }
  }

  function cambiarActivo(destinoId) {
    setDestinos((destinosActuales) =>
      destinosActuales.map((destino) =>
        destino.id === destinoId
          ? {
              ...destino,
              activo: !destino.activo,
            }
          : destino,
      ),
    )
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
          <strong>{destinos.length}</strong>
        </div>
      </section>

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
