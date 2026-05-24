import "./Sidebar.css"

const navigation = [
  { label: "Dashboard", href: "#painel", icon: "D" },
  { label: "Transações", href: "#transacoes", icon: "T" },
  { label: "Usuários", href: "#usuarios", icon: "U" },
  { label: "Contas", href: "#contas", icon: "C" },
  { label: "Risco", href: "#risco", icon: "R" },
  { label: "Relatórios", href: "#relatorios", icon: "PDF" },
  { label: "Equipe", href: "#equipe", icon: "E" }
]

export function Sidebar() {
  const activeItem = "Dashboard"

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
        {navigation.map((item) => {
          const isActive = item.label === activeItem

          return (
            <a
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "is-active" : ""}
              href={item.href}
              key={item.label}
            >
              <span className="manager-nav__icon">{item.icon}</span>
              <span className="manager-nav__label">{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="manager-sidebar__summary">
        <small>Agência Centro</small>
        <strong>6 gerentes ativos</strong>
      </div>
    </aside>
  )
}
