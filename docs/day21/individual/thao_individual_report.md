# Thao Individual Report

## Owner

- Full name: Nguyễn Lâm Phương Thảo
- Owner key: `thao`
- Source use case: warranty, refund, repair, and handoff decisions in the Day20 Smart TV support prototype

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

- Use case: An AI customer support agent handles Smart TV issue reporting, warranty questions, refund requests, repair-versus-exchange ambiguity, and requests for human handoff.
- Unit of AI Work: One customer message enters the chat flow, and the agent must classify intent and risk, decide whether to ask for more information, provide a bounded policy answer, refuse an unsafe or policy-bypass request, or escalate to a human.

## Quality question

Can the agent understand intent and context in warranty, refund, repair, and handoff conversations; choose the correct action boundary; and avoid promising actions outside its authority when evidence is missing, conflicting, or high-risk?

## Dimensions

- `user_intent`: `report_device_issue`, `check_warranty_policy`, `continue_warranty_procedure`, `refund_request`, `provide_serial_for_warranty_lookup`, `damaged_item_or_delivery_issue`, `repeat_repair_issue`, `refund_or_handoff_under_conflict`, `request_human_handoff`, `unsafe_or_policy_bypass_request`, `mixed_repair_exchange_question`
- `context_completeness`: `missing_serial`, `sufficient_for_policy_question`, `ambiguous_phrase_thu_tuc`, `missing_order_or_serial`, `serial_provided_but_no_invoice`, `conflicting_info`, `complete`, `serial_plus_history_mentioned`, `conflicting_info_plus_angry`, `sufficient_summary`, `missing_or_malicious`, `ambiguous_but_benign`
- `evidence_state`: `no_evidence`, `serial_only`, `serial_and_invoice_conflict`, `photo_damage_attached`, `serial_only_or_service_history`, `serial_or_issue_details_provided`
- `risk_level`: `low`, `medium`, `high`

## Combinations and datasets

- Standardized combinations JSON: [data/day21/individual/thao_combinations.json](../../../data/day21/individual/thao_combinations.json)
- Standardized scenario dataset v0: [data/day21/individual/thao_scenario_dataset_v0.json](../../../data/day21/individual/thao_scenario_dataset_v0.json)
- Prompt used: [prompts/day21/individual/thao_generate_inputs_prompt.txt](../../../prompts/day21/individual/thao_generate_inputs_prompt.txt)

## Filtered input summary

- Final filtered row count: 24
- Coverage emphasis: missing context, serial-invoice conflict, explicit handoff, refund risk, unsafe requests, and repair-versus-exchange ambiguity
- Highest-risk slice: angry conflict cases that combine refund pressure, conflicting evidence, and human-handoff escalation

## Coverage gaps

- Order tracking and payment flows are not covered.
- Multi-product bundles and OCR-based invoice extraction are not covered.
- No live backend lookup or tool invocation is included in the dataset.

## Notes

- JSON is the canonical dataset for this submission.
- This package intentionally stops before any agent run, trace review, or evaluator scoring.
