import { formatSignedCurrencyBRL } from "../../utils/formatters"
import "./AccountTable.css"

const getStatusBadgeClass = (status) => {
  const normalizedStatus = status.toLowerCase()

  if (normalizedStatus === "sucesso" || normalizedStatus === "ativa") {
    return "status-badge status-badge--success"
  }

  if (normalizedStatus === "falha" || normalizedStatus === "restrição") {
    return "status-badge status-badge--error"
  }

  if (normalizedStatus === "pendente" || normalizedStatus === "revisão") {
    return "status-badge status-badge--pending"
  }

  return "status-badge status-badge--neutral"
}

const getAmountDirection = (account) => {
  if (account.direction) {
    return account.direction
  }

  if (account.type === "entrada") {
    return "in"
  }

  if (account.type === "saida" || account.type === "saída") {
    return "out"
  }

  return "neutral"
}

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
          <span className="account-table__amount">Saldo</span>
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
            <strong className={`account-table__amount account-table__amount--${getAmountDirection(account)}`}>
              {formatSignedCurrencyBRL(account.balance, getAmountDirection(account))}
            </strong>
            <span>{account.products}</span>
            <span className={`risk-badge risk-badge--${account.risk.toLowerCase()}`}>
              {account.risk}
            </span>
            <span className={getStatusBadgeClass(account.status)}>{account.status}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
