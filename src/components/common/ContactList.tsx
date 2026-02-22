import React from 'react';
import { useApp } from '../../context/AppContext';
import '../../styles/ContactList.css';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  activeChat: number;
  setActiveChat: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  activeChat,
  setActiveChat,
}) => {
  const { notifications } = useApp();

  // Função para contar notificações não lidas deste contato específico
  const getUnreadCount = (contactId: number) => {
    return notifications.filter(
      (n) => n.contactId === contactId && n.type === 'message' && !n.isRead
    ).length;
  };

  return (
    <div className="contact-list-container">
      {contacts.map((contact) => {
        const unreadCount = getUnreadCount(contact.id);
        const isActive = activeChat === contact.id;

        return (
          <button
            key={contact.id}
            onClick={() => setActiveChat(contact.id)}
            className={`contact-item ${
              isActive ? 'contact-item-active' : 'contact-item-inactive'
            }`}
          >
            <div
              className={`avatar-wrapper ${
                isActive ? 'avatar-wrapper-active' : 'avatar-wrapper-inactive'
              }`}
            >
              <img
                src={contact.avatar}
                className="contact-avatar"
                alt={contact.name}
              />

              {/* Indicador Online */}
              {contact.online && <div className="online-indicator"></div>}

              {/* BADGE DE NOTIFICAÇÃO */}
              {unreadCount > 0 && !isActive && (
                <div className="unread-badge">{unreadCount}</div>
              )}
            </div>

            <span className="contact-name">{contact.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContactList;
