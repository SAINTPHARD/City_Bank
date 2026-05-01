import React, { useEffect, useState } from "react";
import axios from "axios";

// ================= API CONFIG =================
// cria instância central da API (boa prática)
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ================= FORMATADOR =================
// função utilitária para formatar valores monetários
const formatMoney = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

function App() {
  // ================= STATES =================
  const [accounts, setAccounts] = useState([]); // lista de contas
  const [transactions, setTransactions] = useState([]); // lista de transações
  const [selectedAccountId, setSelectedAccountId] = useState(null); // conta selecionada

  // ================= LOAD INICIAL =================
  useEffect(() => {
    loadAccounts();
  }, []);

  // ================= BUSCAR CONTAS =================
  const loadAccounts = async () => {
    try {
      const res = await api.get("/accounts");

      setAccounts(res.data);

      // se existir contas → carrega a primeira automaticamente
      if (res.data.length > 0) {
        const firstAccountId = res.data[0].id;
        setSelectedAccountId(firstAccountId);
        loadTransactions(firstAccountId);
      }
    } catch (err) {
      console.error("Erro ao buscar contas:", err);
    }
  };

  // ================= BUSCAR TRANSAÇÕES =================
  const loadTransactions = async (accountId) => {
    try {
      const res = await api.get(`/accounts/${accountId}/transactions`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
    }
  };

  // ================= CALCULAR SALDO TOTAL =================
  const totalBalance = accounts.reduce(
    (acc, a) => acc + Number(a.balance),
    0
  );

  return (
    <div className="app-shell">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">cb</span>
          <div>
            <strong>city_bank</strong>
            <small>Internet Banking</small>
          </div>
        </div>

        <nav className="nav-list">
          <a className="active">Inicio</a>
          <a>Contas</a>
          <a>Transacoes</a>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="main-content">
        {/* ================= HEADER ================= */}
        <header className="topbar">
          <div>
            <p>Bem-vindo de volta</p>
            <h1>Olá, Roberto</h1>
          </div>
        </header>

        {/* ================= HERO (SALDO TOTAL) ================= */}
        <section className="hero-panel">
          <div>
            <p>Saldo total</p>
            <h2>{formatMoney(totalBalance)}</h2>
            <p>Atualizado em tempo real</p>
          </div>
        </section>

        {/* ================= CONTAS ================= */}
        <section className="content-grid">
          <div className="panel">
            <h3>Contas</h3>

            <div className="account-list">
              {accounts.map((acc) => (
                <article
                  className={`account-card ${
                    selectedAccountId === acc.id ? "active" : ""
                  }`}
                  key={acc.id}
                  onClick={() => {
                    setSelectedAccountId(acc.id);
                    loadTransactions(acc.id);
                  }}
                >
                  <div>
                    <span>{acc.owner}</span>
                    <small>ID: {acc.id}</small>
                  </div>

                  <strong>{formatMoney(acc.balance)}</strong>
                  <em>Conta ativa</em>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRANSAÇÕES ================= */}
        <section className="panel">
          <h3>Transações recentes</h3>

          <div className="transaction-list">
            {transactions.length === 0 ? (
              <p>Nenhuma transação encontrada</p>
            ) : (
              transactions.map((tx) => (
                <article key={tx.id} className="transaction">
                  <div>
                    <strong>{tx.description || tx.type}</strong>
                    <small>{tx.timestamp}</small>
                  </div>

                  <span
                    className={
                      tx.type === "CREDIT" ? "income" : "expense"
                    }
                  >
                    {tx.type === "CREDIT" ? "+" : "-"}{" "}
                    {formatMoney(tx.amount)}
                  </span>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;