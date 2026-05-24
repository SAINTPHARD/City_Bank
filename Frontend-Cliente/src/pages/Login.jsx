import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../components/ui/Button/Button.js";
import Input from "../components/ui/Input/Input.js";

const cpfPattern = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

function validateLoginForm(values) {
  const errors = {};

  if (!values.cpf.trim()) {
    errors.cpf = "Informe seu CPF.";
  } else if (!cpfPattern.test(values.cpf)) {
    errors.cpf = "Use um CPF valido com 11 digitos.";
  }

  if (!values.password.trim()) {
    errors.password = "Informe sua senha.";
  }

  return errors;
}

function Login({ onLogin }) {
  const [values, setValues] = useState({ cpf: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm(values);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onLogin(values.cpf.replace(/\D/g, ""), values.password, setError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Entrar na sua conta</h2>
        {searchParams.get("expired") && (
          <div className="session-warning">Sua sessao expirou. Entre novamente para continuar.</div>
        )}
        {searchParams.get("registered") && (
          <div className="session-success">Conta criada com sucesso. Entre para acessar.</div>
        )}
        <Input
          error={fieldErrors.cpf}
          label="CPF"
          name="cpf"
          type="text"
          placeholder="CPF"
          value={values.cpf}
          onChange={handleChange}
        />
        <Input
          error={fieldErrors.password}
          label="Senha"
          name="password"
          type="password"
          placeholder="Senha"
          value={values.password}
          onChange={handleChange}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
