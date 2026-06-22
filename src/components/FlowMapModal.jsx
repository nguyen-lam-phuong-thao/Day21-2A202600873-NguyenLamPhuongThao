import React, { useEffect } from 'react';

/**
 * FlowMapModal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Function to close the modal
 */
export default function FlowMapModal({ isOpen, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle clicking outside the modal content to close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content animate-fade-in">
        <div className="modal-header">
          <h3 className="modal-title">Bản đồ luồng nghiệp vụ (Flow Map)</h3>
          <button 
            className="modal-close-btn" 
            onClick={onClose} 
            title="Đóng (Esc)"
          >
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          <img 
            className="modal-image"
            src="/flow_map_diagram.png" 
            alt="Human-AI Flow Map" 
          />
        </div>
      </div>
    </div>
  );
}
