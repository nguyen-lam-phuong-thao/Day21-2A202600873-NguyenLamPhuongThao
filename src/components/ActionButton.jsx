import React from 'react';

/**
 * ActionButton Component
 * @param {Object} props
 * @param {Function} props.onClick - Event handler for button click
 * @param {React.ReactNode} props.children - Button text or children elements
 * @param {string} [props.variant='secondary'] - Theme color ('primary' | 'secondary' | 'danger' | 'accent')
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {React.ReactNode} [props.icon] - Optional icon component/svg
 * @param {string} [props.className=''] - Additional custom classes
 * @param {string} [props.id] - Optional ID for automated testing
 */
export default function ActionButton({
  onClick,
  children,
  variant = 'secondary',
  disabled = false,
  icon,
  className = '',
  id,
  ...props
}) {
  const variantClass = `btn-${variant}`;
  
  return (
    <button
      id={id}
      className={`btn ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
