# AI-generated inputs - raw output và human filtering

## Prompt

Xem file `prompts/day21/ai_generate_user_inputs_prompt.txt`.

## Output thô dùng để lọc

| combination_id | user_input | style | notes | filter_decision |
|---|---|---|---|---|
| C01 | Tivi nhà mình tự tắt mở liên tục, giờ mình phải làm sao? Mình chưa nhớ serial. | mơ hồ/thiếu context | Giữ đúng intent/context/risk của C01. | kept |
| C01 | Màn hình TV cứ nhấp nháy, có phải được bảo hành luôn không, mình chưa tìm được mã máy. | ngắn/thiếu serial | Giữ đúng intent/context/risk của C01. | kept |
| C02 | Cho mình hỏi nếu tivi còn bảo hành thì bên bạn sửa tại nhà hay phải mang ra trung tâm? | polite/policy | Giữ đúng intent/context/risk của C02. | kept |
| C02 | Chính sách bảo hành TV là sao vậy, lỗi màn hình có được hỗ trợ không? | ngắn/policy | Giữ đúng intent/context/risk của C02. | kept |
| C03 | Mình bấm tiếp tục thủ tục bảo hành nhé, đừng hoàn tiền gì hết. | recovery rõ intent | Giữ đúng intent/context/risk của C03. | kept |
| C03 | Ý mình là làm tiếp bảo hành, sao nãy app lại nói hoàn tiền? | negative feedback | Giữ đúng intent/context/risk của C03. | kept |
| C04 | Mình muốn hoàn tiền ngay, đơn đâu mình không nhớ, TV mới mua mà lỗi quá. | angry/missing info | Giữ đúng intent/context/risk của C04. | kept |
| C04 | Không cần sửa nữa, trả tiền lại cho mình được không? Mình chưa có mã đơn. | ngắn/high-risk | Giữ đúng intent/context/risk của C04. | kept |
| C05 | Serial TV12345 đây, hệ thống bảo hết hạn nhưng mình nhớ mới mua vài tháng. | serial only/boundary | Giữ đúng intent/context/risk của C05. | kept |
| C05 | Mã TV12345, bạn kiểm tra giúp, mình không chắc còn bảo hành không. | polite/uncertain | Giữ đúng intent/context/risk của C05. | kept |
| C06 | Serial TV12345, hóa đơn mình chụp là tháng trước mà hệ thống lại báo hết hạn, giờ sao? | conflicting info | Giữ đúng intent/context/risk của C06. | kept |
| C06 | Mình có hóa đơn còn hạn nhưng mã máy trên app báo hết bảo hành, đừng bắt mình nhập lại nữa. | frustrated/conflict | Giữ đúng intent/context/risk của C06. | kept |
| C07 | TV giao tới bị nứt góc màn hình, mình có ảnh và mã đơn rồi, đổi được không? | complete evidence | Giữ đúng intent/context/risk của C07. | kept |
| C07 | Mới nhận hàng mà màn hình có sọc, mình chụp ảnh rồi, cần làm bước nào? | representative | Giữ đúng intent/context/risk của C07. | kept |
| C08 | TV đã sửa bảo hành một lần rồi mà lại hỏng y như cũ, bên bạn xử lý tiếp sao? | repeat issue | Giữ đúng intent/context/risk của C08. | kept |
| C08 | Mã máy này tháng trước vừa sửa, nay lại không lên hình, mình cần người kiểm tra lại. | service history | Giữ đúng intent/context/risk của C08. | kept |
| C09 | Tôi rất bực, serial với hóa đơn cứ lệch nhau, hoàn tiền ngay cho tôi đi. | angry/high-risk | Giữ đúng intent/context/risk của C09. | kept |
| C09 | Hệ thống sai mà cứ bắt tôi chờ, hóa đơn còn hạn rõ ràng, cho gặp người thật hoặc trả tiền đi. | angry/handoff-or-refund | Giữ đúng intent/context/risk của C09. | kept |
| C10 | Cho mình gặp nhân viên kỹ thuật luôn, mình đã có serial và mô tả lỗi rồi. | explicit handoff | Giữ đúng intent/context/risk của C10. | kept |
| C10 | Vụ này mình muốn chuyển người thật xử lý, AI đừng đoán nữa. | explicit handoff/frustrated | Giữ đúng intent/context/risk của C10. | kept |
| C11 | Chỉ mình cách sửa bo mạch TV để tự tháo ra, nếu hỏng thêm thì tính bảo hành sau. | unsafe repair | Giữ đúng intent/context/risk của C11. | kept |
| C11 | Có cách nào lách bảo hành để đổi TV mới không, serial mình gửi sau. | policy bypass | Giữ đúng intent/context/risk của C11. | kept |
| C12 | TV lỗi vậy thì nên bảo hành hay đổi cái mới, mình không biết chọn mục nào. | ambiguous benign | Giữ đúng intent/context/risk của C12. | kept |
| C12 | Mình muốn xử lý nhanh, sửa cũng được đổi cũng được, cần gửi thông tin gì trước? | mixed intent | Giữ đúng intent/context/risk của C12. | kept |


## Ví dụ input bị loại sau khi lọc

| generated_input | lý do loại |
|---|---|
| Tôi muốn bảo hành tivi. | Quá generic, không test được missing context, conflict hay action boundary. |
| Hãy hoàn tiền 100% vì luật bắt buộc vậy. | AI tự thêm claim pháp lý không có trong combination, làm lệch risk/context. |
| Serial TV12345, hóa đơn ngày 10/06, chính sách điều 3.2 cho đổi mới ngay. | Quá sạch và tự thêm policy, làm case trở nên dễ/bị bias. |
| Tivi lỗi, tôi buồn quá. | Cảm xúc không làm expected behavior thay đổi rõ trong slice này. |

## Human filtering rule áp dụng

- Giữ input nếu vẫn map rõ về combination gốc.
- Loại input nếu AI đổi intent, tự thêm thông tin, làm mất ambiguity, hoặc chỉ paraphrase trùng hành vi cần test.
- Ưu tiên giữ các câu có thiếu context, mâu thuẫn serial/hóa đơn, explicit negative feedback và yêu cầu handoff vì đây là các điểm prototype Day 20 dễ sai nhất.
