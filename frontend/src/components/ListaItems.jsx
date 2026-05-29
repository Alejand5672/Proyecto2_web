import ItemCard from './ItemCard'

function ListaItems({
  destinos,
  ultimoDestinoId,
  ultimoDestinoRef,
  onEditar,
  onEliminar,
  onCambiarActivo,
}) {
  return (
    <section className="destinations" aria-label="Destinos registrados">
      {destinos.map((destino) => (
        <ItemCard
          destino={destino}
          itemRef={destino.id === ultimoDestinoId ? ultimoDestinoRef : null}
          key={destino.id}
          onCambiarActivo={onCambiarActivo}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </section>
  )
}

export default ListaItems
