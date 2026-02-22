import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setIsExiting(true);

    const timer = setTimeout(() => {
      navigate('/login');
    }, 600);

    return () => clearTimeout(timer);
  };

  const fields = [
    { label: 'Nome completo', type: 'text', auto: 'name' },
    { label: 'E-mail', type: 'email', auto: 'email' },
    { label: 'Usuário', type: 'text', auto: 'username' },
    { label: 'Senha', type: 'password', auto: 'new-password' },
  ];

  return (
    <div
      className={`register-page ${
        isExiting ? 'opacity-0 scale-95' : 'opacity-100'
      }`}
    >
      <div className="register-bg-container">
        <div
          className="register-bg-image"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1599388042531-9799299406e1?q=80&w=1920')",
            transform: isExiting ? 'scale(1.1)' : 'scale(1.05)',
          }}
        />
        <div className="register-overlay" />
      </div>

      <div className="register-content">
        <h1 className="register-logo">eamus.</h1>

        <form onSubmit={handleRegister} className="register-form">
          {fields.map((field, index) => (
            <div key={index} className="register-input-group">
              <label className="register-label">{field.label}</label>
              <input
                type={field.type}
                autoComplete={field.auto}
                className="register-input"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={`register-button ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#D9D9D9]'
            }`}
          >
            {isLoading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>
      </div>

      <div
        className={`register-footer ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      >
        <p className="text-white/60 text-[14px]">
          Já possui uma conta?{' '}
          <Link
            to="/login"
            className="text-white font-bold hover:underline underline-offset-4"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
