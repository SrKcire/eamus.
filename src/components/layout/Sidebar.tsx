import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Bell,
  MessageCircle,
  Search,
  Settings,
  Menu,
  Plus,
} from 'lucide-react';
import CreatePostModal from '../modals/CreatePostModal';
import '../../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { notifications, user } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const unreadNotifications =
    notifications?.filter((n) => !n.isRead && n.type !== 'message').length || 0;
  const unreadMessages =
    notifications?.filter((n) => !n.isRead && n.type === 'message').length || 0;

  const menuItems = [
    {
      name: 'Perfil',
      path: '/profile',
      icon: (
        <div className="menu-profile-avatar">
          <img
            src={user.avatar}
            className="w-full h-full object-cover"
            alt="Perfil"
          />
        </div>
      ),
    },
    { name: 'Página inicial', icon: <Home size={28} />, path: '/' },
    {
      name: 'Notificações',
      icon: <Bell size={28} />,
      path: '/notifications',
      badgeCount: unreadNotifications,
    },
    {
      name: 'Chat',
      icon: <MessageCircle size={28} />,
      path: '/chat',
      badgeCount: unreadMessages,
    },
    { name: 'Pesquisa', icon: <Search size={28} />, path: '/search' },
  ];

  return (
    <div className="sidebar-container">
      {/* Logo - Visível apenas do tablet/desktop em diante para não ocupar espaço no mobile */}
      <div className="shrink-0 hidden md:flex justify-center lg:justify-start">
        <h1 className="sidebar-logo">
          <span className="hidden lg:inline">eamus.</span>
          <span className="lg:hidden">e.</span>
        </h1>
      </div>

      {/* Navegação Principal */}
      <nav className="nav-menu">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${
                isActive ? 'nav-item-active' : 'nav-item-inactive'
              } group justify-center lg:justify-start`}
            >
              <div className="shrink-0 relative">
                {item.icon}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className="notification-badge">{item.badgeCount}</span>
                )}
              </div>
              {/* Label: Mantida a sua regra original de visibilidade */}
              <span
                className={`nav-label hidden lg:inline ${isActive ? 'nav-label-active' : ''}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Botão Criar */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-create-highlight group justify-center lg:justify-start"
        >
          <div className="create-icon-wrapper group-hover:scale-110">
            <Plus size={20} strokeWidth={3} />
          </div>
          <span className="nav-label hidden lg:inline">Criar</span>
        </button>
      </nav>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Footer da Sidebar - Oculto no mobile para otimizar o espaço da barra inferior */}
      <div className="sidebar-footer hidden md:flex">
        <Link
          to="/settings"
          className={`nav-item ${
            location.pathname === '/settings'
              ? 'nav-item-active font-bold'
              : 'nav-item-inactive'
          } justify-center lg:justify-start`}
        >
          <Settings size={28} />
          <span className="nav-label hidden lg:inline">Configurações</span>
        </Link>

        <Link to="/more" className="nav-item nav-item-inactive justify-center lg:justify-start">
          <Menu size={28} />
          <span className="nav-label hidden lg:inline">Mais opções</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;