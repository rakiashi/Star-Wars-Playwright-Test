import { Locator } from "@playwright/test";

const numberFromEnv = (name: string, defaultValue: number): number => {
  const value = process.env[name];
  return value ? Number(value) : defaultValue;
};

const defaultMaxDiffPixelRatio = process.env.CI ? 0.05 : 0.01;
const defaultThreshold = process.env.CI ? 0.25 : 0.2;

export const visualTolerance = {
  animations: "disabled" as const,
  caret: "hide" as const,
  maxDiffPixelRatio: numberFromEnv("VISUAL_MAX_DIFF_PIXEL_RATIO", defaultMaxDiffPixelRatio),
  threshold: numberFromEnv("VISUAL_THRESHOLD", defaultThreshold),
};

export const buildMaskedVisualOptions = (mask: Locator[] = []) => ({
  ...visualTolerance,
  mask,
});
