import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashScreen.css';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'loading' | 'exit'>('loading');

  useEffect(() => {
    // Inicia a animação de saída após 2 segundos
    const timerExit = setTimeout(() => setStage('exit'), 2000);

    // Navega para o feed após a conclusão da animação de saída
    const timerNav = setTimeout(() => navigate('/feed'), 2800);

    return () => {
      clearTimeout(timerExit);
      clearTimeout(timerNav);
    };
  }, [navigate]);

  return (
    <div
      className={`splash-container ${
        stage === 'exit' ? 'splash-exit' : 'opacity-100'
      }`}
    >
      {/* Efeito de brilho ao fundo */}
      <div className="splash-glow" />

      <div className="relative flex flex-col items-center">
        <h1
          className={`splash-logo ${
            stage === 'loading'
              ? 'scale-100 opacity-100'
              : 'scale-90 opacity-0 blur-md'
          }`}
        >
          eamus<span className="text-blue-500">.</span>
        </h1>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
