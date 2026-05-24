
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { useAuth } from "./contexts/useAuth.js";
import "./App.css";
import Header from "./components/Header/Header.js";
import MobileMenu from "./components/MobileMenu/MobileMenu.js";
import Hero from "./components/Hero/Hero.js";
import ProductCards from "./components/ProductCards/ProductCards.js";
import CardSection from "./components/CardSection/CardSection.js";
import AppGallery from "./components/AppGallery/AppGallery.js";
import MiniGallery from "./components/MiniGallery/MiniGallery.js";
import NewsBand from "./components/NewsBand/NewsBand.js";
import Footer from "./components/Footer/Footer.js";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import RouteTransition from "./components/RouteTransition/RouteTransition.js";
import apiClient from "./services/apiClient.js";
import PropTypes from "prop-types";
import linkedinLogo from "./assets/linkedin.svg";
import youtubeLogo from "./assets/youtube.svg";
import facebookLogo from "./assets/facebook.svg";
import instagramLogo from "./assets/instagram-square.svg";
import xLogo from "./assets/quadrado-x.svg";

// Dados dos cards de produtos.
// Cada objeto representa um card que sera renderizado na secao "momentos".
// Mantemos os dados fora do JSX para deixar a estrutura visual mais limpa.
const productCards = [
  {
    title: "City Empresas",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Conta CityBank",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "City Black",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80",
  },
];

// Dados dos cards do aplicativo.
// O mesmo array e reaproveitado na galeria grande e na galeria compacta.
const appCards = [
  {
    text: "Guarde dinheiro de maneira organizada de acordo com seus objetivos.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Controle sua rotina financeira com tudo sempre a mao.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Pague compras e acompanhe cada detalhe no aplicativo.",
    image:
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Resolva sua vida financeira sem burocracia.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  },
];

// Links institucionais do rodape.
// Cada sublista vira uma coluna; o primeiro item da coluna vira o titulo.
const footerColumns = [
  [
    "Transparencia",
    "Politica de privacidade",
    "Politica de seguranca",
    "Termos de uso",
    "Contratos",
    "Relatorios financeiros",
  ],
  [
    "CityBank",
    "Trabalhe com a gente",
    "Blog",
    "Comunidade City",
    "City Empresas",
    "City Black",
  ],
  [
    "Atendimento",
    "Central de ajuda",
    "Seguranca",
    "Perguntas frequentes",
    "Ouvidoria",
    "Portal do cliente",
  ],
  [
    "Fale com a gente",
    "Capitais: 4004-0000",
    "Demais localidades: 0800 000 0000",
    "atendimento@citybank.com.br",
    "Redes sociais",
  ],
];

// Assets locais do footer-bottom.
// Estes arquivos vieram da pasta src/assets e entram no build pelo import.
const socialLinks = [
  { label: "LinkedIn", image: linkedinLogo, href: "#linkedin" },
  { label: "YouTube", image: youtubeLogo, href: "#youtube" },
  { label: "Facebook", image: facebookLogo, href: "#facebook" },
  { label: "Instagram", image: instagramLogo, href: "#instagram" },
  { label: "X", image: xLogo, href: "#x" },
];


function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function AppRoutes() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const { login } = useAuth();

  const handleLogin = async (cpf, password, setError) => {
    try {
      const response = await apiClient.post("/auth/login", { cpf, password });
      login(response.data.user, response.data.token);
      window.location.assign("/dashboard");
    } catch {
      setError("CPF ou senha inválidos");
    }
  };

  return (
    <div className="citybank-page">
      {!isDashboard && (
        <>
          <Header />
          <MobileMenu />
        </>
      )}
        <main>
          <RouteTransition>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ProductCards productCards={productCards} />
                <CardSection />
                <AppGallery appCards={appCards} />
                <MiniGallery appCards={appCards} />
                <NewsBand />
              </>
            } />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
          </RouteTransition>
        </main>
      {!isDashboard && <Footer footerColumns={footerColumns} socialLinks={socialLinks} />}
      </div>
  );
}

function AppContent() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
