import "./Header.css"

export function Header() {
  return (
    <header className="manager-header" id="painel">
      <div>
        <p className="eyebrow">Dashboard gerencial</p>
        <h1>Carteira de contas da agência</h1>
        <span>Visão consolidada de clientes, crédito, risco e produtividade.</span>
      </div>

      <div className="manager-header__actions">
        <label className="manager-search">
          <span>Buscar</span>
          <input type="search" placeholder="Cliente, conta, CPF/CNPJ..." />
        </label>
        <button type="button">Exportar</button>
        <button type="button" className="manager-profile">RL</button>
      </div>
    </header>
  )
}
