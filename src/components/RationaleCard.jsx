import React from 'react';

// Hardcoded design rationales as requested by the user, including Step 0
const RATIONALES = {
  0: {
    title: "Step 0: Onboarding (Thiết lập kỳ vọng)",
    guideline: "Guideline 1: Make clear what the system can do",
    risk: "Low (Thiết lập giới hạn)",
    action: "Onboarding & Giới hạn thẩm quyền",
    text: "Onboarding: Thiết lập kỳ vọng cho người dùng lần đầu. Bắt buộc phải làm rõ giới hạn của AI (không tự hoàn tiền). Nút 'Gặp nhân viên' luôn hiển thị là tín hiệu hệ thống ngầm định (Implicit System Feedback) giúp người dùng yên tâm về quyền kiểm soát.",
    badgeColor: "hsl(142, 70%, 45%)"
  },
  1: {
    title: "Step 1: Ask (Khai thác thông tin)",
    guideline: "Guideline 13: Learn from user behavior / Guideline 3: Mitigate social risks",
    risk: "High (High Error Cost)",
    action: "Ask (Thu hẹp phạm vi)",
    text: "AI đang biết khách gặp vấn đề màn hình nhưng chưa biết lỗi cụ thể. Nếu AI tự đoán sẽ có rủi ro hướng dẫn sai. Do chi phí sai sót cao, AI không được tự quyết (Act) mà phải đưa ra lựa chọn (Ask) để thu hẹp phạm vi.",
    badgeColor: "hsl(190, 95%, 45%)"
  },
  2: {
    title: "Step 2: Act & Explainability (Hành động & Khả năng giải thích)",
    guideline: "Guideline 11: Make clear why the system did what it did",
    risk: "Low (Cung cấp thông tin)",
    action: "Act + Explainability (Đưa ra bằng chứng)",
    text: "Việc cung cấp thông tin chính sách có rủi ro thấp nên AI được phép Act. Quote trích dẫn chính là lớp bằng chứng (Explainability) giúp khách hàng tự kiểm chứng tính đúng đắn.",
    badgeColor: "hsl(142, 70%, 45%)"
  },
  3: {
    title: "Step 3: Failure & Explicit Recovery (Khôi phục lỗi rõ ràng)",
    guideline: "Guideline 9: Support efficient recovery / Guideline 10: Scope services when in doubt",
    risk: "High (Hiểu sai ý định khách)",
    action: "Explicit Recovery (Khôi phục nhanh chóng)",
    text: "AI hiểu sai từ 'thủ tục' thành 'yêu cầu hoàn tiền'. Nút bấm 'Không, tôi không muốn hoàn tiền' là Explicit User Feedback. Nó giúp người dùng dễ phát hiện lỗi, hoàn tác ngay lập tức và đưa luồng khôi phục lại đúng hướng.",
    badgeColor: "hsl(346, 84%, 61%)"
  },
  4: {
    title: "Step 4: Uncertainty & Don't Act (Không tự quyết khi nghi ngờ)",
    guideline: "Guideline 10: Scope services when in doubt / Guidelines for Human-AI Handoff",
    risk: "Critical (Mâu thuẫn dữ liệu hệ thống)",
    action: "Don't Act + Handoff (Chuyển giao nhân sự)",
    text: "AI không chắc chắn do dữ liệu Serial mâu thuẫn. Rủi ro: Nếu bắt khách nhập lại nhiều lần sẽ gây ức chế (Implicit User Feedback). AI chọn Don't Act, dừng lại và đề xuất chuyển giao cho nhân viên thật (Handoff) kèm toàn bộ bối cảnh.",
    badgeColor: "hsl(263, 100%, 75%)"
  }
};

/**
 * RationaleCard Component
 * @param {Object} props
 * @param {number} props.currentStep - The current step of the application (0 - 4)
 * @param {Function} [props.onStepClick] - Jump to a step directly (for testing/eval)
 */
export default function RationaleCard({ currentStep, onStepClick }) {
  const activeRationale = RATIONALES[currentStep] || RATIONALES[0];
  
  // Calculate progress bar width based on active step (0 to 4 -> 5 nodes)
  const progressWidth = `${(currentStep / 4) * 100}%`;

  return (
    <aside className="rationale-sidebar glass-container animate-slide-in-right">
      <div className="rationale-header">
        <div className="chat-title-dot" style={{ backgroundColor: activeRationale.badgeColor }}></div>
        <h3>Design Rationale</h3>
        <span className="rationale-badge">
          {currentStep === 0 ? "Onboarding" : `Step ${currentStep}/4`}
        </span>
      </div>

      <div className="rationale-content">
        {/* Step Navigation & Status Indicators */}
        <div className="step-indicator-wrapper">
          <div className="step-indicator-line"></div>
          <div 
            className="step-indicator-line-progress" 
            style={{ width: progressWidth }}
          ></div>
          {[0, 1, 2, 3, 4].map((step) => {
            let stepClass = "";
            if (step === currentStep) stepClass = "active";
            else if (step < currentStep) stepClass = "completed";

            return (
              <button
                key={step}
                className={`step-node ${stepClass}`}
                onClick={() => onStepClick && onStepClick(step)}
                title={step === 0 ? "Chuyển đến Onboarding" : `Chuyển đến Step ${step}`}
              >
                {step}
              </button>
            );
          })}
        </div>

        {/* Design details card */}
        <div className="rationale-card-body active">
          <h4 className="rationale-title" style={{ color: activeRationale.badgeColor }}>
            {activeRationale.title}
          </h4>
          
          <div className="rationale-text">
            <p style={{ fontWeight: '500', color: '#e2e8f0', fontSize: '0.85rem' }}>
              🎯 HƯỚNG DẪN: <span style={{ color: 'var(--text-muted)' }}>{activeRationale.guideline}</span>
            </p>
            <p style={{ fontWeight: '500', color: '#e2e8f0', fontSize: '0.85rem' }}>
              ⚠️ MỨC RỦI RO: <span style={{ color: activeRationale.badgeColor }}>{activeRationale.risk}</span>
            </p>
            <p style={{ fontWeight: '500', color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '16px' }}>
              ⚡ HÀNH ĐỘNG AI: <span style={{ color: 'var(--accent)' }}>{activeRationale.action}</span>
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '12px 0' }} />
            <p style={{ color: '#f3f4f6', fontSize: '0.92rem', lineHeight: '1.7' }}>
              {activeRationale.text}
            </p>
          </div>
        </div>
      </div>

      <div className="rationale-footer">
        <div className="meta-info">
          <div className="meta-info-item">
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
            <span>Evaluation Mode Active</span>
          </div>
          <div>Human-AI Lab © 2026</div>
        </div>
      </div>
    </aside>
  );
}
