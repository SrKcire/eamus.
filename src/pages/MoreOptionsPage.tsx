import React from 'react';
import {
  HelpCircle,
  ShieldCheck,
  Bookmark,
  Share2,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import '../styles/MoreOptionsPage.css';

const MoreOptionsPage: React.FC = () => {
  const { logout } = useApp();
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      title: 'Itens Salvos',
      icon: <Bookmark size={20} />,
      label: 'Acesse seus posts favoritados',
      action: () => console.log('Salvos'),
    },
    {
      id: 2,
      title: 'Compartilhar Perfil',
      icon: <Share2 size={20} />,
      label: 'Gere um QR Code ou link',
      action: () => console.log('Compartilhar'),
    },
    {
      id: 3,
      title: 'Segurança',
      icon: <ShieldCheck size={20} />,
      label: 'Duas etapas e acessos',
      action: () => console.log('Segurança'),
    },
    {
      id: 4,
      title: 'Ajuda e Suporte',
      icon: <HelpCircle size={20} />,
      label: 'Central de ajuda e relatos',
      action: () => console.log('Suporte'),
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="options-container">
      <header className="options-header">
        <h2 className="text-[22px] font-bold tracking-tight">Ajustes</h2>
        <p className="text-[13px] opacity-40">
          Gerencie sua experiência no eamus.
        </p>
      </header>

      <section className="options-card">
        <div className="flex flex-col">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={option.action}
              className="option-item group"
            >
              <div className="flex items-center gap-5">
                <div className="option-icon-box">{option.icon}</div>
                <div>
                  <p className="text-[15px] font-bold tracking-wide">
                    {option.title}
                  </p>
                  <p className="text-[12px] opacity-40 group-hover:opacity-60 transition-opacity">
                    {option.label}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
              />
            </button>
          ))}
        </div>
      </section>

      <button onClick={handleLogout} className="logout-button group">
        <div className="logout-icon-box">
          <LogOut size={20} />
        </div>
        <div className="text-left">
          <p className="text-[15px] font-bold text-red-400">Sair da conta</p>
          <p className="text-[12px] text-red-400/40">
            Encerrar sua sessão atual
          </p>
        </div>
      </button>

      <footer className="version-tag">
        <p>eamus. v1.0.4</p>
      </footer>
    </div>
  );
};

export default MoreOptionsPage;
