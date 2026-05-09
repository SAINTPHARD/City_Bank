import "./ApprovalQueue.css"

export function ApprovalQueue({ approvals }) {
  return (
    <section className="approval-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Fila gerencial</p>
          <h2>Aprovações pendentes</h2>
        </div>
      </div>

      <div className="approval-list">
        {approvals.map((approval) => (
          <article className="approval-item" key={`${approval.title}-${approval.client}`}>
            <div>
              <strong>{approval.title}</strong>
              <small>{approval.client}</small>
            </div>
            <p>{approval.value}</p>
            <span>{approval.priority}</span>
            <div className="approval-item__actions">
              <button type="button">Aprovar</button>
              <button type="button">Revisar</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
