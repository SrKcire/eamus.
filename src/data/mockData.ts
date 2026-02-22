export const MOCK_USER = {
  id: 1,
  username: 'joao_silva',
  name: 'João Silva',
  bio: 'Rio de Janeiro - Explorador de sons e selvas de pedra.',
  location: 'Rio de Janeiro, Brasil',
  stats: {
    posts: 777,
    followers: '10M',
    following: 320,
  },
  avatar:
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400',
};

export const MOCK_POSTS = [
  {
    id: 1,
    user: 'João Silva',
    location: 'Rio de Janeiro',
    image:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800',
    description: '“Pois bem, cheguei... Navegar eu quero”\n\n#carnaval #rio',
    audioName: 'O descobridor dos sete mares - Tim Maia',
    audioCover:
      'https://i.scdn.co/image/ab67616d0000b2734121aee1d8ba046777649591',
    audioLinks: {
      spotify: 'https://open.spotify.com/track/2S9X77atpS6YmPIn97UuS2',
    },
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400',
    comments: [],
    isLiked: false,
  },
  {
    id: 2,
    user: 'Pitty',
    location: 'Estúdio 1',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800',
    description:
      'O que não me mata, me faz estranha. Gravando coisa nova! 🤘🎸',
    audioName: 'Na Sua Estante - Pitty',
    audioCover:
      'https://i.scdn.co/image/ab67616d0000b2739352d43d8396c0966f39d20c',
    audioLinks: {
      spotify: 'https://open.spotify.com/track/6U9SIdG6U6q7C7z8qFf4fB',
    },
    avatar: 'https://i.pravatar.cc/150?u=pitty',
    comments: [],
    isLiked: false,
  },
  {
    id: 3,
    user: 'Fernanda Lima',
    location: 'Ibiza, ES',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800',
    description: 'Summer vibes. O som não para! 🎧🔥',
    audioName: 'Acid Sky - Fernanda Lima',
    audioCover:
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200',
    audioLinks: { spotify: '#' },
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    comments: [],
    isLiked: false,
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 101,
    user: 'Pitty',
    avatar: 'https://i.pravatar.cc/150?u=pitty',
    action: 'curtiu seu comentário no post de Tim Maia.',
    time: '2 min',
    type: 'like',
    isRead: false,
  },
  {
    id: 102,
    user: 'Fernanda Lima',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    action: 'te enviou uma nova mensagem.',
    time: '15 min',
    type: 'message',
    isRead: false,
    contactId: 3, // Refere-se à Fernanda Lima
  },
  {
    id: 103,
    user: 'caio_rock',
    avatar: 'https://i.pravatar.cc/150?u=caio',
    action: 'comentou: "Essa foto ficou épica!"',
    time: '1 hora',
    type: 'comment',
    isRead: true,
  },
];

export const MOCK_MESSAGES = [
  {
    id: 201,
    contactId: 3, // Fernanda Lima
    sender: 'them',
    text: 'E aí João, bora produzir aquela track hoje?',
    type: 'text',
    time: '14:30',
    status: 'read',
    reactions: ['🔥'],
  },
  {
    id: 202,
    contactId: 3,
    sender: 'me',
    text: 'Com certeza! Chego no estúdio em 20 min.',
    type: 'text',
    time: '14:35',
    status: 'read',
    reactions: [],
  },
];
