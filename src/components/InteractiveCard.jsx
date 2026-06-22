import React from 'react';

/**
 * InteractiveCard Component
 * @param {Object} props
 * @param {Function} props.onClick - Click handler
 * @param {string} props.title - Card header text
 * @param {string} [props.description] - Card descriptive text
 * @param {boolean} [props.selected=false] - If the card is in an active/selected state
 * @param {boolean} [props.disabled=false] - If the card is disabled
 * @param {string} [props.id] - Unique ID for reference
 * @param {string} [props.className=''] - Custom styling classes
 */
export default function InteractiveCard({
  onClick,
  title,
  description,
  selected = false,
  disabled = false,
  id,
  className = '',
  ...props
}) {
  return (
    <div
      id={id}
      className={`interactive-card ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={() => !disabled && onClick && onClick()}
      style={{ 
        opacity: disabled ? 0.5 : 1, 
        cursor: disabled ? 'not-allowed' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto'
      }}
      {...props}
    >
      <div className="card-title">{title}</div>
      {description && <div className="card-desc">{description}</div>}
    </div>
  );
}
