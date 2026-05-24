import { useMemo, useState } from "react"; // Usa estado local para controlar campos, erros e envio.
import { useNavigate, useSearchParams } from "react-router-dom"; // Usa navegacao para voltar ao login depois do cadastro.
import Button from "../components/ui/Button/Button.js"; // Reaproveita o botao padronizado do projeto.
import Input from "../components/ui/Input/Input.js"; // Reaproveita o input padronizado do projeto.
import apiClient from "../services/apiClient"; // Usa o cliente Axios centralizado com baseURL e interceptors.
import "./Register.css"; // Mantem os estilos da pagina de cadastro junto da propria pagina.

const cpfPattern = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/; // Valida CPF com ou sem mascara.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato basico de e-mail antes de chamar a API.

function validateRegisterForm(values) {
  const errors = {}; // Guarda mensagens por campo para exibir perto do input correto.

  if (!values.name.trim()) errors.name = "Informe seu nome completo."; // Evita cadastro sem nome.
  if (!values.cpf.trim()) errors.cpf = "Informe seu CPF."; // Evita cadastro sem CPF.
  else if (!cpfPattern.test(values.cpf)) errors.cpf = "Use um CPF valido com 11 digitos."; // Bloqueia CPF mal formatado.
  if (!values.email.trim()) errors.email = "Informe seu e-mail."; // Evita cadastro sem e-mail.
  else if (!emailPattern.test(values.email)) errors.email = "Use um e-mail valido."; // Bloqueia e-mail invalido no frontend.
  if (!values.password.trim()) errors.password = "Crie uma senha."; // Evita cadastro sem senha.
  else if (values.password.length < 6) errors.password = "Use pelo menos 6 caracteres."; // Exige senha minima para melhor seguranca.
  if (values.password !== values.confirmPassword) errors.confirmPassword = "As senhas precisam ser iguais."; // Evita erro de digitacao.

  return errors; // Retorna todos os erros encontrados no formulario.
}

function Register() {
  const navigate = useNavigate(); // Permite redirecionar apos sucesso.
  const [searchParams] = useSearchParams(); // Le CPF vindo do Hero quando existir.
  const initialCpf = useMemo(() => searchParams.get("cpf") || "", [searchParams]); // Mantem o CPF inicial estavel.
  const [values, setValues] = useState({ name: "", cpf: initialCpf, email: "", password: "", confirmPassword: "" }); // Guarda valores do formulario.
  const [fieldErrors, setFieldErrors] = useState({}); // Guarda erros especificos por campo.
  const [formError, setFormError] = useState(""); // Guarda erro geral vindo da API.
  const [isSubmitting, setIsSubmitting] = useState(false); // Controla estado de carregamento do botao.

  const handleChange = (event) => {
    const { name, value } = event.target; // Extrai campo alterado do evento.
    setValues((currentValues) => ({ ...currentValues, [name]: value })); // Atualiza apenas o campo editado.
    setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: "" })); // Remove erro do campo enquanto o usuario corrige.
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede reload da pagina ao enviar o formulario.
    const errors = validateRegisterForm(values); // Valida antes de chamar a API.

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors); // Mostra erros proximos aos campos.
      return; // Interrompe envio para nao bater na API com dados ruins.
    }

    setIsSubmitting(true); // Ativa feedback visual de envio.
    setFormError(""); // Limpa erros anteriores.

    try {
      await apiClient.post("/auth/register", {
        email: values.email.trim(), // Envia e-mail porque o backend usa login por e-mail.
        password: values.password, // Envia senha para o Spring aplicar BCrypt.
      });

      navigate("/login?registered=true"); // Leva o usuario para autenticar apos abertura da conta.
    } catch {
      setFormError("Nao foi possivel abrir sua conta. Verifique os dados ou tente outro e-mail."); // Mensagem amigavel para erro de cadastro.
    } finally {
      setIsSubmitting(false); // Desativa carregamento mesmo em caso de erro.
    }
  };

  return (
    <section className="register-page">
      <div className="register-copy">
        <span>Abra sua conta City Bank</span>
        <h1>Seu banco digital pronto para comecar.</h1>
        <p>Cadastre seus dados, crie uma senha segura e acesse sua conta pelo login.</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <Input label="Nome completo" name="name" value={values.name} onChange={handleChange} error={fieldErrors.name} placeholder="Seu nome" />
        <Input label="CPF" name="cpf" value={values.cpf} onChange={handleChange} error={fieldErrors.cpf} placeholder="000.000.000-00" />
        <Input label="E-mail" name="email" type="email" value={values.email} onChange={handleChange} error={fieldErrors.email} placeholder="voce@email.com" />
        <Input label="Senha" name="password" type="password" value={values.password} onChange={handleChange} error={fieldErrors.password} placeholder="Minimo 6 caracteres" />
        <Input label="Confirmar senha" name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} error={fieldErrors.confirmPassword} placeholder="Repita sua senha" />
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Abrindo conta..." : "Abrir minha conta"}</Button>
        {formError && <div className="error">{formError}</div>}
        <a className="register-login-link" href="/login">Ja tenho conta</a>
      </form>
    </section>
  );
}

export default Register; // Exporta a pagina para ser usada nas rotas do App.
