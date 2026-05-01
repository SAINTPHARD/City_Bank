import "./ActivityFeed.css"

export function ActivityFeed({ activities }) {
  return (
    <section className="activity-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Operação</p>
          <h2>Atividades recentes</h2>
        </div>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <article className="activity-item" key={`${activity.action}-${activity.time}`}>
            <span />
            <div>
              <strong>{activity.action}</strong>
              <small>{activity.time}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
