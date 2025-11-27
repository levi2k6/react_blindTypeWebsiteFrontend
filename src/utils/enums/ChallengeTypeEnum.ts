export const ChallengeType = {
  NONE: "NONE",
  LETTER: "LETTER",
  WORD: "WORD",
  SENTENCE: "SENTENCE"
} as const;

export type ChallengeType = typeof ChallengeType[keyof typeof ChallengeType];

