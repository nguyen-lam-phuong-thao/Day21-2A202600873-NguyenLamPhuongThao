# Day21 Group Report

## Overview

This Day21 submission was cleaned into the required structure with JSON as the source of truth. The package now contains standardized individual reports, standardized individual `combinations.json` and `scenario_dataset_v0.json` files, and a merged group `scenario_dataset_v1.json` for downstream evaluation work.

This package does **not** include any agent run, trace, evaluator score, pass/fail label, or synthesized execution result.

## Individual submissions summary

| Owner | Standardized report | Combinations | Scenario rows v0 | Checklist status |
|---|---|---:|---:|---|
| `huy` | `docs/day21/individual/huy_individual_report.md` | 10 | 20 | Complete |
| `nhatanh` | `docs/day21/individual/nhatanh_individual_report.md` | 10 | 20 | Complete |
| `thao` | `docs/day21/individual/thao_individual_report.md` | 12 | 24 | Complete |

## Standardized dimensions

The group dataset intentionally preserves owner-specific dimension systems because the three members focused on different slices of the Smart TV support problem.

| Owner | Dimension keys |
|---|---|
| `huy` | `user_intent`, `device_type`, `appointment_status`, `risk_level` |
| `nhatanh` | `context_completeness`, `information_ambiguity`, `user_style` |
| `thao` | `user_intent`, `context_completeness`, `evidence_state`, `risk_level` |

Normalization decisions:

- `owner` keys were standardized to lowercase machine-readable IDs: `huy`, `nhatanh`, `thao`.
- All individual scenario datasets now use the required row schema only.
- All individual combination datasets now use the required row schema only.
- Legacy wrapper metadata and duplicate CSV review copies were removed from the canonical Day21 package.

## Merge and dedup decisions

The group v1 dataset keeps **one canonical row per combination slice** and collapses the paired paraphrase from the same member as a near-duplicate. This keeps breadth high while avoiding repeated test rows with the same expected behavior.

Summary:

- Selected for v1: 32 rows
- Collapsed as near-duplicate paraphrases: 32 rows
- Source-owner contribution to v1: `huy=10`, `nhatanh=10`, `thao=12`

Detailed file-level and row-level decisions are recorded in:

- [data/day21/group/merge_decisions.json](../../data/day21/group/merge_decisions.json)

## Coverage matrix

The merged v1 set is balanced across representative, challenge, and high-risk scenarios:

| Set type | Rows |
|---|---:|
| `representative` | 12 |
| `challenge` | 10 |
| `high-risk` | 10 |

The formal machine-readable summary is stored in:

- [data/day21/group/coverage_matrix.json](../../data/day21/group/coverage_matrix.json)

## Scenario Dataset v1 summary

- Final row count: **32**
- Canonical file: [data/day21/group/scenario_dataset_v1.json](../../data/day21/group/scenario_dataset_v1.json)
- Merge strategy: one kept row per combination slice, with the sibling paraphrase collapsed as a near-duplicate
- Main slices included:
  - Home repair scheduling, appointment conflicts, and unsafe self-repair guardrails
  - Warranty onboarding, field extraction, ambiguity resolution, and serial-vs-model confusion
  - Warranty/refund/handoff action boundaries, evidence conflict handling, and repair-vs-exchange ambiguity

## Known gaps

- No multilingual or code-switching inputs in the canonical v1 set.
- No image-grounded or OCR-grounded evidence rows in canonical v1.
- No payment, billing, or order-tracking coverage yet.
- No real tool-calling or backend integration scenarios yet.
- `TODO(group): add those slices only if the instructor expects broader Day21 coverage than the current Smart TV support scope.`

## Priority rows for first agent run

The highest-priority rows for the first future agent run are:

- `G05`, `G06` for unsafe self-repair and overpromised after-hours service
- `G12`, `G15`, `G18` for angry onboarding, misspelled identity fields, and serial-vs-model confusion
- `G24`, `G26`, `G29`, `G31` for unauthorized refund risk, serial-invoice conflict, angry conflict escalation, and unsafe/policy-bypass requests

## Handoff note

Use the group v1 dataset as the only grading and handoff dataset for later agent evaluation work. If future steps add traces or evaluator judgments, keep them in a new artifact set rather than writing them back into these source datasets.

## File index

- README: [README_DAY21.md](../../README_DAY21.md)
- Group report: [docs/day21/REPORT_DAY21_GROUP.md](REPORT_DAY21_GROUP.md)
- Individual reports:
  - [docs/day21/individual/huy_individual_report.md](individual/huy_individual_report.md)
  - [docs/day21/individual/nhatanh_individual_report.md](individual/nhatanh_individual_report.md)
  - [docs/day21/individual/thao_individual_report.md](individual/thao_individual_report.md)
- Individual datasets:
  - [data/day21/individual/huy_combinations.json](../../data/day21/individual/huy_combinations.json)
  - [data/day21/individual/huy_scenario_dataset_v0.json](../../data/day21/individual/huy_scenario_dataset_v0.json)
  - [data/day21/individual/nhatanh_combinations.json](../../data/day21/individual/nhatanh_combinations.json)
  - [data/day21/individual/nhatanh_scenario_dataset_v0.json](../../data/day21/individual/nhatanh_scenario_dataset_v0.json)
  - [data/day21/individual/thao_combinations.json](../../data/day21/individual/thao_combinations.json)
  - [data/day21/individual/thao_scenario_dataset_v0.json](../../data/day21/individual/thao_scenario_dataset_v0.json)
- Group datasets:
  - [data/day21/group/scenario_dataset_v1.json](../../data/day21/group/scenario_dataset_v1.json)
  - [data/day21/group/coverage_matrix.json](../../data/day21/group/coverage_matrix.json)
  - [data/day21/group/merge_decisions.json](../../data/day21/group/merge_decisions.json)
- Individual prompts:
  - [prompts/day21/individual/huy_generate_inputs_prompt.txt](../../prompts/day21/individual/huy_generate_inputs_prompt.txt)
  - [prompts/day21/individual/nhatanh_generate_inputs_prompt.txt](../../prompts/day21/individual/nhatanh_generate_inputs_prompt.txt)
  - [prompts/day21/individual/thao_generate_inputs_prompt.txt](../../prompts/day21/individual/thao_generate_inputs_prompt.txt)
