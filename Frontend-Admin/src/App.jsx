import { accounts, approvals, kpis, portfolio, riskAlerts, teamActivities } from "./data/bankData"
import { AccountTable } from "./components/AccountTable/AccountTable.js"
import { ActivityFeed } from "./components/ActivityFeed/ActivityFeed.js"
import { ApprovalQueue } from "./components/ApprovalQueue/ApprovalQueue.js"
import { Header } from "./components/Header/Header.js"
import { KpiCards } from "./components/KpiCards/KpiCards.js"
import { ManagerLogin } from "./components/ManagerLogin/ManagerLogin.js"
import { PortfolioPanel } from "./components/PortfolioPanel/PortfolioPanel.js"
import { ReportCenter } from "./components/ReportCenter/ReportCenter.js"
import { RiskPanel } from "./components/RiskPanel/RiskPanel.js"
import { Sidebar } from "./components/Sidebar/Sidebar.js"
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

        <section className="dashboard-grid dashboard-grid--operations">
          <ReportCenter />
          <ManagerLogin />
        </section>
      </main>
    </div>
  )
}

export default App
