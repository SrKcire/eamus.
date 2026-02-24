import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Heart, MessageSquare, Bookmark, Share2, MoreHorizontal, Volume2, VolumeX, Send } from 'lucide-react';
import '../../styles/PostCard.css';

const PostCard: React.FC<any> = ({ id, user, location, image, description, audioName, audioCover }) => {
  const { activeCommentId, setActiveCommentId, posts, toggleLike } = useApp();
  const [isMuted, setIsMuted] = useState(false);
  const currentPost = posts.find((p) => p.id === id);
  const isLiked = currentPost?.isLiked || false;

  return (
    <div className="postcard-container">
      <div className="postcard-header">
        <p className="text-[14px]">
          Foto de <Link to={`/profile/${user}`} className="font-bold underline">{user}</Link> em <Link to="/search" className="font-bold underline">{location}</Link>
        </p>
      </div>

      <div className="main-post-layout">
        <div className="post-column">
          <div className="media-wrapper">
            {/* Imagem do Post */}
            <img src={image} alt="Post" className="media-content" />
            
            {/* MENU MOBILE COMPACTO (Dentro da imagem) */}
            <div className="interaction-menu-mobile">
              <div className="mobile-icons-capsule">
                <button className="mobile-btn" onClick={() => toggleLike(id)}>
                  <Heart size={22} className={isLiked ? 'fill-red-500 text-red-500' : 'text-white'} />
                </button>
                
                <button className="mobile-btn" onClick={() => setActiveCommentId(activeCommentId === id ? null : id)}>
                  <MessageSquare size={22} className="text-white" />
                </button>
                
                <button className="mobile-btn">
                  <Bookmark size={22} className="text-white" />
                </button>
                
                <button className="mobile-btn">
                  <Share2 size={22} className="text-white" />
                </button>

                <div className="menu-divider" />

                <button className="mobile-btn">
                  <MoreHorizontal size={22} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="bottom-cards-stack">
            <div className="description-card">
              <p className="text-[15px]">{description}</p>
            </div>

            {activeCommentId === id && (
              <div className="comments-card">
                <div className="comments-list">
                  {currentPost?.comments?.map((c: any) => (
                    <div key={c.id} className="text-[13px] mb-2">
                      <span className="font-bold">@{c.user}:</span> {c.text}
                    </div>
                  ))}
                </div>
                <div className="relative mt-4">
                  <input type="text" placeholder="Comentar..." className="comment-input" />
                  <Send size={18} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50" />
                </div>
              </div>
            )}

            <div className="music-card">
              <div className="flex items-center gap-3">
                <img src={audioCover} alt="Capa" className="w-8 h-8 rounded-full animate-spin-slow" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold">{audioName}</span>
                  <span className="text-[9px] opacity-40 uppercase tracking-widest">Ouvir Agora</span>
                </div>
              </div>
              <div onClick={() => setIsMuted(!isMuted)} className="cursor-pointer">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </div>
            </div>
          </div>
        </div>

        {/* MENU DESKTOP */}
        <div className="interaction-menu-desktop">
          <div className="interaction-icons-desktop">
            <Heart size={26} onClick={() => toggleLike(id)} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
            <MessageSquare size={26} onClick={() => setActiveCommentId(activeCommentId === id ? null : id)} />
            <Bookmark size={26} />
            <Share2 size={26} />
          </div>
          <MoreHorizontal size={26} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;