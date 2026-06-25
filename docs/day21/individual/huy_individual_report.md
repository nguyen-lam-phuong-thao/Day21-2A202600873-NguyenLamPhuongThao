# Huy Individual Report

## Owner

- Full name: Nguyễn Bình Huy
- Owner key: `huy`
- Source use case: Smart TV home repair scheduling and OLED maintenance guidance

## Day21 checklist

- Use case: Present
- Unit of AI Work: Present
- Quality question: Present
- At least 3 dimensions: Present
- At least 10 combinations: Present
- Prompt used to generate inputs: Present
- At least 20 filtered natural-language user inputs: Present
- Scenario Dataset v0: Present
- Coverage gaps: Present

## Use case and Unit of AI Work

- Use case: An AI customer support agent helps customers request home TV repair, ask OLED maintenance questions, reschedule or cancel appointments, and safely refuse self-repair requests.
- Unit of AI Work: One customer message enters the chat flow, and the agent must choose the correct action boundary: schedule, explain maintenance, request identity details for appointment changes, refuse unsafe repair guidance, or escalate when appointment conflicts are high-risk.

## Quality question

Can the agent correctly distinguish home repair scheduling, OLED maintenance, appointment-change requests, and unsafe self-repair requests; respond within product and safety boundaries; and avoid overpromising when technician availability is uncertain?

## Dimensions

- `user_intent`: `request_home_repair`, `ask_maintenance_info`, `reschedule_or_cancel`, `self_repair_inquiry`
- `device_type`: `OLED_TV`, `QLED_LED_TV`, `unsupported_appliances`
- `appointment_status`: `no_previous_appointment`, `valid_requested_slot`, `conflicting_requested_slot`
- `risk_level`: `low`, `medium`, `high`

## Combinations and datasets

- Standardized combinations JSON: [data/day21/individual/huy_combinations.json](../../../data/day21/individual/huy_combinations.json)
- Standardized scenario dataset v0: [data/day21/individual/huy_scenario_dataset_v0.json](../../../data/day21/individual/huy_scenario_dataset_v0.json)
- Prompt used: [prompts/day21/individual/huy_generate_inputs_prompt.txt](../../../prompts/day21/individual/huy_generate_inputs_prompt.txt)

## Filtered input summary

- Final filtered row count: 20
- Coverage emphasis: home repair scheduling, OLED maintenance, appointment conflicts, unsupported products, and unsafe self-repair guardrails
- Highest-risk slice: self-repair requests for OLED TVs or unsupported appliances, plus urgent out-of-hours appointment requests

## Coverage gaps

- Payment and real repair-fee handling are not covered.
- Real technician availability from ERP or CRM systems is not covered.
- Image or video-based hardware verification is not covered.

## Notes

- JSON is the canonical dataset for this submission.
- The retained rows are filtered natural-language user inputs only. No agent run result, trace, or evaluator output is included.
