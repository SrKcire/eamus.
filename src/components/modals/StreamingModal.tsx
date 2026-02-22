import React, { useRef } from 'react';
import { X, Play, Headphones } from 'lucide-react';
import ModalPortal from './ModalPortal';
import '../../styles/StreamingModal.css';

interface StreamingModalProps {
  audioLinks?: {
    spotify?: string;
    deezer?: string;
    apple?: string;
    amazon?: string;
  };
  audioName: string;
  artistName: string;
  albumArt: string;
  onClose: () => void;
}

const StreamingModal: React.FC<StreamingModalProps> = ({
  audioLinks,
  audioName,
  artistName,
  albumArt,
  onClose,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const platforms = [
    { name: 'Spotify', key: 'spotify', color: '#1DB954' },
    { name: 'Deezer', key: 'deezer', color: '#EF5466' },
    { name: 'Apple Music', key: 'apple', color: '#FC3C44' },
    { name: 'Amazon Music', key: 'amazon', color: '#00A8E1' },
  ];

  return (
    <ModalPortal>
      <div
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
        className="streaming-modal-overlay"
      >
        <div className="streaming-modal-card">
          {/* Header com Capa */}
          <div className="streaming-modal-header">
            <img src={albumArt} alt={audioName} className="header-bg-image" />
            <div className="header-gradient-overlay" />

            <button onClick={onClose} className="close-modal-btn">
              <X size={18} />
            </button>

            <div className="header-info">
              <div className="status-badge">
                <Headphones size={12} className="pulse-icon" />
                <span>Disponível em</span>
              </div>
              <h3 className="track-title">{audioName}</h3>
              <p className="artist-subtitle">{artistName}</p>
            </div>
          </div>

          {/* Lista de Plataformas */}
          <div className="platforms-list">
            {platforms.map((p) => {
              const link = audioLinks?.[p.key as keyof typeof audioLinks];
              const hasLink = link && link !== '#';

              return (
                <a
                  key={p.name}
                  href={hasLink ? link : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`platform-item ${!hasLink ? 'disabled' : ''}`}
                  style={
                    {
                      '--brand-color': p.color,
                      '--brand-color-transparent': `${p.color}33`,
                    } as React.CSSProperties
                  }
                >
                  <div className="platform-left">
                    <div className="brand-dot" />
                    <span className="platform-name">{p.name}</span>
                  </div>

                  {hasLink ? (
                    <div className="play-icon-wrapper">
                      <Play size={14} fill="currentColor" />
                    </div>
                  ) : (
                    <X size={14} className="x-icon-disabled" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="modal-footer-brand">
            <span>eamus. sounds</span>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default StreamingModal;
