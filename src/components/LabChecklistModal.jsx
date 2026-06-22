import React, { useEffect } from 'react';

const CRITERIA = [
  {
    id: 1,
    title: "Onboarding cho lần đầu sử dụng",
    desc: "AI chào đón, tự giới thiệu chức năng và làm rõ giới hạn thẩm quyền ở Step 0 (ngay khi load app)."
  },
  {
    id: 2,
    title: "Ít nhất 4 kịch bản ngoài Onboarding",
    desc: "Kịch bản khai thác lỗi (S1), Trình bày chính sách (S2), Xử lý AI hiểu sai (S3) và Xử lý dữ liệu mâu thuẫn (S4)."
  },
  {
    id: 3,
    title: "Lát cắt xuyên suốt 4 giai đoạn hội thoại",
    desc: "Onboarding (S0) -> During (S1, S2 - tương tác khắc phục lỗi) -> After (S4 - handoff tới CSKH) -> Feedback (S3 - nút khôi phục)."
  },
  {
    id: 4,
    title: "Tích hợp đủ 3 mức tự chủ (Autonomy)",
    desc: "Act (S2 - Đưa ra chính sách), Ask (S1 - Hỏi lỗi TV), Don't Act (S4 - Dừng tự động vì mâu thuẫn hệ thống)."
  },
  {
    id: 5,
    title: "Vòng Feedback và Recovery hoàn chỉnh",
    desc: "Step 3 cung cấp nút 'Không, tôi không muốn hoàn tiền' để người dùng đính chính sai sót của AI và đưa luồng quay lại đúng hướng."
  },
  {
    id: 6,
    title: "Đầy đủ 4 loại tín hiệu Feedback (Ma trận 2x2)",
    desc: "Explicit Positive (Xác nhận), Explicit Negative (Sửa sai hoàn tiền ở S3), Implicit Positive (Tiếp tục flow), Implicit Negative (Dừng lại đề xuất Handoff tránh bắt nhập lại ở S4)."
  },
  {
    id: 7,
    title: "Lớp bằng chứng (Explainability)",
    desc: "Step 2 cung cấp quote trích dẫn trực tiếp từ 'Điều 4 - Chính sách bảo hành thiết bị hiển thị' làm căn cứ xác thực."
  },
  {
    id: 8,
    title: "Thẻ Design Rationale tương ứng cạnh luồng chat",
    desc: "Sidebar RationaleCard hiển thị tự động, giải thích chi tiết mục tiêu thiết kế và mức độ rủi ro tương ứng với từng step."
  },
  {
    id: 9,
    title: "Flow Map trực quan tích hợp sẵn",
    desc: "Nút 'Xem Flow Map' trên header hiển thị sơ đồ luồng nghiệp vụ 5 bước của hệ thống."
  },
  {
    id: 10,
    title: "Demo path (Nhảy bước nhanh để kiểm thử)",
    desc: "Các node số (0 đến 4) trên Sidebar cho phép click để dịch chuyển nhanh lịch sử chat đến từng bước mong muốn."
  }
];

/**
 * LabChecklistModal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Visibility status
 * @param {Function} props.onClose - Close event handler
 */
export default function LabChecklistModal({ isOpen, onClose }) {
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

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content animate-fade-in" style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <h3 className="modal-title">Bảng kiểm tra tiêu chí Lab Day 18</h3>
          <button 
            className="modal-close-btn" 
            onClick={onClose} 
            title="Đóng (Esc)"
          >
            ✕
          </button>
        </div>
        
        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto', display: 'block', padding: '16px 20px', background: 'transparent' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {CRITERIA.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  display: 'flex', 
                  gap: '14px', 
                  alignItems: 'flex-start',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '12px 16px',
                  borderRadius: '12px'
                }}
              >
                <span style={{ fontSize: '1.2rem', color: 'var(--success)', marginTop: '2px', userSelect: 'none' }}>
                  ✅
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: '600', color: '#ffffff', fontSize: '0.95rem' }}>
                    {item.id}. {item.title}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
