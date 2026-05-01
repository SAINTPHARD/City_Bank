import "./AccountTable.css"

export function AccountTable({ accounts }) {
  return (
    <section className="account-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Contas gerenciadas</p>
          <h2>Clientes sob acompanhamento</h2>
        </div>
        <button type="button">Nova análise</button>
      </div>

      <div className="account-table" role="table" aria-label="Contas gerenciadas">
        <div className="account-table__row account-table__row--head" role="row">
          <span>Cliente</span>
          <span>Segmento</span>
          <span>Saldo</span>
          <span>Produtos</span>
          <span>Risco</span>
          <span>Status</span>
        </div>

        {accounts.map((account) => (
          <article className="account-table__row" role="row" key={account.id}>
            <div>
              <strong>{account.client}</strong>
              <small>{account.id} • {account.manager}</small>
            </div>
            <span>{account.segment}</span>
            <strong>{account.balance}</strong>
            <span>{account.products}</span>
            <span className={`risk-badge risk-badge--${account.risk.toLowerCase()}`}>
              {account.risk}
            </span>
            <span className="status-badge">{account.status}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
