import React from 'react';

/**
 * MessageBubble Component
 * @param {Object} props
 * @param {string} props.sender - Sender of the message ('user' | 'ai')
 * @param {string} props.text - Main content text of the message
 * @param {string} [props.quote] - Optional policy/rule quote (Explainability layer)
 * @param {string} [props.quoteSource] - Optional label for the quote source
 * @param {string} [props.id] - Optional unique ID
 */
export default function MessageBubble({
  sender,
  text,
  quote,
  quoteSource,
  id,
}) {
  const isAI = sender === 'ai';
  
  return (
    <div
      id={id}
      className={`message-row ${isAI ? 'message-row-ai' : 'message-row-user'}`}
    >
      {isAI && (
        <div className="bubble-avatar avatar-ai">
          AI
        </div>
      )}
      
      <div className={`bubble ${isAI ? 'bubble-ai' : 'bubble-user'}`}>
        <div className="bubble-text">{text}</div>
        
        {isAI && quote && (
          <div className="message-quote">
            "{quote}"
            {quoteSource && (
              <span className="quote-source">— {quoteSource}</span>
            )}
          </div>
        )}
      </div>

      {!isAI && (
        <div className="bubble-avatar avatar-user" style={{ marginLeft: '12px', marginRight: 0 }}>
          U
        </div>
      )}
    </div>
  );
}
