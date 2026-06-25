# Day 21: Individual Scenario Dataset v0
**Owner:** Nhật Anh (NA)

## 1. Chọn use case và quality question
- **Use case:** Smart TV AI Support (Onboarding & Warranty Registration)
- **Unit of AI Work:** Khách hàng cung cấp thông tin $\rightarrow$ Agent nhận diện, trích xuất (Tên, SĐT, Model TV) để xuất ra giao diện Thẻ bảo hành điện tử (Digital Warranty Card).

**Quality question chính:**
> Agent có thu thập đúng/đủ thông tin cần thiết và trích xuất đúng format để tạo Thẻ bảo hành điện tử mà không bịa ra thông tin (hallucination) hoặc bỏ sót dữ liệu khách đã cung cấp không?

| Thành phần | Câu trả lời |
| :--- | :--- |
| **Quality question chính** | Như trên |
| **Vì sao câu hỏi này quan trọng với user?** | Nếu thẻ bảo hành bị ghi sai tên hoặc SĐT, khách hàng sẽ gặp khó khăn khi bảo hành sau này, gây bực tức và mất niềm tin vào hệ thống. |
| **Nếu agent fail ở đây, hậu quả là gì?** | Bịa ra mã Model sai (hallucination), tạo thẻ bảo hành không hợp lệ, hoặc hỏi đi hỏi lại thông tin khách đã cung cấp. |
| **Behavior nào là bắt buộc?** | Phải xác nhận lại nếu thông tin nhập nhằng, và chỉ chuyển sang bước hiển thị Thẻ khi đã thu thập đủ 3 trường: Tên, SĐT, Model. |
| **Behavior nào bị cấm?** | Tự động điền bừa số điện thoại/Model nếu khách không nói; tạo thẻ khi khách chưa đồng ý. |

## 2. Thiết kế User Input Grid
| Dimension | Values | Vì sao làm agent phải đổi behavior? |
| :--- | :--- | :--- |
| **Context Completeness** (Độ đầy đủ) | Cung cấp đủ 1 lần, Thiếu SĐT, Sai định dạng Model, Không nhớ Model | Agent phải biết lúc nào cần hỏi thêm, lúc nào được phép chuyển sang bước tạo thẻ. |
| **Information Ambiguity** (Độ nhập nhằng) | Rõ ràng, Đưa 2 SĐT, Đọc nhầm Serial thành Model, Viết sai chính tả tên | Agent phải xác nhận lại thông tin thay vì tự động đoán bừa (chống hallucination). |
| **User Style** (Phong cách) | Ngắn gọn, Lan man/Kể lể, Bực tức (do TV hỏng) | Đánh giá khả năng bám sát luồng của agent khi bị nhiễu bởi cảm xúc/lời lẽ dư thừa của user. |

## 3. Bảng combinations cá nhân (10 rows)
| Combination ID | Dimension values | Expected behavior | Vì sao đáng test? | Loại |
| :--- | :--- | :--- | :--- | :--- |
| C01 | Thiếu SĐT + Rõ ràng + Ngắn gọn | Hỏi xin thêm SĐT để hoàn tất. | Happy path cơ bản nhất. | representative |
| C02 | Thiếu SĐT + Rõ ràng + Bực tức | Xin lỗi khéo léo & hỏi xin SĐT, không đôi co. | Test khả năng xoa dịu và không bị cuốn theo cảm xúc. | challenge |
| C03 | Đủ 1 lần + Đưa 2 SĐT + Ngắn gọn | Trích xuất tên, hỏi lại dùng SĐT nào làm số đăng ký chính. | Test chống ambiguity, bắt buộc xác nhận. | representative |
| C04 | Không nhớ Model + Rõ ràng + Lan man | Hướng dẫn khách cách tìm mã Model trên lưng TV hoặc trong cài đặt. | Hành vi hướng dẫn (help) rất quan trọng trong Onboarding. | representative |
| C05 | Đủ 1 lần + Viết sai chính tả tên + Bực tức | Trích xuất tên (dù sai chính tả) và SĐT, Model, sau đó xác nhận lại trước khi tạo thẻ. | Kết hợp cảm xúc và lỗi đánh máy xem agent có fail không. | challenge/high-risk |
| C06 | Sai định dạng Model + Rõ ràng + Ngắn gọn | Báo cho khách biết mã Model sai định dạng (thường bắt đầu bằng UA/QA...) và xin lại. | Bắt lỗi định dạng dữ liệu đầu vào. | representative |
| C07 | Đủ 1 lần + Rõ ràng + Lan man kể lể | Bỏ qua phần kể lể, chỉ trích xuất đúng 3 thông tin cần thiết và hỏi xác nhận tạo thẻ. | Đánh giá khả năng lọc nhiễu của agent. | challenge |
| C08 | Cung cấp đủ 1 lần + Đọc nhầm Serial thành Model + Ngắn gọn | Phân biệt được Serial và Model, yêu cầu khách cung cấp lại mã Model đúng. | Ngăn chặn việc agent tự động điền Serial vào ô Model (Hallucination). | high-risk |
| C09 | Thiếu Tên + Đưa 2 SĐT + Bực tức | Khéo léo xoa dịu, xin Tên và xác nhận SĐT nào dùng làm số liên lạc chính. | Rất dễ khiến bot bối rối và trả lời lộn xộn. | high-risk |
| C10 | Không nhớ Model + Rõ ràng + Bực tức | Thông cảm với sự bực tức, đưa ra hướng dẫn cực kỳ ngắn gọn và dễ hiểu để tìm Model. | Tình huống thực tế phổ biến khi user mất kiên nhẫn. | high-risk |

## 4. Prompt đã dùng
```text
Bạn là người dùng thật đang nhắn cho một AI assistant.

Tôi đang thiết kế test inputs cho use case:
[Smart TV AI Support - Khách hàng cung cấp thông tin để tạo Thẻ bảo hành điện tử]

Quality question:
[Agent có thu thập đúng/đủ thông tin cần thiết và trích xuất đúng format để tạo Thẻ bảo hành điện tử mà không bịa ra thông tin (hallucination) hoặc bỏ sót dữ liệu khách đã cung cấp không?]

Tôi đã chọn các combinations sau. Nhiệm vụ của bạn là viết lại mỗi combination thành 2 user inputs tự nhiên.

Yêu cầu:
- Không tự thêm combination mới.
- Không thay đổi intent, risk hoặc context completeness đã cho.
- Viết như user thật, không quá sạch.
- Có cả câu ngắn, câu dài, thiếu context hoặc hơi vòng vo.
- Không giải thích cách agent nên trả lời.
- Output dạng bảng gồm: combination_id, user_input, style, notes.

Combinations:
(Copy nội dung bảng ở mục 3 dán vào đây)
```

## 5. Bảng Individual Scenario Dataset v0 (20 rows)
*(Sau khi sinh dữ liệu bằng AI và lọc lại, điền 20 câu vào bảng chuẩn này)*

| scenario_id | owner | use_case | quality_question | combination_id | dimension_values | user_input | style | expected_behavior | why_included | set_type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| NA01 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C01 | Thiếu SĐT + Ngắn gọn | "Kích hoạt bảo hành cho TV UA50, tên Tuấn" | Ngắn gọn | Hỏi xin thêm SĐT | Test baseline | representative |
| NA02 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C01 | Thiếu SĐT + Ngắn gọn | "Tôi là Hoa, muốn đăng ký bảo hành mã QLED65" | Ngắn gọn | Hỏi xin thêm SĐT | Test baseline | representative |
| NA03 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C02 | Thiếu SĐT + Bực tức | "TV chớp giật liên tục bực cả mình, tên tôi là Tuấn, mã model UA50, đăng ký bảo hành ngay cho tôi!" | Bực bội | Xoa dịu & xin SĐT | Test missing + angry | challenge |
| NA04 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C02 | Thiếu SĐT + Bực tức | "Mới mua cái TV mã 43X80L mà đã tịt ngòi, làm ăn chán thật, tôi tên Minh làm thẻ bảo hành lẹ đi" | Bực bội | Xoa dịu & xin SĐT | Test missing + angry | challenge |
| NA05 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C03 | Đủ 1 lần + Đưa 2 SĐT | "Đăng ký bảo hành, tên Khang, model NeoQLED. ĐT: 0901234567 hoặc 0987654321." | Ngắn gọn | Trích xuất tên, hỏi SĐT đăng ký chính | Test ambiguity | representative |
| NA06 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C03 | Đủ 1 lần + Đưa 2 SĐT | "Nguyễn Văn A, mã TV OLED55. Số tui là 0911222333, số vợ 0944555666 gọi ai cũng được." | Ngắn gọn | Trích xuất tên, hỏi SĐT đăng ký chính | Test ambiguity | representative |
| NA07 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C04 | Không nhớ Model + Lan man | "Hôm qua nhà tôi mới chuyển đến nhà mới, lúc tháo TV ra vệ sinh thì thấy rách tem. Bây giờ tôi muốn đăng ký bảo hành điện tử. Tên tôi là Hưng, SĐT 0909000999, còn cái mã TV thì tôi vứt hộp rồi không nhớ nổi." | Lan man | Hướng dẫn tìm mã Model | Test help behavior | representative |
| NA08 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C04 | Không nhớ Model + Lan man | "Chào em, chị là Mai (0988111222). Chị mua tivi tặng bố mẹ ở quê, tivi bự lắm mà giờ chị chả nhớ mã gì nữa. Chị muốn làm thẻ bảo hành thì sao?" | Lan man | Hướng dẫn tìm mã Model | Test help behavior | representative |
| NA09 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C05 | Viết sai chính tả + Bực | "TV hỏng màn hình rồi!! Tôi tên là Trâng, sđt 0933444555, model UA55RU. Làm ăn kiểu gì mau kích hoạt đi!" | Bực bội | Trích xuất (xác nhận tên), xoa dịu | Test noise + angry | challenge |
| NA10 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C05 | Viết sai chính tả + Bực | "Mã QA65Q, sđt 0977888999, tên Nguyễm Văn B. Đang coi phim tắt ngúm, tức điên!" | Bực bội | Hỏi xác nhận tên Nguyễm/Nguyễn | Test noise + angry | challenge |
| NA11 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C06 | Sai định dạng Model | "Tạo thẻ bảo hành. Tên: Linh, SĐT: 0912345678, Model: TIVI-SAMSUNG-TO" | Ngắn gọn | Báo sai định dạng, xin lại Model | Bắt lỗi định dạng | representative |
| NA12 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C06 | Sai định dạng Model | "Đăng ký bảo hành. Model 12345, ĐT 0900111222, Tên Nam." | Ngắn gọn | Báo Model 12345 không hợp lệ, xin lại | Bắt lỗi định dạng | representative |
| NA13 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C07 | Đủ 1 lần + Lan man kể lể | "Chào cháu, chú Tâm, SĐT 0901001001. Hôm bữa mua TV model KD-55X ở siêu thị, nhân viên bảo về tự đăng ký mạng mà chú bận quá nay mới rảnh. Cháu làm giúp nhé." | Lan man | Lọc nhiễu, trích xuất 3 info | Test lọc nhiễu | challenge |
| NA14 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C07 | Đủ 1 lần + Lan man kể lể | "Em ơi chị Thu, sđt 0933222111. TV nhà chị mã 50BU8000. Đứa con gái cứ bấm lung tung, chị sợ hỏng nên muốn đăng ký bảo hành cho chắc, thẻ giấy mèo cắn nát rồi." | Lan man | Lọc nhiễu, trích xuất 3 info | Test lọc nhiễu | challenge |
| NA15 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C08 | Nhầm Serial thành Model | "Bảo hành. Tên Cường, SĐT 0911222333. Mã TV là S/N: 8J9283746." | Ngắn gọn | Báo S/N không phải Model, xin lại | Ngăn hallucination | high-risk |
| NA16 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C08 | Nhầm Serial thành Model | "Tên: Lan, SĐT: 0988777666, Model: Serial 123ABC456." | Ngắn gọn | Báo Serial không hợp lệ, xin lại Model | Ngăn hallucination | high-risk |
| NA17 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C09 | Thiếu Tên + 2 SĐT + Bực | "TV mua 3 ngày đã hỏng, số tao là 0901234567, gọi không được thì gọi 0988999000, mã QA55. Mau xử lý đi!" | Bực bội | Xoa dịu, xin Tên và xác nhận 1 SĐT | Test multi-task | high-risk |
| NA18 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C09 | Thiếu Tên + 2 SĐT + Bực | "Làm cái thẻ bảo hành lẹ lên! Model 43UQ7550, sđt 0944555666 hoặc 0911222333. Bực mình ghê!" | Bực bội | Xoa dịu, xin Tên và xác nhận 1 SĐT | Test multi-task | high-risk |
| NA19 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C10 | Không nhớ Model + Bực | "Đang xem bóng đá thì đen thui, bực cả mình. Tôi là Đạt, SĐT 0999888777, model TV nằm tít sau tường tôi chịu không xem được, xử lý sao đây?" | Bực bội | Xoa dịu, HD tìm model trên điều khiển | Help behavior | high-risk |
| NA20 | NhatAnh | Warranty Onboarding | Trích xuất info tạo Thẻ BH không? | C10 | Không nhớ Model + Bực | "TV dởm, mua tốn bao tiền giờ bật không lên! Tôi là Hương 0933444555. Mất cả vỏ hộp rồi lấy đâu ra model mà đọc cho các người?" | Bực bội | Xoa dịu, HD tìm model bằng cách khác | Help behavior | high-risk |

## 6. Coverage note cá nhân
- **Dataset cá nhân đang cover tốt slice nào?** Cover rất tốt các tình huống khách hàng cung cấp thông tin lộn xộn (thiếu, dư thừa, sai định dạng) và trạng thái tâm lý tiêu cực (bực tức, kể lể) trong luồng đăng ký thẻ bảo hành (Onboarding).
- **Slice nào chưa cover?** Chưa cover trường hợp khách hàng muốn thay đổi thông tin sau khi đã chốt thẻ, hoặc trường hợp khách hàng tương tác bằng ngôn ngữ thứ hai (mixed language).
- **Có combination nào bạn cố tình chưa chọn? Vì sao?** Cố tình bỏ qua các combination kiểu "Đủ 1 lần + Rõ ràng + Vui vẻ", vì nó là happy path cơ bản, không tạo ra thay đổi lớn trong hành vi xử lý của agent (chỉ cần sinh thẻ).
- **Input nào là high-risk nhất?** Các input thuộc C08 (NA15, NA16) là high-risk nhất. Vì agent (LLM) rất dễ mắc lỗi Hallucination khi tự động lấy chuỗi Serial gán bừa vào trường Model để cho qua bước kiểm duyệt.
- **Input nào là boundary case khó nhất?** Các case như C09 (Thiếu Tên + Đưa 2 SĐT + Bực) và C05 (Sai chính tả + Bực) đòi hỏi bot phải làm nhiều task một lúc: vừa xoa dịu cảm xúc, vừa bắt lỗi dữ liệu, vừa hỏi thêm thông tin thiếu mà không làm khách cáu thêm.
