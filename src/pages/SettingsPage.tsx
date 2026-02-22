import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, Bell, Eye, User, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../styles/SettingsPage.css';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useApp();

  const sections = [
    {
      group: 'Conta',
      items: [
        {
          id: 1,
          title: 'Perfil',
          icon: <User size={18} />,
          label: 'E-mail e segurança',
        },
        {
          id: 2,
          title: 'Privacidade',
          icon: <Lock size={18} />,
          label: 'Quem vê seu conteúdo',
        },
      ],
    },
    {
      group: 'App',
      items: [
        {
          id: 3,
          title: 'Notificações',
          icon: <Bell size={18} />,
          label: 'Alertas e sons',
        },
        {
          id: 4,
          title: 'Acessibilidade',
          icon: <Eye size={18} />,
          label: 'Modo escuro',
        },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="settings-container animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-2">
        <h2 className="settings-title">Settings</h2>
      </div>

      <div className="flex flex-col gap-8">
        {sections.map((group, idx) => (
          <div key={idx} className="settings-group">
            <h3 className="settings-group-title">{group.group}</h3>
            <div className="settings-card">
              {group.items.map((item, i) => (
                <button
                  key={item.id}
                  className={`settings-item ${
                    i !== group.items.length - 1 ? 'settings-item-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="icon-box">{item.icon}</div>
                    <div className="text-left">
                      <p className="font-bold text-[15px]">{item.title}</p>
                      <p className="text-[12px] opacity-40">{item.label}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="opacity-20" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleLogout} className="logout-button group">
        <div className="flex items-center gap-4">
          <LogOut size={18} />
          <span>Sair da conta</span>
        </div>
        <ChevronRight
          size={18}
          className="opacity-40 group-hover:translate-x-1 transition-all"
        />
      </button>

      <div className="mt-12 text-center opacity-10 pb-10">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">
          Eamus App v1.0.4
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
