export const formatCurrencyBRL = (value) => {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return "R$ 0,00"
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(numericValue)
}

export const formatSignedCurrencyBRL = (value, direction = "neutral") => {
  const formattedValue = formatCurrencyBRL(Math.abs(Number(value)))

  if (direction === "in") {
    return `+ ${formattedValue}`
  }

  if (direction === "out") {
    return `- ${formattedValue}`
  }

  return formattedValue
}
