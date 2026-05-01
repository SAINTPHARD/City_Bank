import "./RiskPanel.css"

export function RiskPanel({ alerts }) {
  return (
    <section className="risk-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Risco e compliance</p>
          <h2>Alertas prioritários</h2>
        </div>
      </div>

      <div className="risk-list">
        {alerts.map((alert) => (
          <article className="risk-item" key={`${alert.client}-${alert.reason}`}>
            <div>
              <strong>{alert.client}</strong>
              <small>{alert.reason}</small>
            </div>
            <span>{alert.level}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
