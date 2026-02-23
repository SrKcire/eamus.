import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Heart, MessageSquare, Bookmark, Share2, MoreHorizontal, Volume2, VolumeX, Send, Smile } from 'lucide-react';
import OptionsModal from '../modals/OptionsModal';
import ShareModal from '../modals/ShareModal';
import StreamingModal from '../modals/StreamingModal';
import '../../styles/PostCard.css';

// Componente simplificado de ícones sociais
const SocialMenu = ({ onSelect }: { onSelect: (p: string) => void }) => (
  <div className="social-menu-dropdown animate-in fade-in zoom-in duration-200">
    {['Instagram', 'WhatsApp', 'TikTok'].map(p => (
      <button key={p} onClick={() => onSelect(p)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-[10px] flex flex-col items-center gap-1">
        <Share2 size={16} />
        {p}
      </button>
    ))}
  </div>
);

const PostCard: React.FC<any> = ({ id, user, location, image, description, audioName, audioCover, audioLinks }) => {
  const { activeCommentId, setActiveCommentId, posts, toggleLike, addComment } = useApp();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const lastTap = useRef(0);

  const currentPost = posts.find((p) => p.id === id);
  const isLiked = currentPost?.isLiked || false;

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!isLiked) toggleLike(id);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    lastTap.current = now;
  };

  return (
    <div className="postcard-container">
      {/* Header com paddings responsivos */}
      <div className="postcard-header px-4 md:px-0">
        <p className="text-[14px]">
          <Link to={`/profile/${user}`} className="font-bold hover:underline">{user}</Link>
          <span className="mx-1 opacity-60">em</span>
          <span className="font-bold">{location}</span>
        </p>
      </div>

      {/* Mídia: Edge-to-edge no Mobile */}
      <div className="media-container group" onClick={handleDoubleTap}>
        <div className="media-wrapper relative">
          <img src={image} alt="" className="media-content" />
          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <Heart size={80} className="text-white fill-white animate-heart-pop" />
            </div>
          )}
        </div>

        <div className="actions-sidebar">
          <div className="flex flex-col gap-6 items-center">
            <Heart size={26} onClick={() => toggleLike(id)} className={`cursor-pointer ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <MessageSquare size={26} onClick={() => setActiveCommentId(activeCommentId === id ? null : id)} className="cursor-pointer" />
            <Bookmark size={26} onClick={() => setIsBookmarked(!isBookmarked)} className={`cursor-pointer ${isBookmarked ? 'fill-white' : ''}`} />
            <div className="relative">
              <Share2 size={26} onClick={() => setShowSocial(!showSocial)} className="cursor-pointer" />
              {showSocial && <SocialMenu onSelect={() => setShowSocial(false)} />}
            </div>
          </div>
          <MoreHorizontal size={26} className="cursor-pointer opacity-50" />
        </div>
      </div>

      {/* Descrição e Footer */}
      <div className="px-4 md:px-0">
        <div className="description-box mb-4">
          <p className="text-[15px] opacity-90">{description}</p>
        </div>
        
        <div className="music-badge-container inline-flex">
          <img src={audioCover} className="w-6 h-6 rounded-full animate-spin-slow" alt="" />
          <span className="text-[12px] font-bold">{audioName}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;