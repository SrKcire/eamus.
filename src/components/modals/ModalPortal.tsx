import React from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  // Procuramos pela div 'modal-root' no seu index.html
  const modalRoot = document.getElementById('modal-root');

  // Se por acaso a div não existir, ele não renderiza nada para não quebrar o app
  if (!modalRoot) {
    console.warn("Aviso: 'modal-root' não encontrada no index.html");
    return null;
  }

  return createPortal(children, modalRoot);
};

export default ModalPortal;
