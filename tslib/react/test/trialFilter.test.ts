import * as Optuna from "@optuna/types"
import { describe, expect, test } from "vitest"
import { Target } from "../src/utils/trialFilter"

const makeTrial = (value: number | string): Optuna.Trial =>
  ({
    trial_id: 0,
    study_id: 0,
    number: 0,
    state: "Complete",
    values: [value],
    params: [],
    intermediate_values: [],
    user_attrs: [],
    constraints: [],
  }) as unknown as Optuna.Trial

describe("Target.getTargetValue", () => {
  const target = new Target("objective", 0)

  test("rejects serialized positive infinity", () => {
    expect(target.getTargetValue(makeTrial("inf"))).toBeNull()
  })

  test("rejects serialized negative infinity", () => {
    expect(target.getTargetValue(makeTrial("-inf"))).toBeNull()
  })

  test("preserves finite objective values", () => {
    expect(target.getTargetValue(makeTrial(0.625))).toBe(0.625)
  })
})
