import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';

const Modal = ({ children }: { children: ReactNode }) => {
  const portalDiv = document.getElementById('modal');

  if (!portalDiv) return null;

  return (
    createPortal(
      <div className='modal'>
        <div className='modal-dialog'>
          {children}
        </div>
      </div>,
      portalDiv)
  );
};

export default Modal;