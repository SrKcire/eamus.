import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Image as ImageIcon,
  Smile,
  CheckCheck,
  MoreVertical,
  Trash2,
  User as UserIcon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ContactList from '../components/common/ContactList';
import '../styles/ChatPage.css';

const ChatPage: React.FC = () => {
  const {
    messages,
    isTyping,
    sendMessage,
    addReaction,
    markChatAsRead,
    clearNotifications,
    setTypingStatus,
    addNotification,
  } = useApp();

  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(1);
  const [inputText, setInputText] = useState('');
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [showTopMenu, setShowTopMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const contacts = useMemo(
    () => [
      {
        id: 1,
        name: 'Pitty',
        username: 'pitty_oficial',
        avatar: 'https://i.pravatar.cc/150?u=pitty',
        online: true,
      },
      {
        id: 3,
        name: 'Fernanda Lima',
        username: 'fernanda_lima',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
        online: true,
      },
      {
        id: 2,
        name: 'Carlos',
        username: 'carlos_silva',
        avatar: 'https://i.pravatar.cc/150?u=carlos',
        online: false,
      },
    ],
    []
  );

  const currentContact = contacts.find((c) => c.id === activeChat);
  const chatMessages = useMemo(
    () => messages.filter((m) => m.contactId === activeChat),
    [messages, activeChat]
  );

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  useEffect(() => {
    setShowTopMenu(false);
    setShowEmojiPicker(false);
    markChatAsRead(activeChat);
    clearNotifications(activeChat);
    const timer = setTimeout(() => scrollToBottom('auto'), 10);
    return () => clearTimeout(timer);
  }, [activeChat, markChatAsRead, clearNotifications, scrollToBottom]);

  useEffect(() => {
    scrollToBottom('smooth');
  }, [chatMessages.length, isTyping, scrollToBottom]);

  const handleSend = () => {
    if (inputText.trim()) {
      const currentId = activeChat;
      const textToSend = inputText;
      sendMessage(currentId, textToSend, 'text');
      setInputText('');
      setShowEmojiPicker(false);

      if (
        textToSend.toLowerCase().includes('oi') ||
        textToSend.toLowerCase().includes('olá')
      ) {
        setTimeout(() => {
          setTypingStatus(currentId, true);
          setTimeout(() => {
            setTypingStatus(currentId, false);
            const responseText = 'E aí! Tudo massa por aqui. E as produções?';
            sendMessage(currentId, responseText, 'text', undefined, 'them');
            addNotification({
              user: currentContact?.name || 'Contato',
              avatar: currentContact?.avatar || '',
              action: `te respondeu: "${responseText}"`,
              type: 'message',
              contactId: currentId,
            });
          }, 3000);
        }, 1000);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="mb-4 px-1">
        <h2 className="text-[20px] font-bold tracking-tight">Mensagens</h2>
      </div>

      <div className="chat-wrapper">
        <ContactList
          contacts={contacts}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />

        <div className="chat-main-card">
          <header className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20 z-10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border border-white/20 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate(`/profile/${currentContact?.username}`)}
              >
                <img
                  src={currentContact?.avatar}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => navigate(`/profile/${currentContact?.username}`)}
              >
                <span className="font-bold text-[14px] leading-none hover:underline">
                  {currentContact?.name}
                </span>
                <span className="text-[10px] opacity-40">
                  {currentContact?.online ? 'Online agora' : 'Offline'}
                </span>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowTopMenu(!showTopMenu)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <MoreVertical size={20} className="opacity-40" />
              </button>
              {showTopMenu && (
                <div className="absolute top-12 right-0 bg-[#1a1a1a] border border-white/20 rounded-2xl p-1.5 z-20 shadow-2xl min-w-[160px] animate-in fade-in zoom-in-95">
                  <button
                    onClick={() =>
                      navigate(`/profile/${currentContact?.username}`)
                    }
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 rounded-xl text-[12px] transition-colors"
                  >
                    <UserIcon size={14} /> Ver Perfil
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/20 text-red-400 rounded-xl text-[12px] transition-colors">
                    <Trash2 size={14} /> Limpar Chat
                  </button>
                </div>
              )}
            </div>
          </header>

          <main ref={scrollRef} className="chat-messages-area">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'me'
                    ? 'self-end items-end'
                    : 'self-start items-start'
                }`}
              >
                {showReactions === msg.id && (
                  <div className="floating-reactions">
                    {['❤️', '😂', '🔥', '🙌'].map((e) => (
                      <button
                        key={e}
                        onClick={() => {
                          addReaction(msg.id, e);
                          setShowReactions(null);
                        }}
                        className="hover:scale-150 transition-transform text-base"
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  onClick={() =>
                    setShowReactions(showReactions === msg.id ? null : msg.id)
                  }
                  className={`message-bubble ${
                    msg.sender === 'me' ? 'message-me' : 'message-them'
                  }`}
                >
                  {msg.type === 'text' ? (
                    <p className="text-[13.5px] leading-relaxed">{msg.text}</p>
                  ) : (
                    <img
                      src={msg.contentUrl}
                      className="rounded-xl max-w-[220px] shadow-lg"
                      alt=""
                    />
                  )}
                  {msg.reactions.length > 0 && (
                    <div className="absolute -bottom-2 right-1 flex gap-0.5">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="reaction-pill">
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-1.5 opacity-30 text-[9px] font-bold px-1 uppercase">
                  <span>{msg.time}</span>
                  {msg.sender === 'me' && (
                    <CheckCheck
                      size={13}
                      className={msg.status === 'read' ? 'text-blue-400' : ''}
                    />
                  )}
                </div>
              </div>
            ))}

            {isTyping[activeChat] && (
              <div className="typing-indicator">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </main>

          <footer className="chat-footer">
            <div className="chat-input-group">
              <button className="opacity-40 hover:opacity-100 transition-opacity">
                <ImageIcon size={20} />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escreva algo..."
                className="bg-transparent flex-1 outline-none text-[14px] text-white placeholder:opacity-25"
              />
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`transition-all ${
                  showEmojiPicker
                    ? 'opacity-100 scale-110'
                    : 'opacity-40 hover:opacity-100'
                }`}
              >
                <Smile size={20} />
              </button>
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`p-2.5 rounded-full transition-all ${
                  inputText.trim()
                    ? 'bg-white text-black scale-100 shadow-lg'
                    : 'opacity-10 scale-90'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
