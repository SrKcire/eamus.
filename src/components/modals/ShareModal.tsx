import React, { useState, useRef } from 'react';
import { X, Check, Send } from 'lucide-react';
import ModalPortal from './ModalPortal';

interface ShareModalProps {
  platform: string;
  image: string;
  description: string;
  audioName: string;
  postId: number;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  platform,
  image,
  description,
  audioName,
  postId,
  onClose,
}) => {
  const [shareText, setShareText] = useState(description || '');
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const executeShare = async () => {
    const shareUrl = `${window.location.origin}/post/${postId}`;
    const fullMessage = `${shareText}\n\nOuvindo: ${audioName}\nVeja mais em: ${shareUrl}`;

    if (platform === 'WhatsApp') {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(fullMessage)}`,
        '_blank'
      );
      onClose();
    } else {
      await navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <ModalPortal>
      <div
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
        className="modal-overlay"
      >
        <div className="w-[600px] modal-content modal-content-bordered">
          <div className="share-header">
            <span className="share-label">
              Compartilhar no{' '}
              <span className="text-white font-bold">{platform}</span>
            </span>
            <X
              size={20}
              className="cursor-pointer opacity-40 hover:opacity-100"
              onClick={onClose}
            />
          </div>

          <div className="share-body">
            <img src={image} alt="Preview" className="share-preview-img" />
            <textarea
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="share-textarea"
              placeholder="Escreva uma legenda..."
            />
          </div>

          <button
            onClick={executeShare}
            className={`btn-share-confirm ${
              copied
                ? 'bg-green-500 border-green-500'
                : 'border-white hover:bg-white hover:text-black'
            }`}
          >
            {copied ? <Check size={18} /> : <Send size={18} />}
            <span className="ml-2">{copied ? 'Copiado!' : 'Confirmar'}</span>
          </button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ShareModal;
