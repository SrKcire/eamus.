import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setIsExiting(true);

    // Aguarda a animação de saída (fade-out e scale) antes de navegar
    const timer = setTimeout(() => {
      login();
      navigate('/splash');
    }, 600);

    return () => clearTimeout(timer);
  };

  return (
    <div
      className={`login-page ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Camada 0 */}
      <div className="login-bg-container">
        <div
          className="login-bg-image"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1599388042531-9799299406e1?q=80&w=1920')",
            transform: isExiting ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div className="login-overlay" />
      </div>

      {/* Conteúdo Camada 10 */}
      <div className="login-content">
        <h1 className="login-logo">eamus.</h1>

        <form onSubmit={handleLogin} className="login-form">
          {/* Input Usuário */}
          <div className="login-input-group">
            <label className="login-label">Usuário</label>
            <input
              type="text"
              className="login-input"
              required
              autoComplete="username"
            />
          </div>

          {/* Input Senha */}
          <div className="login-input-group">
            <label className="login-label">Senha</label>
            <input
              type="password"
              className="login-input"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Aguarde...' : 'Entrar'}
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <div
        className={`login-footer ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      >
        <p className="text-white/70 text-[15px]">
          Ainda não possui uma conta?{' '}
          <Link
            to="/register"
            className="text-white font-bold hover:underline underline-offset-4"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
