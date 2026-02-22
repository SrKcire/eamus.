import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapPin, Grid, Bookmark, MessageCircle } from 'lucide-react';
import EditProfileModal from '../components/modals/EditProfileModal';
import '../styles/ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { username: urlUsername } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user: currentUser, posts } = useApp();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Verifica se o perfil visualizado é o do próprio usuário logado
  const isOwnProfile = useMemo(
    () => !urlUsername || urlUsername === currentUser.username,
    [urlUsername, currentUser.username]
  );

  // Consolida os dados do perfil (seja o próprio ou de outro usuário via posts)
  const profileData = useMemo(() => {
    if (isOwnProfile) return currentUser;

    const userPost = posts.find((p) => p.user === urlUsername);
    return {
      username: urlUsername || '',
      name: userPost?.user || urlUsername || 'Usuário',
      avatar: `https://i.pravatar.cc/150?u=${urlUsername}`,
      bio: 'Explorando o mundo através da música e fotografia. ✨',
      location: userPost?.location || 'Brasil',
      stats: {
        posts: posts.filter((p) => p.user === urlUsername).length,
        followers: 1240,
        following: 850,
      },
    };
  }, [urlUsername, isOwnProfile, currentUser, posts]);

  // Filtra os itens que serão exibidos no grid (Postagens ou Salvos)
  const displayItems = useMemo(() => {
    if (activeTab === 'posts') {
      return posts
        .filter((p) => p.user === profileData.username)
        .map((p) => p.image);
    }
    if (activeTab === 'saved' && isOwnProfile) {
      // Mock de itens salvos usando os posts existentes
      return [posts[0]?.image, posts[2]?.image].filter(Boolean);
    }
    return [];
  }, [posts, activeTab, profileData.username, isOwnProfile]);

  return (
    <div className="profile-container animate-in fade-in duration-700">
      <header className="profile-header">
        <div className="avatar-border">
          <div className="avatar-inner">
            <img
              src={profileData.avatar}
              className="w-full h-full object-cover"
              alt={`Avatar de ${profileData.username}`}
            />
          </div>
        </div>

        <div className="profile-info">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <h2 className="text-[28px] font-light tracking-tight">
              {profileData.username}
            </h2>
            <div className="flex items-center gap-2">
              {isOwnProfile ? (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-6 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[14px] font-bold border border-white/5 transition-all"
                >
                  Editar perfil
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-8 py-1.5 rounded-lg text-[14px] font-bold transition-all ${
                      isFollowing
                        ? 'bg-white/10 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {isFollowing ? 'Seguindo' : 'Seguir'}
                  </button>
                  <button
                    onClick={() => navigate('/chat')}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  >
                    <MessageCircle size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-start gap-10">
            <div className="flex gap-1 items-center">
              <span className="font-bold">{profileData.stats.posts}</span>
              <span className="text-[14px] opacity-60">postagens</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">{profileData.stats.followers}</span>
              <span className="text-[14px] opacity-60">seguidores</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">{profileData.stats.following}</span>
              <span className="text-[14px] opacity-60">seguindo</span>
            </div>
          </div>

          <div>
            <p className="font-bold text-[15px]">{profileData.name}</p>
            <p className="text-[14px] opacity-90">{profileData.bio}</p>
            <div className="flex items-center justify-center md:justify-start gap-1 mt-3 text-[12px] font-bold text-blue-400">
              <MapPin size={14} className="text-white/40" />
              <span>{profileData.location}</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="profile-tabs">
        <div className="flex gap-12 -mt-[1px]">
          <button
            onClick={() => setActiveTab('posts')}
            className={`tab-button ${
              activeTab === 'posts' ? 'tab-active' : 'tab-inactive'
            }`}
          >
            <Grid size={12} /> Publicações
          </button>
          {isOwnProfile && (
            <button
              onClick={() => setActiveTab('saved')}
              className={`tab-button ${
                activeTab === 'saved' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <Bookmark size={12} /> Salvos
            </button>
          )}
        </div>
      </nav>

      <div className="posts-grid">
        {displayItems.map((img, i) => (
          <div key={i} className="grid-item">
            <img src={img} className="grid-image" alt="Conteúdo do post" />
          </div>
        ))}
      </div>

      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
