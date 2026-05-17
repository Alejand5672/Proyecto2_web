import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import {
  guardarDestinos,
  obtenerDestinosGuardados,
} from './services/destinosStorage'
import { CATEGORIAS, obtenerCategoriaPorId } from './utils/categorias'
import './App.css'

function App() {
  const [destinos] = useState(() => obtenerDestinosGuardados())

  useEffect(() => {
    guardarDestinos(destinos)
  }, [destinos])

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

      <section className="destinations" aria-label="Destinos registrados">
        {destinos.map((destino) => (
          <article className="destination-card" key={destino.id}>
            <div>
              <span>{destino.pais}</span>
              <h2>{destino.nombre}</h2>
            </div>
            <dl>
              <div>
                <dt>Ciudad</dt>
                <dd>{destino.ciudad}</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>{destino.estado}</dd>
              </div>
              <div>
                <dt>Categoria</dt>
                <dd>{obtenerCategoriaPorId(destino.categoriaId)?.nombre}</dd>
              </div>
              <div>
                <dt>Calificacion</dt>
                <dd>{destino.calificacion}/5</dd>
              </div>
              <div>
                <dt>Dias</dt>
                <dd>{destino.atributos.diasEnDestino}</dd>
              </div>
              <div>
                <dt>Experiencia</dt>
                <dd>{destino.atributos.tipoExperiencia}</dd>
              </div>
            </dl>
            <p>{destino.atributos.notas}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
