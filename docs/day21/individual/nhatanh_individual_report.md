# NhatAnh Individual Report

## Owner

- Full name: Nhật Anh
- Owner key: `nhatanh`
- Source use case: warranty onboarding and digital warranty card creation

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

- Use case: An AI assistant collects customer information to create a digital warranty card for a Smart TV.
- Unit of AI Work: One customer message may contain a name, phone number, and model identifier in incomplete, ambiguous, or noisy form. The agent must extract or confirm the fields needed for the card without hallucinating missing values.

## Quality question

Can the agent gather the required fields for warranty-card creation, distinguish clear versus ambiguous information, ask for missing details at the right time, and avoid inventing phone numbers or model identifiers?

## Dimensions

- `context_completeness`: `missing_phone_number`, `complete_in_one_turn`, `missing_model`, `invalid_model_format`, `missing_name`
- `information_ambiguity`: `clear`, `two_phone_numbers`, `name_typo`, `serial_confused_as_model`
- `user_style`: `brief`, `rambling`, `angry`

## Combinations and datasets

- Standardized combinations JSON: [data/day21/individual/nhatanh_combinations.json](../../../data/day21/individual/nhatanh_combinations.json)
- Standardized scenario dataset v0: [data/day21/individual/nhatanh_scenario_dataset_v0.json](../../../data/day21/individual/nhatanh_scenario_dataset_v0.json)
- Prompt used: [prompts/day21/individual/nhatanh_generate_inputs_prompt.txt](../../../prompts/day21/individual/nhatanh_generate_inputs_prompt.txt)

## Filtered input summary

- Final filtered row count: 20
- Coverage emphasis: missing required fields, multiple phone numbers, misspelled names, serial-versus-model confusion, invalid model format, and angry users
- Highest-risk slice: model/serial confusion and multi-task recovery under angry or ambiguous inputs

## Coverage gaps

- Post-card edits after the warranty card is created are not covered.
- Mixed-language or bilingual inputs are not covered.
- No backend verification tool or real model validation service is included.

## Notes

- The source package already contained the final filtered dataset rows; those rows were standardized into the required JSON schema here.
- JSON is the canonical dataset for this submission.
