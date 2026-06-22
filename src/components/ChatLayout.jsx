import React from 'react';
import RationaleCard from './RationaleCard';
import ActionButton from './ActionButton';
import { Map, ClipboardCheck } from 'lucide-react';

/**
 * ChatLayout Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Chat message content and interactive controls
 * @param {number} props.currentStep - The current active step (0 - 4)
 * @param {Function} props.onStepClick - Callback when clicking step indicator nodes
 * @param {Function} props.onReset - Callback to reset chat conversation
 * @param {Function} props.onOpenFlowMap - Callback to open the Flow Map modal
 * @param {Function} props.onOpenChecklist - Callback to open the Lab Checklist modal
 */
export default function ChatLayout({
  children,
  currentStep,
  onStepClick,
  onReset,
  onOpenFlowMap,
  onOpenChecklist
}) {
  return (
    <div className="app-wrapper">
      {/* Left Chat Window */}
      <main className="chat-section glass-container">
        {/* Top Header of Chat Window */}
        <header className="chat-header">
          <div className="chat-header-left">
            <h1 className="chat-title">
              <span className="chat-title-dot"></span>
              TV Assistant Support
            </h1>
            <span className="chat-subtitle">Hệ thống trợ lý ảo tự động hỗ trợ kỹ thuật màn hình</span>
          </div>
          <div className="chat-header-actions">
            <ActionButton 
              variant="secondary" 
              onClick={onOpenChecklist}
              icon={<ClipboardCheck size={16} />}
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              Tiêu chí Lab
            </ActionButton>

            <ActionButton 
              variant="secondary" 
              onClick={onOpenFlowMap}
              icon={<Map size={16} />}
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              Xem Flow Map
            </ActionButton>
            
            <ActionButton 
              variant="secondary" 
              onClick={onReset}
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              Reset Chat
            </ActionButton>
          </div>
        </header>

        {/* Scrollable conversation and dynamic actions area */}
        {children}
      </main>

      {/* Right Sidebar for Design Rationale */}
      <RationaleCard 
        currentStep={currentStep} 
        onStepClick={onStepClick} 
      />
    </div>
  );
}
