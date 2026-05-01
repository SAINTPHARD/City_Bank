import "./PortfolioPanel.css"

export function PortfolioPanel({ portfolio }) {
  return (
    <section className="portfolio-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Produtos</p>
          <h2>Penetração da carteira</h2>
        </div>
      </div>

      <div className="portfolio-bars">
        {portfolio.map((item) => (
          <div className="portfolio-bar" key={item.label}>
            <span>{item.label}</span>
            <div><strong style={{ width: `${item.value}%` }} /></div>
            <em>{item.value}%</em>
          </div>
        ))}
      </div>
    </section>
  )
}
