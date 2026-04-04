/**
 * Engagement bubbles for the generic Crushpad.ai chatbot demo.
 * Each bubble triggers a distinct conversational experience via a mode-specific
 * system prompt on the chat edge function.
 *
 * Winery-specific pages continue using quickReplyMessages.ts.
 */

export const ENGAGEMENT_LABELS = [
  "Blind Tasting",
  "Featured Winery",
  "Match Me",
  "Plan My Visit",
  "Compare",
] as const;

export type EngagementLabel = (typeof ENGAGEMENT_LABELS)[number];

/** Mode strings sent to the chat API to trigger mode-specific system prompts. */
export const ENGAGEMENT_MODES: Record<EngagementLabel, string> = {
  "Blind Tasting": "blind_tasting",
  "Featured Winery": "featured_winery",
  "Match Me": "match_me",
  "Plan My Visit": "plan_my_visit",
  Compare: "compare",
};

/**
 * The initial message sent to the chat API when an engagement bubble is tapped.
 * These are crafted to kick off each mode's conversational flow.
 */
export function engagementMessage(label: EngagementLabel): string {
  switch (label) {
    case "Blind Tasting":
      return "Start a blind tasting game. Describe a real Willamette Valley wine with tasting notes, terroir hints, and winemaker clues — and I'll try to guess the winery. 3 rounds, multiple choice.";
    case "Featured Winery":
      return "Tell me about a featured Willamette Valley winery. Share their story, what makes them distinctive, their signature wines, and why I should visit.";
    case "Match Me":
      return "Help me find my perfect Willamette Valley winery match. Ask me a few quick questions about my preferences and personality, then recommend wineries that fit.";
    case "Plan My Visit":
      return "Help me plan a wine day in the Willamette Valley. Ask me about when I'm visiting, group size, experience level, and what I enjoy — then build me a custom itinerary.";
    case "Compare":
      return "I want to compare Willamette Valley wineries, wines, or AVAs side by side. Ask me what I'd like to compare, or suggest an interesting matchup.";
    default:
      return label;
  }
}
