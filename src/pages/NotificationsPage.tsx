import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  BellOff,
  Trash2,
  Heart,
  MessageSquare,
  UserPlus,
  PlayCircle,
  Mail,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotificationsPage.css';

const NotificationsPage: React.FC = () => {
  const {
    notifications,
    clearNotifications,
    removeNotification,
    markNotificationAsRead,
  } = useApp();
  const [filter, setFilter] = useState<'all' | 'interactions'>('all');
  const navigate = useNavigate();

  const filteredNotifications = useMemo(() => {
    if (filter === 'all') return notifications;
    const interactionTypes = ['like', 'comment', 'follow'];
    return notifications.filter((n) => interactionTypes.includes(n.type));
  }, [notifications, filter]);

  const handleNotificationClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.type === 'message' && notif.contactId) {
      navigate(`/messages/${notif.contactId}`);
    } else if (notif.type === 'like' || notif.type === 'comment') {
      navigate('/feed');
    }
  };

  const getIcon = (type: string) => {
    const iconSize = 12;
    switch (type) {
      case 'like':
        return <Heart size={iconSize} className="fill-red-500 text-red-500" />;
      case 'comment':
        return (
          <MessageSquare
            size={iconSize}
            className="fill-blue-500 text-blue-500"
          />
        );
      case 'video':
        return (
          <PlayCircle
            size={iconSize}
            className="fill-purple-500 text-purple-500"
          />
        );
      case 'message':
        return (
          <Mail size={iconSize} className="fill-yellow-500 text-yellow-500" />
        );
      default:
        return (
          <UserPlus size={iconSize} className="fill-green-500 text-green-500" />
        );
    }
  };

  return (
    <div className="notifications-container">
      <header className="notifications-header">
        <div>
          <p className="text-[13px] opacity-40 font-medium uppercase tracking-[0.2em] mt-2">
            {notifications.filter((n) => !n.isRead).length} Novas /{' '}
            {notifications.length} Total
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={() => clearNotifications()}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 hover:text-red-400 transition-all mb-1"
          >
            <Trash2
              size={14}
              className="group-hover:rotate-12 transition-transform"
            />
            Limpar Histórico
          </button>
        )}
      </header>

      <div className="filter-bar">
        {(['all', 'interactions'] as const).map((id) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`filter-button ${
              filter === id ? 'filter-button-active' : 'filter-button-inactive'
            }`}
          >
            {id === 'all' ? 'Todas' : 'Interações'}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`notification-item group ${
                notif.isRead ? 'notification-read' : 'notification-unread'
              } hover:bg-white/[0.08] hover:border-white/20`}
            >
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div
                    className={`avatar-wrapper ${
                      notif.isRead ? 'from-white/10' : 'from-blue-500/50'
                    } to-transparent`}
                  >
                    <img
                      src={notif.avatar}
                      alt={notif.user}
                      className={`w-full h-full object-cover rounded-full transition-all ${
                        notif.isRead
                          ? 'grayscale'
                          : 'grayscale-0 group-hover:scale-105'
                      }`}
                    />
                  </div>
                  <div className="badge-icon">{getIcon(notif.type)}</div>
                  {!notif.isRead && <div className="unread-dot" />}
                </div>

                <div className="flex flex-col">
                  <p className="text-[15px] tracking-tight leading-tight">
                    <span className="font-black notification-username transition-colors">
                      @{notif.user}
                    </span>
                    <span className="opacity-70 font-light">
                      {' '}
                      {notif.action}
                    </span>
                  </p>
                  <span className="text-[10px] opacity-30 font-bold mt-1 uppercase tracking-tighter">
                    {notif.time}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notif.id);
                }}
                className="remove-notif-btn"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 opacity-20">
              <BellOff size={28} />
            </div>
            <p className="text-[14px] font-black uppercase tracking-[0.3em] opacity-20">
              Nada por enquanto
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
