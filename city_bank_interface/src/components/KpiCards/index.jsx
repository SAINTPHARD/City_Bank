import "./KpiCards.css"

export function KpiCards({ items }) {
  return (
    <section className="kpi-grid" aria-label="Indicadores gerenciais">
      {items.map((item) => (
        <article className="kpi-card" key={item.label}>
          <p>{item.label}</p>
          <strong>{item.value}</strong>
          <div>
            <span>{item.detail}</span>
            <em>{item.trend}</em>
          </div>
        </article>
      ))}
    </section>
  )
}
