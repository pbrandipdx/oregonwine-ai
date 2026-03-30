/** Official Rex Hill recipe pages (from https://rexhill.com/recipes/). */
const REX_HILL_RECIPE_LINKS_MD = [
  "- [BLT Summer Salad](https://rexhill.com/recipes/blt-salad/)",
  "- [Gambieri con Polenta](https://rexhill.com/recipes/gambieri-con-polenta/)",
  "- [Beef and Barley Stew with Mushrooms and Gochugaru](https://rexhill.com/recipes/beef-barley-stew-with-mushrooms/)",
  "- [Axe Handle Ribeye with Smoked Fried Potatoes and Chimichurri](https://rexhill.com/recipes/axe-handle-ribeye/)",
  "- [Kale & Taleggio Risotto](https://rexhill.com/recipes/kale_risotto/)",
  "- [Turkey Burger with Pickled Red Onions and Feta](https://rexhill.com/recipes/turkey-burger-with-pickled-red-onions-and-feta/)",
  "- [Grilled Chicken with Dijon-Cranberry Glaze](https://rexhill.com/recipes/grilled-chicken-with-cranberry/)",
  "- [Seared Rack of Lamb with Summer Vegetable Tian and Olive Relish](https://rexhill.com/recipes/seared-rack-of-lamb/)",
  "- [Peppered Beef Tenderloin with Slow Roasted Cauliflower and Mushroom Sauce](https://rexhill.com/recipes/peppered-beef-tenderloin/)",
  "- [Cedar Plank Salmon](https://rexhill.com/recipes/cedar-plank-salmon/)",
].join("\n");

/** Labels shown on quick-reply chips (must match `QUICK_REPLY_ICONS` keys in ChatWidget). */
export const QUICK_REPLY_LABELS = [
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
 */
export function messageForChatApi(shortLabel: string, wineryLabel: string): string {
  switch (shortLabel) {
    case "Tasting options":
      return `What tasting flights, fees, and reservation options does ${wineryLabel} offer?`;
    case "Hours & directions":
      return `What are ${wineryLabel}'s tasting room hours, address, and directions?`;
    case "Food pairings":
      return `What foods pair well with ${wineryLabel} Pinot Noir, Chardonnay, and sparkling wines? Is any food served during wine tastings?`;
    case "Recipes":
      return [
        `Show a visitor every recipe in ${wineryLabel}'s official recipe collection.`,
        `Use a short friendly intro, then this exact markdown bullet list (keep every link as written). You may add one clause per recipe about which ${wineryLabel} wine style fits, if grounded in typical pairings:`,
        "",
        REX_HILL_RECIPE_LINKS_MD,
        "",
        `End with a line inviting them to browse the full index: [Browse all recipes on rexhill.com](https://rexhill.com/recipes/).`,
      ].join("\n");
    case "Wine club info":
      return `Tell me about ${wineryLabel} wine club, membership, shipments, and benefits.`;
    default:
      return shortLabel;
  }
}
