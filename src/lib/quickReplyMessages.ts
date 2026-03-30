/** Labels shown on quick-reply chips (must match `QUICK_REPLY_ICONS` keys in ChatWidget). */
export const QUICK_REPLY_LABELS = [
  "Tasting options",
  "Hours & directions",
  "Wine club info",
  "Food pairings",
] as const;

export type QuickReplyLabel = (typeof QUICK_REPLY_LABELS)[number];

/**
 * Chip label in the UI; expanded text for /chat so hybrid search hits seeded chunks.
 * Very short phrases often miss FTS (e.g. "Food pairings" alone).
 */
export function messageForChatApi(shortLabel: string, wineryLabel: string): string {
  switch (shortLabel) {
    case "Tasting options":
      return `What tasting flights, fees, and reservation options does ${wineryLabel} offer?`;
    case "Hours & directions":
      return `What are ${wineryLabel}'s tasting room hours, address, and directions?`;
    case "Food pairings":
      return `What foods pair well with ${wineryLabel} Pinot Noir, Chardonnay, and sparkling wines? Is any food served during wine tastings?`;
    case "Wine club info":
      return `Tell me about ${wineryLabel} wine club, membership, shipments, and benefits.`;
    default:
      return shortLabel;
  }
}
