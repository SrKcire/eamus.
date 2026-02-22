import React, { useRef } from 'react';
import { Flag, UserMinus } from 'lucide-react';
import ModalPortal from './ModalPortal'; // Importe o Portal

interface OptionsModalProps {
  onClose: () => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <ModalPortal>
      <div
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
        className="modal-overlay" /* O overlay agora cobre a tela inteira via portal */
      >
        <div className="w-[400px] modal-content">
          <div className="flex flex-col text-center">
            <button className="btn-option-danger">
              <Flag size={18} /> Denunciar
            </button>
            <button className="btn-option-danger">
              <UserMinus size={18} /> Deixar de seguir
            </button>
            <button onClick={onClose} className="btn-option-cancel">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default OptionsModal;
