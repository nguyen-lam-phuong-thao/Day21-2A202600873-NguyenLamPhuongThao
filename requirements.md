# Business Context
- [cite_start]Đề tài: AI Customer Support Agent (Nhân viên AI Chăm sóc khách hàng)[cite: 42].
- Lát cắt tính năng: AI phân loại nhu cầu, xử lý tình huống "hiểu sai ý định" của khách và thiết kế vòng lặp khôi phục (Recovery Loop).

# Project Overview
Xây dựng một Interactive Prototype cho hệ thống AI Customer Support Agent. Đây là một bản mockup UI/UX, KHÔNG yêu cầu kết nối backend, database hay API LLM thật. Toàn bộ logic hội thoại sẽ được hardcode thông qua State Management để trình diễn luồng trải nghiệm người dùng (UX flow) khi AI xử lý sự cố đơn hàng.

# Tech Stack & Libraries
- Framework: React (Next.js App Router hoặc Pages Router đều được).
- Styling: Tailwind CSS.
- Icons: lucide-react (sử dụng các icon cơ bản như Bot, User, AlertCircle, FileText, CheckCircle).
- Animation: framer-motion (yêu cầu các hiệu ứng mượt mà khi xuất hiện tin nhắn mới hoặc form nhập liệu để mô phỏng "thời gian suy nghĩ" của AI).

# State Management Architecture
Sử dụng React Hooks (`useState`, `useEffect`) để quản lý các state chính:
- `currentStep` (number): Biến điều hướng luồng kịch bản (từ 0 đến 4).
- `messages` (array of objects): Lưu trữ lịch sử chat. Mỗi object gồm `{ id, sender: 'ai' | 'user', type: 'text' | 'component', content, timestamp }`.
- `isTyping` (boolean): Hiển thị trạng thái "AI đang gõ..." (typing indicator) trước mỗi phản hồi của AI.

# Core UI Components
1. ChatLayout: Khung chat chính, có header chứa thông tin AI Support và nút "Gặp nhân viên thật" (luôn hiển thị).
2. MessageBubble: Bong bóng chat phân biệt màu sắc giữa AI và User.
3. InteractiveCard: Khối giao diện hiển thị các lựa chọn (Ask) hoặc hiển thị chính sách bằng chứng (Explainability).
4. ActionButton: Các nút thao tác của người dùng, tích hợp phản hồi Explicit Feedback (ví dụ: "Dừng lại, tôi không muốn hoàn tiền").

# Scenario Flow (The State Machine)
Luồng này phải chạy tuần tự dựa trên tương tác của người dùng:

- Step 0 (Onboarding & Initialization)
  - AI tự động gửi tin nhắn chào mừng ngay khi load trang.
  - Nội dung: "Chào bạn, tôi là AI Hỗ trợ. Tôi có thể tra cứu đơn hàng và chính sách. Tôi không thể tự hoàn tiền. Bạn luôn có thể gặp nhân viên bằng nút ở góc phải."

- Step 1 (Handling Ambiguity - The "Ask" Action)
  - Kích hoạt khi User gửi: "Cái màn hình tôi mới nhận bị lỗi rồi."
  - AI phản hồi: "Rất tiếc về sự cố. Để tôi hỗ trợ đúng nhất, lỗi bạn gặp là gì?"
  - Hiển thị InteractiveCard với 3 nút: [Không lên nguồn] | [Điểm chết/Sọc] | [Trầy xước].

- Step 2 (Explainability & "Act" Action)
  - Kích hoạt khi User bấm chọn [Điểm chết/Sọc].
  - AI phản hồi: "Thiết bị của bạn đủ điều kiện đổi mới 1-1."
  - Ngay bên dưới, render một Quote Block hiển thị bằng chứng: "Theo CSBH: Màn hình >3 điểm chết trong 7 ngày được đổi mới."

- Step 3 (AI Failure & Explicit Recovery)
  - Kích hoạt khi User gửi: "Gửi tôi biên lai để làm thủ tục."
  - AI hiểu sai ý, render ra một Form nhập Số tài khoản ngân hàng để hoàn tiền.
  - Giao diện BẮT BUỘC có nút: "Không, tôi không muốn hoàn tiền".
  - Recovery: Khi User bấm nút này, form biến mất, AI xin lỗi và hiển thị file PDF Biên lai.

- Step 4 (Uncertainty & Human Handoff)
  - Kích hoạt khi User gửi: "Số Serial của tôi là: XYZ-12345".
  - AI delay 2 giây (mô phỏng tra cứu) và phản hồi: "Dữ liệu serial này có vẻ mâu thuẫn hoặc chưa được hệ thống ghi nhận."
  - AI chuyển sang trạng thái "Don't Act". Render InteractiveCard thông báo: "Để không mất thời gian, tôi đã gom toàn bộ lịch sử. Bạn có muốn chuyển cho nhân viên thật kiểm tra không?".