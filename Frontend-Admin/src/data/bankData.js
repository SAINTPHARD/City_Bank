export const kpis = [
  {
    label: "Carteira total",
    value: "R$ 128,7 mi",
    detail: "1.248 contas ativas",
    trend: "+12,4%"
  },
  {
    label: "Crédito em análise",
    value: "R$ 8,9 mi",
    detail: "37 propostas abertas",
    trend: "+6,8%"
  },
  {
    label: "Risco elevado",
    value: "42 contas",
    detail: "Monitoramento prioritário",
    trend: "-3,1%"
  },
  {
    label: "Meta mensal",
    value: "84%",
    detail: "Receita e captação",
    trend: "+9,2%"
  }
]

export const accounts = [
  {
    id: "0001-23456",
    manager: "Roberto Lima",
    client: "Mariana Costa",
    segment: "Premium",
    balance: "R$ 842.750,90",
    products: 7,
    risk: "Baixo",
    status: "Ativa"
  },
  {
    id: "0001-78244",
    manager: "Roberto Lima",
    client: "Construtora Atlas LTDA",
    segment: "PJ",
    balance: "R$ 3.480.210,30",
    products: 11,
    risk: "Médio",
    status: "Revisão"
  },
  {
    id: "0001-89120",
    manager: "Ana Torres",
    client: "Felipe Andrade",
    segment: "Digital",
    balance: "R$ 58.920,14",
    products: 4,
    risk: "Baixo",
    status: "Ativa"
  },
  {
    id: "0001-44018",
    manager: "Roberto Lima",
    client: "Grupo Horizonte",
    segment: "Corporate",
    balance: "R$ 12.710.889,00",
    products: 16,
    risk: "Alto",
    status: "Restrição"
  },
  {
    id: "0001-65710",
    manager: "Clara Mendes",
    client: "Sofia Nascimento",
    segment: "Private",
    balance: "R$ 4.231.005,60",
    products: 13,
    risk: "Baixo",
    status: "Ativa"
  }
]

export const approvals = [
  {
    title: "Limite empresarial",
    client: "Construtora Atlas LTDA",
    value: "R$ 1.800.000,00",
    priority: "Alta"
  },
  {
    title: "Renegociação de contrato",
    client: "Grupo Horizonte",
    value: "R$ 620.000,00",
    priority: "Crítica"
  },
  {
    title: "Cartão corporativo",
    client: "Norte Energia SA",
    value: "R$ 95.000,00",
    priority: "Média"
  }
]

export const riskAlerts = [
  {
    client: "Grupo Horizonte",
    reason: "Atraso recorrente em garantias",
    level: "Alto"
  },
  {
    client: "Mercado Vila Nova",
    reason: "Movimentação fora do perfil",
    level: "Médio"
  },
  {
    client: "Rafael Martins",
    reason: "Score reduziu 18 pontos",
    level: "Médio"
  }
]

export const portfolio = [
  { label: "Conta", value: 74 },
  { label: "Cartões", value: 61 },
  { label: "Crédito", value: 48 },
  { label: "Invest.", value: 82 },
  { label: "Seguros", value: 36 }
]

export const teamActivities = [
  {
    action: "Ana Torres concluiu revisão cadastral",
    time: "Hoje, 10:24"
  },
  {
    action: "Roberto Lima aprovou proposta premium",
    time: "Hoje, 09:41"
  },
  {
    action: "Clara Mendes abriu contato de retenção",
    time: "Ontem, 17:12"
  },
  {
    action: "Sistema sinalizou 3 contas para auditoria",
    time: "Ontem, 15:08"
  }
]
