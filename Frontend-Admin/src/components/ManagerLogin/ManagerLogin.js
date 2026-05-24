import "./ManagerLogin.css"

export function ManagerLogin() {
  return (
    <section className="manager-login" id="login-gerente">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Acesso</p>
          <h2>Login do gerente</h2>
        </div>
      </div>

      <form className="manager-login__form">
        <label>
          <span>Matrícula</span>
          <input placeholder="Ex: GER-1042" type="text" />
        </label>

        <label>
          <span>Senha</span>
          <input placeholder="Senha de acesso" type="password" />
        </label>

        <div className="manager-login__options">
          <label>
            <input type="checkbox" />
            <span>Manter sessão segura</span>
          </label>
          <a href="#recuperar">Recuperar senha</a>
        </div>

        <button type="button">Entrar como gerente</button>
      </form>
    </section>
  )
}
