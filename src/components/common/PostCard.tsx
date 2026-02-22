import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Send,
  Smile,
} from 'lucide-react';

// Importação dos Modais Extraídos
import OptionsModal from '../modals/OptionsModal';
import ShareModal from '../modals/ShareModal';
import StreamingModal from '../modals/StreamingModal';

import '../../styles/PostCard.css';

const SocialIcons = {
  Instagram: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:text-[#E4405F] transition-colors"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  WhatsApp: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="hover:text-[#25D366] transition-colors"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  TikTok: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="hover:text-[#00f2ea] transition-all"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.15-.11-.3-.22-.44-.34-.02 2.13-.04 4.26-.03 6.39 0 2.02-.41 4.17-1.71 5.73-1.15 1.45-3.04 2.22-4.87 2.24-1.81.04-3.71-.62-4.94-1.95-1.42-1.45-1.93-3.66-1.55-5.63.3-1.6 1.34-3.1 2.79-3.88 1.11-.63 2.45-.88 3.73-.72V12.4c-.88-.16-1.83.07-2.53.65-.67.53-.98 1.41-.9 2.26.04.89.51 1.76 1.25 2.24.71.49 1.64.6 2.47.38.82-.2 1.56-.8 1.9-1.57.25-.56.33-1.17.31-1.78V.02z" />
    </svg>
  ),
};

interface PostCardProps {
  id: number;
  user: string;
  location: string;
  image: string;
  description: string;
  audioName: string;
  taggedUsers?: string[];
  audioCover?: string;
  audioLinks?: any;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  user,
  location,
  image,
  description,
  audioName,
  taggedUsers = [],
  audioCover = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop',
  audioLinks,
}) => {
  const {
    activeCommentId,
    setActiveCommentId,
    posts,
    addComment,
    toggleLike,
    addNotification,
  } = useApp();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMusicPlatforms, setShowMusicPlatforms] = useState(false);
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const [editingShare, setEditingShare] = useState({
    active: false,
    platform: '',
  });

  const lastTap = useRef<number>(0);
  const currentPost = posts.find((p) => p.id === id);
  const isLiked = currentPost?.isLiked || false;
  const isVideo =
    typeof image === 'string' && image.match(/\.(mp4|webm|ogg|mov)$/i);

  const handleLikeToggle = () => {
    toggleLike(id);
    if (!isLiked) {
      addNotification({
        user: 'joao_silva',
        avatar: 'https://i.pravatar.cc/150?u=me',
        action: `curtiu sua publicação em ${location}.`,
        type: 'like',
      });
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!isLiked) handleLikeToggle();
      setShowHeartOverlay(true);
      setTimeout(() => setShowHeartOverlay(false), 800);
    }
    lastTap.current = now;
  };

  return (
    <div className="postcard-container">
      {/* --- MODAIS (PORTALS) --- */}
      {showOptionsMenu && (
        <OptionsModal onClose={() => setShowOptionsMenu(false)} />
      )}

      {editingShare.active && (
        <ShareModal
          platform={editingShare.platform}
          image={image}
          description={description}
          audioName={audioName}
          postId={id}
          onClose={() => setEditingShare({ active: false, platform: '' })}
        />
      )}

      {showMusicPlatforms && (
        <StreamingModal
          audioLinks={audioLinks}
          audioName={audioName}
          artistName={user}
          albumArt={audioCover}
          onClose={() => setShowMusicPlatforms(false)}
        />
      )}

      {/* --- CABEÇALHO --- */}
      <div className="postcard-header">
        <p className="tracking-tight flex flex-wrap items-center gap-1">
          <span>Foto de </span>
          <Link to={`/profile/${user}`} className="postcard-link-bold">
            {user}
          </Link>
          {taggedUsers.length > 0 && (
            <>
              <span className="text-white/60 mx-0.5">com</span>
              {taggedUsers.map((u, i) => (
                <React.Fragment key={u}>
                  <Link to={`/profile/${u}`} className="postcard-link-bold">
                    {u}
                  </Link>
                  {i < taggedUsers.length - 1 && (
                    <span className="mr-0.5">,</span>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          <span className="ml-1">em</span>
          <Link
            to={`/search?search=${encodeURIComponent(location)}`}
            className="postcard-link-bold"
          >
            {location}
          </Link>
        </p>
      </div>

      {/* --- BLOCO CENTRAL --- */}
      <div className="media-container" onClick={handleDoubleTap}>
        <div className="media-wrapper relative">
          {isVideo ? (
            <video src={image} className="media-content" autoPlay muted loop />
          ) : (
            <img src={image} alt="Post" className="media-content" />
          )}
          {showHeartOverlay && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <Heart
                size={100}
                className="text-white fill-white animate-heart-pop"
              />
            </div>
          )}
        </div>

        <div className="actions-sidebar">
          <div className="actions-group">
            <Heart
              size={26}
              onClick={handleLikeToggle}
              className={`cursor-pointer transition-all active:scale-125 ${
                isLiked ? 'fill-red-500 text-red-500' : 'hover:fill-white/20'
              }`}
            />
            <MessageSquare
              size={26}
              className="cursor-pointer hover:opacity-70"
              onClick={() =>
                setActiveCommentId(activeCommentId === id ? null : id)
              }
            />
            <Bookmark
              size={26}
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`cursor-pointer transition-all ${
                isBookmarked ? 'fill-white text-white' : 'hover:fill-white/20'
              }`}
            />
            <div className="relative">
              <Share2
                size={26}
                onClick={() => setShowSocialMenu(!showSocialMenu)}
                className="cursor-pointer hover:opacity-70"
              />
              {showSocialMenu && (
                <div className="social-menu-dropdown">
                  <div
                    onClick={() => {
                      setEditingShare({ active: true, platform: 'Instagram' });
                      setShowSocialMenu(false);
                    }}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <SocialIcons.Instagram />
                  </div>
                  <div
                    onClick={() => {
                      setEditingShare({ active: true, platform: 'WhatsApp' });
                      setShowSocialMenu(false);
                    }}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <SocialIcons.WhatsApp />
                  </div>
                  <div
                    onClick={() => {
                      setEditingShare({ active: true, platform: 'TikTok' });
                      setShowSocialMenu(false);
                    }}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <SocialIcons.TikTok />
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowOptionsMenu(true)}
            className="cursor-pointer active:scale-90"
          >
            <MoreHorizontal size={26} />
          </button>
        </div>
      </div>

      {/* --- DESCRIÇÃO E COMENTÁRIOS --- */}
      <div className="flex w-full mb-4">
        <div className="flex-1 flex flex-col gap-4">
          <div className="description-box">
            <div className="text-[15px] leading-relaxed">
              {(description || '').split('\n').map((line, i) => (
                <p
                  key={i}
                  className={
                    line.includes('#')
                      ? 'text-white/40 mt-3 italic text-[13px]'
                      : 'opacity-95'
                  }
                >
                  {line.split(' ').map((word, index) =>
                    word.startsWith('#') ? (
                      <Link
                        key={index}
                        to={`/search?search=${encodeURIComponent(word)}`}
                        className="hashtag-link"
                      >
                        {word}{' '}
                      </Link>
                    ) : (
                      word + ' '
                    )
                  )}
                </p>
              ))}
            </div>
          </div>

          {activeCommentId === id && (
            <div className="comments-section">
              <div className="comments-list">
                {!currentPost?.comments?.length ? (
                  <p className="text-[13px] opacity-40 italic">
                    Nenhum comentário ainda...
                  </p>
                ) : (
                  currentPost.comments.map((c) => (
                    <div key={c.id} className="mb-4 last:mb-0">
                      <span className="font-bold text-[13px] mr-2">
                        @{c.user || 'usuario'}:
                      </span>
                      <span className="text-[13px] opacity-80">{c.text}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    (addComment(id, commentText), setCommentText(''))
                  }
                  placeholder="Adicione um comentário..."
                  className="comment-input-wrapper"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Smile
                    size={18}
                    className={`cursor-pointer transition-colors ${
                      showEmojiPicker
                        ? 'text-yellow-400'
                        : 'opacity-40 hover:opacity-100'
                    }`}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                  <Send
                    size={18}
                    className="cursor-pointer opacity-40 hover:opacity-100"
                    onClick={() => {
                      if (commentText.trim()) {
                        addComment(id, commentText);
                        setCommentText('');
                      }
                    }}
                  />
                </div>
                {showEmojiPicker && (
                  <div className="emoji-picker-popup">
                    {['🔥', '❤️', '👏', '😍', '🙌', '✨'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setCommentText((prev) => prev + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="text-xl hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="w-[46px] shrink-0"></div>
      </div>

      {/* --- FOOTER --- */}
      <div className="postcard-footer">
        <div className="music-info-container flex items-center gap-4">
          <div onClick={() => setIsMuted(!isMuted)} className="cursor-pointer">
            {isMuted ? (
              <VolumeX size={22} className="text-white/40" />
            ) : (
              <Volume2 size={22} />
            )}
          </div>
          <div
            onClick={() => setShowMusicPlatforms(true)}
            className="music-badge-container group cursor-pointer"
          >
            <img
              src={audioCover}
              alt="Capa"
              className="w-7 h-7 rounded-full object-cover border border-white/10 animate-spin-slow"
            />
            <div className="flex flex-col">
              <span className="text-[13px] font-bold group-hover:text-blue-400 transition-colors truncate max-w-[150px]">
                {audioName}
              </span>
              <span className="text-[8px] uppercase tracking-[2px] opacity-40 font-black">
                Ouvir Agora
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
