import { accounts, approvals, kpis, portfolio, riskAlerts, teamActivities } from "./data/bankData"
import { AccountTable } from "./components/AccountTable"
import { ActivityFeed } from "./components/ActivityFeed"
import { ApprovalQueue } from "./components/ApprovalQueue"
import { Header } from "./components/Header"
import { KpiCards } from "./components/KpiCards"
import { PortfolioPanel } from "./components/PortfolioPanel"
import { RiskPanel } from "./components/RiskPanel"
import { Sidebar } from "./components/Sidebar"
import "./styles.css"

function App() {
  return (
    <div className="manager-shell">
      <Sidebar />

      <main className="manager-main">
        <Header />
        <KpiCards items={kpis} />

        <section className="dashboard-grid">
          <AccountTable accounts={accounts} />
          <ApprovalQueue approvals={approvals} />
        </section>

        <section className="dashboard-grid dashboard-grid--three">
          <RiskPanel alerts={riskAlerts} />
          <PortfolioPanel portfolio={portfolio} />
          <ActivityFeed activities={teamActivities} />
        </section>
      </main>
    </div>
  )
}

export default App
