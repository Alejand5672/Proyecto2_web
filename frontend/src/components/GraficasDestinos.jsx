import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function TarjetaGrafica({ children, titulo }) {
  return (
    <article className="chart-card">
      <h2>{titulo}</h2>
      <div className="chart-card__canvas">{children}</div>
    </article>
  )
}

function GraficasDestinos({
  actividadPorDia,
  diasPorCategoria,
  destinosPorCategoria,
}) {
  return (
    <section className="charts-section" aria-label="Graficas de viajes">
      <TarjetaGrafica titulo="Actividad ultimos 7 dias">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={actividadPorDia}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="dia" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              dataKey="actividad"
              name="Actividad"
              stroke="#245f4d"
              strokeWidth={3}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </TarjetaGrafica>

      <TarjetaGrafica titulo="Destinos por categoria">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={destinosPorCategoria}
              dataKey="total"
              nameKey="categoria"
              outerRadius="78%"
            >
              {destinosPorCategoria.map((categoria) => (
                <Cell fill={categoria.color} key={categoria.categoriaId} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </TarjetaGrafica>

      <TarjetaGrafica titulo="Dias visitados por categoria">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={diasPorCategoria}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="categoria" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="dias" name="Dias visitados">
              {diasPorCategoria.map((categoria) => (
                <Cell fill={categoria.color} key={categoria.categoriaId} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </TarjetaGrafica>
    </section>
  )
}

export default GraficasDestinos
