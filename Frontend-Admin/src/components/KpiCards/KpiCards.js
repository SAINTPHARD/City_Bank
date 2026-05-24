import { useState } from "react"
import { formatCurrencyBRL } from "../../utils/formatters"
import "./KpiCards.css"

function EyeIcon({ isVisible }) {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      {isVisible ? (
        <>
          <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </>
      ) : (
        <>
          <path d="m3 3 18 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M10.6 10.6A2 2 0 0 0 13.4 13.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9.9 5.8A8 8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a18.7 18.7 0 0 1-2.6 3.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M6.6 6.8C4 8.6 2.5 12 2.5 12S6 18.5 12 18.5a8.6 8.6 0 0 0 4-.9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

export function KpiCards({ items }) {
  const [showBalance, setShowBalance] = useState(true)

  const getDisplayValue = (item) => {
    if (item.isSensitive && !showBalance) {
      return "R$ ••••••"
    }

    if (item.type === "currency") {
      return formatCurrencyBRL(item.value)
    }

    return item.value
  }

  return (
    <section className="kpi-grid" aria-label="Indicadores gerenciais">
      {items.map((item) => (
        <article className="kpi-card" key={item.label}>
          <p>{item.label}</p>
          <div className="kpi-card__value">
            <strong>{getDisplayValue(item)}</strong>
            {item.isSensitive && (
              <button
                aria-label={showBalance ? "Ocultar saldo" : "Exibir saldo"}
                className="kpi-card__visibility"
                onClick={() => setShowBalance((current) => !current)}
                title={showBalance ? "Ocultar saldo" : "Exibir saldo"}
                type="button"
              >
                <EyeIcon isVisible={showBalance} />
              </button>
            )}
          </div>
          <div>
            <span>{item.detail}</span>
            <em>{item.trend}</em>
          </div>
        </article>
      ))}
    </section>
  )
}
