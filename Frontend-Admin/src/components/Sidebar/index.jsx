import "./Sidebar.css"

const navigation = [
  "Painel",
  "Contas",
  "Crédito",
  "Risco",
  "Atendimento",
  "Relatórios",
  "Equipe"
]

export function Sidebar() {
  return (
    <aside className="manager-sidebar" aria-label="Menu gerencial">
      <div className="manager-brand">
        <span>cb</span>
        <div>
          <strong>city_bank</strong>
          <small>Gerência de contas</small>
        </div>
      </div>

      <nav className="manager-nav">
        {navigation.map((item, index) => (
          <a className={index === 0 ? "is-active" : ""} href="#painel" key={item}>
            {item}
          </a>
        ))}
      </nav>

      <div className="manager-sidebar__summary">
        <small>Agência Centro</small>
        <strong>6 gerentes ativos</strong>
      </div>
    </aside>
  )
}
