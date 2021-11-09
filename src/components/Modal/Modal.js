import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './modal.css';

const Modal = ({ formModal, children, onClose }) => {
  return (
    <div className='overlay'>
      <div className='content'>
        {formModal && <FontAwesomeIcon icon={faTimes} onClick={onClose} className='modal-icon' />}
        {children}
      </div>
    </div>
  );
};

export default Modal;
