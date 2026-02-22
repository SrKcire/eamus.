import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import {
  MOCK_POSTS,
  MOCK_USER,
  MOCK_NOTIFICATIONS,
  MOCK_MESSAGES,
} from '../data/mockData';

// --- Interfaces de Tipagem ---

export interface User {
  id?: number;
  username: string;
  name: string;
  bio: string;
  location: string;
  stats: { posts: number; followers: string; following: number };
  avatar: string;
}

export interface Post {
  id: number;
  user: string;
  avatar: string;
  location: string;
  image: string;
  description: string;
  audioName: string;
  audioCover?: string;
  audioLinks?: {
    spotify?: string;
    deezer?: string;
    apple?: string;
    amazon?: string;
  };
  taggedUsers?: string[];
  comments: { id: number; user: string; text: string }[];
  isLiked?: boolean;
}

export interface Message {
  id: number;
  contactId: number;
  sender: 'me' | 'them';
  text: string;
  type: 'text' | 'image';
  contentUrl?: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  reactions: string[];
}

export interface Notification {
  id: number;
  user: string;
  avatar: string;
  action: string;
  time: string;
  type: 'like' | 'event' | 'video' | 'comment' | 'message';
  isRead: boolean;
  contactId?: number;
}

// --- Definição do Contexto ---

interface AppContextType {
  user: User;
  posts: Post[];
  notifications: Notification[];
  messages: Message[];
  isLoggedIn: boolean;
  activeCommentId: number | null;
  isTyping: Record<number, boolean>;
  setActiveCommentId: (id: number | null) => void;
  updateUser: (newData: Partial<User>) => void;
  login: () => void;
  logout: () => void;
  addPost: (postData: Omit<Post, 'id' | 'comments'>) => void;
  addComment: (postId: number, text: string) => void;
  toggleLike: (postId: number) => void;
  sendMessage: (
    contactId: number,
    text: string,
    type?: 'text' | 'image',
    url?: string,
    sender?: 'me' | 'them'
  ) => void;
  addReaction: (messageId: number, emoji: string) => void;
  markChatAsRead: (contactId: number) => void;
  addNotification: (
    notif: Omit<Notification, 'id' | 'time' | 'isRead'>
  ) => void;
  markNotificationAsRead: (id: number) => void;
  removeNotification: (id: number) => void;
  clearNotifications: (contactId?: number) => void;
  setTypingStatus: (contactId: number, status: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // --- Estados Globais (Inicializados com MockData) ---
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

  // Estado de digitação dinâmico
  const [isTyping, setIsTyping] = useState<Record<number, boolean>>({
    3: false,
  });

  // --- Funções de Autenticação e Perfil ---
  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  const updateUser = useCallback(
    (newData: Partial<User>) => setUser((prev) => ({ ...prev, ...newData })),
    []
  );

  // --- Funções de Conteúdo (Posts & Comentários) ---
  const addPost = useCallback((postData: Omit<Post, 'id' | 'comments'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now(),
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const toggleLike = useCallback((postId: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isLiked: !p.isLiked } : p))
    );
  }, []);

  const addComment = useCallback(
    (postId: number, text: string) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  { id: Date.now(), user: user.username, text },
                ],
              }
            : p
        )
      );
    },
    [user.username]
  );

  // --- Funções de Chat ---
  const sendMessage = useCallback(
    (
      contactId: number,
      text: string,
      type: 'text' | 'image' = 'text',
      url?: string,
      sender: 'me' | 'them' = 'me'
    ) => {
      const newMessage: Message = {
        id: Date.now(),
        contactId,
        sender,
        text,
        type,
        contentUrl: url,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: sender === 'me' ? 'sent' : 'delivered',
        reactions: [],
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    []
  );

  const setTypingStatus = useCallback((contactId: number, status: boolean) => {
    setIsTyping((prev) => ({
      ...prev,
      [contactId]: status,
    }));
  }, []);

  const addReaction = useCallback((messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, reactions: Array.from(new Set([...m.reactions, emoji])) }
          : m
      )
    );
  }, []);

  const markChatAsRead = useCallback((contactId: number) => {
    setMessages((prev) => {
      const hasUnread = prev.some(
        (m) =>
          m.contactId === contactId &&
          m.sender === 'them' &&
          m.status !== 'read'
      );

      if (!hasUnread) return prev;

      return prev.map((m) =>
        m.contactId === contactId && m.sender === 'them'
          ? { ...m, status: 'read' as const }
          : m
      );
    });
  }, []);

  // --- Funções de Notificação ---
  const addNotification = useCallback(
    (notif: Omit<Notification, 'id' | 'time' | 'isRead'>) => {
      const newNotif: Notification = {
        ...notif,
        id: Date.now(),
        time: 'Agora',
        isRead: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  const markNotificationAsRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const removeNotification = useCallback(
    (id: number) => setNotifications((prev) => prev.filter((n) => n.id !== id)),
    []
  );

  const clearNotifications = useCallback((contactId?: number) => {
    setNotifications((prev) => {
      if (contactId) {
        return prev.filter((n) => n.contactId !== contactId);
      }
      return [];
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        posts,
        notifications,
        messages,
        isLoggedIn,
        activeCommentId,
        isTyping,
        setActiveCommentId,
        updateUser,
        login,
        logout,
        addPost,
        addComment,
        toggleLike,
        sendMessage,
        addReaction,
        markChatAsRead,
        addNotification,
        markNotificationAsRead,
        removeNotification,
        clearNotifications,
        setTypingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  return context;
};
