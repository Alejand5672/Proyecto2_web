import heroImg from './assets/hero.png'
import { destinosIniciales } from './services/destinosIniciales'
import { CATEGORIAS } from './utils/categorias'
import './App.css'

function App() {
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
          <strong>{destinosIniciales.length}</strong>
        </div>
      </section>
    </main>
  )
}

export default App
