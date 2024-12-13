// File: src/components/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ onAllowLocation, onEnterLocationManually }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Check your weather using TempraMap (By PS)</h2>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={onAllowLocation}>
            Allow Location Permission
          </button>
          <button
            className="btn btn-secondary"
            onClick={onEnterLocationManually}
          >
            Enter Location Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;