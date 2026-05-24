import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useAuth } from "../contexts/useAuth";
import Button from "../components/ui/Button/Button.js";
import Skeleton from "../components/ui/Skeleton/Skeleton.js";

const fallbackAccount = {
  balance: 8420.75,
  accountNumber: "0001-7",
  holderName: "Cliente City",
};

const fallbackTransactions = [
  { id: 1, description: "Pix recebido", amount: 1250, type: "CREDIT", createdAt: "2026-05-12" },
  { id: 2, description: "Transferencia enviada", amount: -320.9, type: "DEBIT", createdAt: "2026-05-11" },
  { id: 3, description: "Deposito em conta", amount: 900, type: "CREDIT", createdAt: "2026-05-10" },
  { id: 4, description: "Compra no debito", amount: -89.7, type: "DEBIT", createdAt: "2026-05-09" },
  { id: 5, description: "Cashback City", amount: 18.3, type: "CREDIT", createdAt: "2026-05-08" },
  { id: 6, description: "Pagamento boleto", amount: -240.15, type: "DEBIT", createdAt: "2026-05-07" },
  { id: 7, description: "Pix enviado", amount: -76, type: "DEBIT", createdAt: "2026-05-06" },
  { id: 8, description: "Rendimento reserva", amount: 32.48, type: "CREDIT", createdAt: "2026-05-05" },
];

const sidebarItems = [
  { label: "Dashboard", href: "#dashboard", icon: "D" },
  { label: "Transacoes", href: "#transactions", icon: "T" },
  { label: "Cartoes", href: "#cards", icon: "C" },
  { label: "Investimentos", href: "#investments", icon: "I" },
  { label: "Atendimento", href: "#support", icon: "A" },
];

const quickActions = [
  { label: "Transfer", icon: "T" },
  { label: "Deposit", icon: "+" },
  { label: "Withdraw", icon: "-" },
  { label: "Pix", icon: "P" },
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  style: "currency",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

function normalizeTransaction(transaction) {
  const amount = Number(transaction.amount ?? transaction.value ?? 0);
  const type = transaction.type || (amount >= 0 ? "CREDIT" : "DEBIT");

  return {
    id: transaction.id ?? `${transaction.description}-${transaction.createdAt}`,
    amount,
    createdAt: transaction.createdAt || transaction.date || new Date().toISOString(),
    description: transaction.description || transaction.title || "Movimentacao",
    type,
  };
}

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setIsLoading(true);

      try {
        const [accountResponse, transactionsResponse] = await Promise.all([
          apiClient.get("/accounts/me"),
          apiClient.get("/transactions/recent"),
        ]);

        if (!isMounted) return;

        setAccount(accountResponse.data);
        setTransactions((transactionsResponse.data || []).map(normalizeTransaction));
      } catch (error) {
        if (!isMounted || error.response?.status === 401) return;

        // Mantem a tela navegavel enquanto o backend ainda nao expoe os endpoints do dashboard.
        setAccount(fallbackAccount);
        setTransactions(fallbackTransactions);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedBalance = useMemo(() => {
    if (!account) return currencyFormatter.format(0);
    return currencyFormatter.format(Number(account.balance ?? 0));
  }, [account]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-shell" id="dashboard">
      <aside className="client-sidebar" aria-label="Navegacao da conta">
        <a className="dashboard-logo" href="/">City</a>
        <nav>
          {sidebarItems.map((item, index) => (
            <a className={index === 0 ? "is-active" : ""} href={item.href} key={item.label}>
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </aside>

      <div className="dashboard-workspace">
        <header className="dashboard-header">
          <div>
            <span>Internet Banking</span>
            <strong>Ola, {user?.name || account?.holderName || "Cliente City"}</strong>
          </div>
          <div className="dashboard-profile">
            <button type="button" onClick={() => setIsProfileOpen((current) => !current)}>
              <span>RL</span>
              <div>
                <strong>Drex Wallet</strong>
                <small>{user?.name || "Rom adalem"}</small>
              </div>
            </button>
            {isProfileOpen && (
              <div className="dashboard-profile__menu">
                <a href="#profile">Minha conta</a>
                <a href="#security">Seguranca</a>
                <button type="button" onClick={handleLogout}>Sair</button>
              </div>
            )}
          </div>
        </header>

        <main className="dashboard-content">
          <section className="dashboard-grid-main">
            <div className="dashboard-primary">
              <section className="balance-card" aria-label="Resumo da conta">
                <div>
                  <span>Saldo disponivel</span>
                  <h1>{isLoading ? <Skeleton className="skeleton-balance" /> : isBalanceVisible ? formattedBalance : "R$ ••••••"}</h1>
                  <p>
                    Conta {account?.accountNumber || "0001-7"} · {user?.name || account?.holderName || "Cliente City"}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setIsBalanceVisible((current) => !current)}
                >
                  {isBalanceVisible ? "Ocultar saldo" : "Exibir saldo"}
                </Button>
              </section>

              <section className="transactions-panel" id="transactions">
                <div className="panel-title">
                  <div>
                    <span>Ultimas movimentacoes</span>
                    <h2>Minhas Transacoes</h2>
                  </div>
                  <a href="#transactions">Ver todas</a>
                </div>

                <div className="transaction-list">
                  {isLoading
                    ? [1, 2, 3].map((item) => <Skeleton key={item} className="skeleton-transaction" />)
                    : transactions.map((transaction) => {
                        const isCredit = transaction.type === "CREDIT" || transaction.amount > 0;
                        const amount = Math.abs(transaction.amount);

                        return (
                          <article className="transaction-item" key={transaction.id}>
                            <span className={`transaction-icon ${isCredit ? "credit" : "debit"}`}>
                              {isCredit ? "+" : "-"}
                            </span>
                            <div>
                              <strong>{transaction.description}</strong>
                              <small>{dateFormatter.format(new Date(transaction.createdAt))}</small>
                            </div>
                            <b className={isCredit ? "amount-credit" : "amount-debit"}>
                              {isCredit ? "+" : "-"} {currencyFormatter.format(amount)}
                            </b>
                          </article>
                        );
                      })}
                </div>
              </section>
            </div>

            <aside className="dashboard-secondary">
              <section className="quick-actions" aria-label="Acoes rapidas">
                {quickActions.map((action) => (
                  <button key={action.label} type="button" className="quick-action">
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </section>

              <section className="chart-card" aria-label="Grafico de linha">
                <div className="panel-title">
                  <div>
                    <span>Data</span>
                    <h2>Evolucao do saldo</h2>
                  </div>
                </div>
                <div className="line-chart" aria-hidden="true">
                  <span style={{ height: "42%" }} />
                  <span style={{ height: "58%" }} />
                  <span style={{ height: "46%" }} />
                  <span style={{ height: "68%" }} />
                  <span style={{ height: "62%" }} />
                  <span style={{ height: "78%" }} />
                </div>
              </section>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
