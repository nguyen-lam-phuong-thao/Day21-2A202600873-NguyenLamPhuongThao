import React, { useState, useEffect, useRef } from 'react';
import ChatLayout from './components/ChatLayout';
import MessageBubble from './components/MessageBubble';
import InteractiveCard from './components/InteractiveCard';
import ActionButton from './components/ActionButton';
import FlowMapModal from './components/FlowMapModal';
import LabChecklistModal from './components/LabChecklistModal';

// Pre-defined conversation logs matching each step of design rationale, starting from Step 0
const STANDARD_HISTORIES = {
  0: [
    {
      id: 'step0-ai',
      sender: 'ai',
      text: 'Chào bạn, tôi là AI Hỗ trợ. Tôi có thể tra cứu lỗi thiết bị và chính sách bảo hành. Tuy nhiên, tôi không có thẩm quyền tự động hoàn tiền. Bạn luôn có thể kết nối với nhân viên CSKH bất cứ lúc nào qua nút trên cùng.'
    }
  ],
  1: [
    {
      id: 'step0-ai',
      sender: 'ai',
      text: 'Chào bạn, tôi là AI Hỗ trợ. Tôi có thể tra cứu lỗi thiết bị và chính sách bảo hành. Tuy nhiên, tôi không có thẩm quyền tự động hoàn tiền. Bạn luôn có thể kết nối với nhân viên CSKH bất cứ lúc nào qua nút trên cùng.'
    },
    {
      id: 'step0-user',
      sender: 'user',
      text: 'Tôi muốn báo lỗi thiết bị'
    },
    {
      id: 'step1-ai',
      sender: 'ai',
      text: 'Chào bạn, mình ghi nhận tivi của bạn đang gặp vấn đề về hiển thị màn hình. Để hỗ trợ chính xác nhất, bạn vui lòng chọn lỗi cụ thể mà tivi đang gặp phải dưới đây:'
    }
  ],
  2: [
    {
      id: 'step0-ai',
      sender: 'ai',
      text: 'Chào bạn, tôi là AI Hỗ trợ. Tôi có thể tra cứu lỗi thiết bị và chính sách bảo hành. Tuy nhiên, tôi không có thẩm quyền tự động hoàn tiền. Bạn luôn có thể kết nối với nhân viên CSKH bất cứ lúc nào qua nút trên cùng.'
    },
    {
      id: 'step0-user',
      sender: 'user',
      text: 'Tôi muốn báo lỗi thiết bị'
    },
    {
      id: 'step1-ai',
      sender: 'ai',
      text: 'Chào bạn, mình ghi nhận tivi của bạn đang gặp vấn đề về hiển thị màn hình. Để hỗ trợ chính xác nhất, bạn vui lòng chọn lỗi cụ thể mà tivi đang gặp phải dưới đây:'
    },
    {
      id: 'step1-user',
      sender: 'user',
      text: 'Màn hình tối đen, vẫn có tiếng'
    },
    {
      id: 'step2-ai',
      sender: 'ai',
      text: 'Với lỗi màn hình tối đen nhưng vẫn có âm thanh, theo chính sách bảo hành phần hiển thị:',
      quote: 'Theo Điều 4 - Chính sách bảo hành thiết bị hiển thị: Thiết bị gặp lỗi panel màn hình trong vòng 12 tháng đầu sẽ được thay thế linh kiện miễn phí nếu không có dấu hiệu va đập vật lý.',
      quoteSource: 'Chính sách bảo hành sản phẩm Smart TV'
    }
  ],
  3: [
    {
      id: 'step0-ai',
      sender: 'ai',
      text: 'Chào bạn, tôi là AI Hỗ trợ. Tôi có thể tra cứu lỗi thiết bị và chính sách bảo hành. Tuy nhiên, tôi không có thẩm quyền tự động hoàn tiền. Bạn luôn có thể kết nối với nhân viên CSKH bất cứ lúc nào qua nút trên cùng.'
    },
    {
      id: 'step0-user',
      sender: 'user',
      text: 'Tôi muốn báo lỗi thiết bị'
    },
    {
      id: 'step1-ai',
      sender: 'ai',
      text: 'Chào bạn, mình ghi nhận tivi của bạn đang gặp vấn đề về hiển thị màn hình. Để hỗ trợ chính xác nhất, bạn vui lòng chọn lỗi cụ thể mà tivi đang gặp phải dưới đây:'
    },
    {
      id: 'step1-user',
      sender: 'user',
      text: 'Màn hình tối đen, vẫn có tiếng'
    },
    {
      id: 'step2-ai',
      sender: 'ai',
      text: 'Với lỗi màn hình tối đen nhưng vẫn có âm thanh, theo chính sách bảo hành phần hiển thị:',
      quote: 'Theo Điều 4 - Chính sách bảo hành thiết bị hiển thị: Thiết bị gặp lỗi panel màn hình trong vòng 12 tháng đầu sẽ được thay thế linh kiện miễn phí nếu không có dấu hiệu va đập vật lý.',
      quoteSource: 'Chính sách bảo hành sản phẩm Smart TV'
    },
    {
      id: 'step2-user',
      sender: 'user',
      text: 'Tiếp tục làm thủ tục bảo hành'
    },
    {
      id: 'step3-ai',
      sender: 'ai',
      text: 'Tôi đã hiểu yêu cầu của bạn. Tôi sẽ tiến hành làm thủ tục hoàn tiền cho bạn ngay bây giờ.'
    }
  ],
  4: [
    {
      id: 'step0-ai',
      sender: 'ai',
      text: 'Chào bạn, tôi là AI Hỗ trợ. Tôi có thể tra cứu lỗi thiết bị và chính sách bảo hành. Tuy nhiên, tôi không có thẩm quyền tự động hoàn tiền. Bạn luôn có thể kết nối với nhân viên CSKH bất cứ lúc nào qua nút trên cùng.'
    },
    {
      id: 'step0-user',
      sender: 'user',
      text: 'Tôi muốn báo lỗi thiết bị'
    },
    {
      id: 'step1-ai',
      sender: 'ai',
      text: 'Chào bạn, mình ghi nhận tivi của bạn đang gặp vấn đề về hiển thị màn hình. Để hỗ trợ chính xác nhất, bạn vui lòng chọn lỗi cụ thể mà tivi đang gặp phải dưới đây:'
    },
    {
      id: 'step1-user',
      sender: 'user',
      text: 'Màn hình tối đen, vẫn có tiếng'
    },
    {
      id: 'step2-ai',
      sender: 'ai',
      text: 'Với lỗi màn hình tối đen nhưng vẫn có âm thanh, theo chính sách bảo hành phần hiển thị:',
      quote: 'Theo Điều 4 - Chính sách bảo hành thiết bị hiển thị: Thiết bị gặp lỗi panel màn hình trong vòng 12 tháng đầu sẽ được thay thế linh kiện miễn phí nếu không có dấu hiệu va đập vật lý.',
      quoteSource: 'Chính sách bảo hành sản phẩm Smart TV'
    },
    {
      id: 'step2-user',
      sender: 'user',
      text: 'Tiếp tục làm thủ tục bảo hành'
    },
    {
      id: 'step3-ai',
      sender: 'ai',
      text: 'Tôi đã hiểu yêu cầu của bạn. Tôi sẽ tiến hành làm thủ tục hoàn tiền cho bạn ngay bây giờ.'
    },
    {
      id: 'step3-user',
      sender: 'user',
      text: 'Không, tôi không muốn hoàn tiền'
    },
    {
      id: 'step4-ai-init',
      sender: 'ai',
      text: 'Xin lỗi bạn, tôi đã hiểu nhầm. Tôi sẽ chuyển hướng sang đăng ký sửa chữa bảo hành tại nhà. Vui lòng nhập số Serial của Tivi để tiếp tục.'
    }
  ]
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState(STANDARD_HISTORIES[0]);
  const [serialInput, setSerialInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHandoffOffered, setIsHandoffOffered] = useState(false);
  const [isHandoffConnected, setIsHandoffConnected] = useState(false);
  const [isFlowMapOpen, setIsFlowMapOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages list updates or typing status updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle manual step jumping via Sidebar nodes
  const handleStepJump = (step) => {
    setCurrentStep(step);
    setMessages(STANDARD_HISTORIES[step]);
    setSerialInput('');
    setIsHandoffOffered(step === 4 ? isHandoffOffered : false);
    setIsHandoffConnected(step === 4 ? isHandoffConnected : false);
  };

  // Reset function to revert all state back to Step 0
  const handleReset = () => {
    setCurrentStep(0);
    setMessages(STANDARD_HISTORIES[0]);
    setSerialInput('');
    setIsTyping(false);
    setIsHandoffOffered(false);
    setIsHandoffConnected(false);
  };

  // Simulated AI response helper
  const simulateAIResponse = (userText, nextStep, getAIResponseData) => {
    // 1. Add User Message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Set next step
    setCurrentStep(nextStep);

    // 3. Add AI Message after delay
    setTimeout(() => {
      setIsTyping(false);
      const aiMsgs = getAIResponseData();
      setMessages((prev) => [...prev, ...aiMsgs]);
    }, 700);
  };

  // Step 0 Option click
  const handleStartReport = () => {
    simulateAIResponse(
      'Tôi muốn báo lỗi thiết bị',
      1,
      () => [
        {
          id: `ai-step1-${Date.now()}`,
          sender: 'ai',
          text: 'Chào bạn, mình ghi nhận tivi của bạn đang gặp vấn đề về hiển thị màn hình. Để hỗ trợ chính xác nhất, bạn vui lòng chọn lỗi cụ thể mà tivi đang gặp phải dưới đây:'
        }
      ]
    );
  };

  // Step 1 Options selection
  const handleSelectError = (errorTitle) => {
    simulateAIResponse(
      errorTitle,
      2,
      () => [
        {
          id: `ai-step2-${Date.now()}`,
          sender: 'ai',
          text: `Với lỗi "${errorTitle}" bạn chọn, theo chính sách bảo hành phần hiển thị:`,
          quote: "Theo Điều 4 - Chính sách bảo hành thiết bị hiển thị: Thiết bị gặp lỗi panel màn hình trong vòng 12 tháng đầu sẽ được thay thế linh kiện miễn phí nếu không có dấu hiệu va đập vật lý.",
          quoteSource: "Chính sách bảo hành sản phẩm Smart TV"
        }
      ]
    );
  };

  // Step 2 Actions selection
  const handleStep2Action = (actionType) => {
    if (actionType === 'read_policy') {
      const userMsg = {
        id: `user-action-${Date.now()}`,
        sender: 'user',
        text: 'Đọc toàn bộ chính sách bảo hành'
      };
      setMessages(prev => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: `ai-info-${Date.now()}`,
          sender: 'ai',
          text: 'Đang tải toàn bộ văn bản chính sách bảo hành. Bạn vui lòng xem thêm tài liệu chi tiết tại địa chỉ: https://warranty-policy.smarttv.vn'
        }]);
      }, 500);
    } else if (actionType === 'continue_warranty') {
      simulateAIResponse(
        'Tiếp tục làm thủ tục bảo hành',
        3,
        () => [
          {
            id: `ai-step3-${Date.now()}`,
            sender: 'ai',
            text: 'Tôi đã hiểu yêu cầu của bạn. Tôi sẽ tiến hành làm thủ tục hoàn tiền cho bạn ngay bây giờ.'
          }
        ]
      );
    }
  };

  // Step 3 Actions selection
  const handleStep3Action = (actionType) => {
    if (actionType === 'recovery') {
      simulateAIResponse(
        'Không, tôi không muốn hoàn tiền',
        4,
        () => [
          {
            id: `ai-step4-${Date.now()}`,
            sender: 'ai',
            text: 'Xin lỗi bạn, tôi đã hiểu nhầm. Tôi sẽ chuyển hướng sang đăng ký sửa chữa bảo hành tại nhà. Vui lòng nhập số Serial của Tivi để tiếp tục.'
          }
        ]
      );
    } else if (actionType === 'confirm_refund') {
      const userMsg = {
        id: `user-confirm-${Date.now()}`,
        sender: 'user',
        text: 'Đúng, hãy hoàn tiền cho tôi'
      };
      setMessages(prev => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: `ai-refund-${Date.now()}`,
          sender: 'ai',
          text: 'Yêu cầu hoàn tiền đã được ghi nhận. Vui lòng chuẩn bị hóa đơn mua hàng và gửi lại cho chúng tôi để làm thủ tục đối soát.'
        }]);
      }, 500);
    }
  };

  // Step 4 Serial submission
  const handleSerialSubmit = (e) => {
    e.preventDefault();
    if (!serialInput.trim()) return;

    const inputVal = serialInput.trim();
    setSerialInput('');

    simulateAIResponse(
      `Mã số Serial Tivi của tôi là: ${inputVal}`,
      4,
      () => {
        setIsHandoffOffered(true);
        return [
          {
            id: `ai-serial-ack-${Date.now()}`,
            sender: 'ai',
            text: `Tôi đã nhận được số Serial "${inputVal}". Tuy nhiên, hệ thống đối soát dữ liệu báo cáo thông tin mâu thuẫn: Số Serial này tương ứng với dòng máy đã hết hạn bảo hành trên hệ thống, nhưng hóa đơn mua hàng bạn cung cấp lại hiển thị ngày mua vẫn nằm trong thời hạn bảo hành.`
          },
          {
            id: `ai-serial-dontact-${Date.now()}`,
            sender: 'ai',
            text: 'Do dữ liệu mâu thuẫn dẫn tới độ tin cậy thấp, để tránh việc bắt bạn phải nhập lại thông tin nhiều lần gây ức chế, tôi sẽ dừng xử lý tự động và đề xuất kết nối bạn trực tiếp với nhân viên hỗ trợ kỹ thuật (Handoff).'
          }
        ];
      }
    );
  };

  // Step 4 Handoff confirmation
  const handleHandoffConnect = () => {
    simulateAIResponse(
      'Đồng ý kết nối nhân viên hỗ trợ',
      4,
      () => {
        setIsHandoffConnected(true);
        return [
          {
            id: `ai-handoff-connected-${Date.now()}`,
            sender: 'ai',
            text: 'Đang kết nối... Toàn bộ bối cảnh (Lỗi hiển thị màn hình, mã Serial và lịch sử hội thoại) đã được chuyển giao cho Kỹ thuật viên hỗ trợ trực tuyến. Nhân viên sẽ phản hồi bạn trong 1 - 2 phút nữa. Cảm ơn bạn!'
          }
        ];
      }
    );
  };

  return (
    <>
      <ChatLayout
        currentStep={currentStep}
        onStepClick={handleStepJump}
        onReset={handleReset}
        onOpenFlowMap={() => setIsFlowMapOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      >
        {/* Scrollable Conversation Stream */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              sender={msg.sender}
              text={msg.text}
              quote={msg.quote}
              quoteSource={msg.quoteSource}
            />
          ))}
          
          {isTyping && (
            <div className="message-row message-row-ai">
              <div className="bubble-avatar avatar-ai">AI</div>
              <div className="bubble bubble-ai" style={{ padding: '10px 16px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'fadeIn 1s infinite alternate' }}></span>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'fadeIn 1s infinite alternate 0.2s' }}></span>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'fadeIn 1s infinite alternate 0.4s' }}></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Interaction Overlay depending on currentStep */}
        <div className="input-area">
          {/* Step 0 Actions */}
          {currentStep === 0 && !isTyping && (
            <div className="actions-container">
              <ActionButton
                variant="primary"
                className="pulse-primary"
                onClick={handleStartReport}
              >
                Tôi muốn báo lỗi thiết bị →
              </ActionButton>
            </div>
          )}

          {/* Step 1 Options */}
          {currentStep === 1 && !isTyping && (
            <div className="interactive-options-container">
              <InteractiveCard
                title="Màn hình tối đen, vẫn có tiếng"
                description="Tivi có âm thanh bình thường nhưng màn hình hoàn toàn tối."
                onClick={() => handleSelectError('Màn hình tối đen, vẫn có tiếng')}
              />
              <InteractiveCard
                title="Màn hình bị sọc kẻ"
                description="Xuất hiện các sọc kẻ ngang hoặc kẻ dọc trên màn hình hiển thị."
                onClick={() => handleSelectError('Màn hình bị sọc kẻ')}
              />
              <InteractiveCard
                title="Màn hình chớp nháy liên tục"
                description="Đèn nền nhấp nháy hoặc màn hình chớp tắt liên tục khi xem."
                onClick={() => handleSelectError('Màn hình chớp nháy liên tục')}
              />
            </div>
          )}

          {/* Step 2 Actions */}
          {currentStep === 2 && !isTyping && (
            <div className="actions-container">
              <ActionButton
                variant="secondary"
                onClick={() => handleStep2Action('read_policy')}
              >
                Đọc toàn bộ chính sách bảo hành
              </ActionButton>
              <ActionButton
                variant="primary"
                className="pulse-primary"
                onClick={() => handleStep2Action('continue_warranty')}
              >
                Tiếp tục làm thủ tục bảo hành →
              </ActionButton>
            </div>
          )}

          {/* Step 3 Actions */}
          {currentStep === 3 && !isTyping && (
            <div className="actions-container">
              <ActionButton
                variant="danger"
                className="pulse-primary"
                onClick={() => handleStep3Action('recovery')}
              >
                Không, tôi không muốn hoàn tiền
              </ActionButton>
              <ActionButton
                variant="secondary"
                onClick={() => handleStep3Action('confirm_refund')}
              >
                Đúng, hãy hoàn tiền cho tôi
              </ActionButton>
            </div>
          )}

          {/* Step 4 Input Form or Handoff */}
          {currentStep === 4 && !isTyping && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              {!isHandoffOffered ? (
                <form onSubmit={handleSerialSubmit} className="text-input-form">
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Nhập mã số Serial của Tivi (Ví dụ: TV12345)..."
                    value={serialInput}
                    onChange={(e) => setSerialInput(e.target.value)}
                  />
                  <ActionButton
                    variant="primary"
                    type="submit"
                    disabled={!serialInput.trim()}
                    style={{ padding: '8px 16px', borderRadius: '10px' }}
                  >
                    Gửi Serial
                  </ActionButton>
                </form>
              ) : (
                <div className="actions-container" style={{ margin: 0 }}>
                  {!isHandoffConnected ? (
                    <ActionButton
                      variant="accent"
                      className="pulse-primary"
                      onClick={handleHandoffConnect}
                    >
                      ☎ Chuyển kết nối tới Nhân Viên Hỗ Trợ (Handoff)
                    </ActionButton>
                  ) : (
                    <div style={{ color: 'var(--success)', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
                      Đã chuyển giao bối cảnh cho nhân viên hỗ trợ thành công.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </ChatLayout>

      {/* Map modal overlay */}
      <FlowMapModal 
        isOpen={isFlowMapOpen} 
        onClose={() => setIsFlowMapOpen(false)} 
      />

      {/* Checklist modal overlay */}
      <LabChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </>
  );
}
