import "./ReportCenter.css"

export function ReportCenter() {
  const handleExportPdf = () => {
    window.print()
  }

  return (
    <section className="report-center" id="relatorios">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Import / Export</p>
          <h2>Relatórios em PDF</h2>
        </div>
        <button type="button" onClick={handleExportPdf}>Exportar PDF</button>
      </div>

      <div className="report-center__grid">
        <label className="report-upload">
          <span>Importar PDF</span>
          <strong>Arraste ou selecione um relatório</strong>
          <input accept="application/pdf" type="file" />
        </label>

        <div className="report-status">
          <span>Última exportação</span>
          <strong>Carteira gerencial completa</strong>
          <small>PDF ativo com contas, risco, aprovações e produtividade.</small>
        </div>
      </div>
    </section>
  )
}
