import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  Loader2,
  Search,
  Music,
  Users,
  Calendar,
  Check,
  Play,
  Pause,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { usePostSelection } from '../../hooks/usePostSelection';
import { useToast } from '../../hooks/useToast';
import { useMediaUpload } from '../../hooks/useMediaUpload';
import { useMusicSearch } from '../../hooks/useMusicSearch';
import { ToastContainer } from '../ui/ToastContainer';
import '../../styles/CreatePostModal.css';

const MOCK_USERS_LIST = [
  {
    id: 1,
    name: 'João Silva',
    username: 'joao_silva',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400',
  },
  {
    id: 2,
    name: 'Pitty',
    username: 'pitty_oficial',
    avatar: 'https://i.pravatar.cc/150?u=pitty',
  },
];
const MOCK_EVENTS = [
  { id: 1, name: 'Carnaval Rio 2025', location: 'Rio de Janeiro' },
];

const CreatePostModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { user, addPost, addNotification } = useApp();

  // Hooks
  const { toasts, showToast } = useToast();
  const { mediaUrl, fileInputRef, selectFile, handleFileChange, clearMedia } =
    useMediaUpload();
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    toggleTab,
    filteredResults,
  } = usePostSelection(MOCK_USERS_LIST, MOCK_EVENTS);
  const { tracks, isLoading: isMusicLoading } = useMusicSearch(
    activeTab === 'music' ? searchQuery : ''
  );

  // Referência para o player de áudio
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);

  // Estados do post
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<{
    name: string;
    cover: string;
  } | null>(null);
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const MIN_CHARACTERS = 5;
  const isFormValid =
    mediaUrl !== '' && description.trim().length >= MIN_CHARACTERS;

  if (!isOpen) return null;

  // Lógica de Preview de Áudio
  const handleTogglePreview = (e: React.MouseEvent, track: any) => {
    e.stopPropagation(); // Não seleciona a música, apenas toca
    if (playingTrackId === track.id) {
      audioRef.current?.pause();
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(track.id);
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.play();
      }
    }
  };

  const handlePublish = async () => {
    if (!isFormValid || isPublishing) return;
    setIsPublishing(true);

    addPost({
      user: user.name,
      avatar: user.avatar,
      location: selectedEvent
        ? `${selectedEvent} • ${location}`
        : location || 'Brasil',
      image: mediaUrl,
      description,
      audioName: selectedTrack?.name || 'Som original',
      audioCover:
        selectedTrack?.cover ||
        'https://i.scdn.co/image/ab67616d0000b2734121aee1d8ba046777649591',
      taggedUsers,
    });

    addNotification({
      user: user.name,
      avatar: user.avatar,
      action: 'publicou um novo post',
      type: 'video',
    });

    setTimeout(() => {
      setIsPublishing(false);
      showToast('Publicação partilhada com sucesso!', 'success');
      setTimeout(() => {
        resetForm();
        onClose();
      }, 800);
    }, 1200);
  };

  const resetForm = () => {
    setDescription('');
    clearMedia();
    setLocation('');
    setSelectedTrack(null);
    setTaggedUsers([]);
    setSelectedEvent('');
    setActiveTab('none');
    setPlayingTrackId(null);
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <audio ref={audioRef} onEnded={() => setPlayingTrackId(null)} />

      <div className="modal-overlay">
        {/* Camada de clique para fechar - Escondida no mobile para evitar fechamento acidental */}
        <div className="absolute inset-0 hidden md:block" onClick={onClose} />
        
        <div className="modal-container">
          {/* PAINEL LATERAL (Trilha/Tags/Eventos) */}
          {activeTab !== 'none' && (
            <div className="modal-side-panel">
              <div className="p-5 border-b border-white/10 flex items-center gap-3">
                {/* Botão voltar no mobile para fechar o painel lateral */}
                <button 
                  onClick={() => setActiveTab('none')}
                  className="md:hidden text-white/60"
                >
                  <X size={18} />
                </button>
                <div className="search-input-wrapper flex-1">
                  <Search size={14} className="text-white/40" />
                  <input
                    placeholder={
                      activeTab === 'music'
                        ? 'Pesquisar música...'
                        : 'Pesquisar...'
                    }
                    className="bg-transparent outline-none text-[11px] text-white w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {activeTab === 'music' && isMusicLoading && (
                    <Loader2 size={12} className="animate-spin text-white/40" />
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === 'music' &&
                  tracks.map((track) => (
                    <div
                      key={track.id}
                      onClick={() => {
                        setSelectedTrack({
                          name: track.name,
                          cover: track.cover,
                        });
                        setActiveTab('none');
                        audioRef.current?.pause();
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer group"
                    >
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <img
                          src={track.cover}
                          className="w-full h-full rounded object-cover"
                        />
                        <button
                          onClick={(e) => handleTogglePreview(e, track)}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded"
                        >
                          {playingTrackId === track.id ? (
                            <Pause
                              size={12}
                              className="text-white fill-white"
                            />
                          ) : (
                            <Play size={12} className="text-white fill-white" />
                          )}
                        </button>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-white text-[11px] font-bold truncate">
                          {track.name}
                        </p>
                        <p className="text-white/40 text-[9px] truncate">
                          {track.artist}
                        </p>
                      </div>
                    </div>
                  ))}

                {activeTab === 'tag' &&
                  filteredResults.map((u: any) => (
                    <div
                      key={u.id}
                      onClick={() =>
                        setTaggedUsers((prev) =>
                          prev.includes(u.username)
                            ? prev.filter((x) => x !== u.username)
                            : [...prev, u.username]
                        )
                      }
                      className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                    >
                      <img
                        src={u.avatar}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="flex-1 text-white text-[11px] font-bold">
                        {u.name}
                      </span>
                      {taggedUsers.includes(u.username) && (
                        <Check size={14} className="text-green-500" />
                      )}
                    </div>
                  ))}
                {activeTab === 'event' &&
                  filteredResults.map((e: any) => (
                    <div
                      key={e.id}
                      onClick={() => {
                        setSelectedEvent(e.name);
                        setLocation(e.location);
                        setActiveTab('none');
                      }}
                      className="p-3 hover:bg-white/5 rounded-lg cursor-pointer"
                    >
                      <p className="text-white text-[11px] font-bold">
                        {e.name}
                      </p>
                      <p className="text-white/40 text-[9px]">{e.location}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* CARD PRINCIPAL (Upload e Dados) */}
          <div className={`modal-main-card ${activeTab !== 'none' ? 'hidden md:flex' : 'flex'}`}>
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h2 className="modal-header-title">Criar Post</h2>
              <button
                onClick={onClose}
                className="text-white/20 hover:text-white transition-all hover:rotate-90"
              >
                <X size={22} />
              </button>
            </div>

            {/* Área de conteúdo rolável no mobile */}
            <div className="flex-1 flex flex-col overflow-y-auto pr-1 scrollbar-hide space-y-7">
              <div onClick={selectFile} className="media-upload-area group shrink-0">
                {mediaUrl ? (
                  <img
                    src={mediaUrl}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <div className="media-placeholder">
                    <Plus size={32} />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-col space-y-7">
                <InputField
                  label="Localização"
                  value={location}
                  onChange={setLocation}
                  placeholder="Onde isso aconteceu?"
                />

                <div className="input-field-group">
                  <div className="flex justify-between items-center mb-1">
                    <label className="input-field-label">Legenda</label>
                    <span
                      className={`text-[8px] font-bold ${
                        description.length < MIN_CHARACTERS
                          ? 'text-red-500/50'
                          : 'text-green-500/50'
                      }`}
                    >
                      {description.length}/{MIN_CHARACTERS}
                    </span>
                  </div>
                  <textarea
                    className="textarea-field-native"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Conte algo..."
                  />
                </div>

                <div className="flex gap-2 md:gap-3">
                  <TabButton
                    active={activeTab === 'music'}
                    onClick={() => toggleTab('music')}
                    label={selectedTrack?.name || 'Trilha'}
                    icon={<Music size={12} />}
                  />
                  <TabButton
                    active={activeTab === 'tag'}
                    onClick={() => toggleTab('tag')}
                    label={
                      taggedUsers.length
                        ? `${taggedUsers.length} Marcados`
                        : 'Marcar'
                    }
                    icon={<Users size={12} />}
                  />
                  <TabButton
                    active={activeTab === 'event'}
                    onClick={() => toggleTab('event')}
                    label={selectedEvent || 'Evento'}
                    icon={<Calendar size={12} />}
                  />
                </div>
              </div>
            </div>

            {/* Rodapé fixo para o botão de publicar */}
            <div className="pt-6 shrink-0">
              <button
                disabled={!isFormValid || isPublishing}
                onClick={handlePublish}
                className={`btn-publish-main w-full ${
                  !isFormValid ? 'opacity-20 grayscale' : 'opacity-100'
                }`}
              >
                {isPublishing ? (
                  <Loader2 className="animate-spin text-black" size={18} />
                ) : (
                  'Publicar Agora'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Sub-componentes permanecem idênticos
const InputField = ({ label, value, onChange, placeholder }: any) => (
  <div className="input-field-group">
    <label className="input-field-label">{label}</label>
    <input
      className="input-field-native"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const TabButton = ({ active, onClick, label, icon }: any) => (
  <button
    onClick={onClick}
    className={`flex-1 h-12 flex flex-col items-center justify-center gap-1 transition-all border ${
      active
        ? 'bg-white text-black border-white shadow-lg'
        : 'bg-transparent text-white/30 border-white/10'
    }`}
  >
    {icon}
    <span className="truncate w-full px-1 text-[7px] font-black uppercase">
      {label}
    </span>
  </button>
);

export default CreatePostModal;