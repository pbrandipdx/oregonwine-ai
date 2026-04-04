/** Labels shown on quick-reply chips (must match `QUICK_REPLY_ICONS` keys in ChatWidget). */
export const QUICK_REPLY_LABELS = [
  "Blind Tasting",
  "Match Me",
  "Tasting options",
  "Hours & directions",
  "Wine club info",
  "Food pairings",
  "Recipes",
] as const;

export type QuickReplyLabel = (typeof QUICK_REPLY_LABELS)[number];

/**
 * Chip label in the UI; expanded text for /chat so hybrid search hits seeded chunks.
 * Very short phrases often miss FTS (e.g. "Food pairings" alone).
 * All prompts are winery-agnostic — no hardcoded URLs or content.
 */
export function messageForChatApi(shortLabel: string, wineryLabel: string): string {
  switch (shortLabel) {
    case "Blind Tasting":
      return `Play the Rex Hill blind tasting game`;
    case "Match Me":
      return `Find your perfect ${wineryLabel} tasting experience`;
    case "Tasting options":
      return `What tasting flights, fees, and reservation options does ${wineryLabel} offer?`;
    case "Hours & directions":
      return `What are ${wineryLabel}'s tasting room hours, address, and directions?`;
    case "Food pairings":
      return `What foods pair well with ${wineryLabel}'s wines? Are any food pairings or small bites served during wine tastings?`;
    case "Recipes":
      return `Does ${wineryLabel} have any recipes or food pairing suggestions? If so, share them with links to the original pages on their website.`;
    case "Wine club info":
      return `Tell me about ${wineryLabel} wine club, membership, shipments, and benefits.`;
    default:
      return shortLabel;
  }
}
