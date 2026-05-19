import ItemCard from './ItemCard'

function ListaItems({ destinos, onEditar, onEliminar, onCambiarActivo }) {
  return (
    <section className="destinations" aria-label="Destinos registrados">
      {destinos.map((destino) => (
        <ItemCard
          destino={destino}
          key={destino.id}
          onCambiarActivo={() => onCambiarActivo(destino.id)}
          onEditar={() => onEditar(destino)}
          onEliminar={() => onEliminar(destino.id)}
        />
      ))}
    </section>
  )
}

export default ListaItems
