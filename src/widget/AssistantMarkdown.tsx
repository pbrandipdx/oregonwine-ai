import ReactMarkdown from "react-markdown";
import type { ReactNode } from "react";

type Props = {
  text: string;
  accentColor: string;
  textColor: string;
  headingColor: string;
};

/**
 * Auto-link raw URLs and phone numbers that aren't already inside markdown links.
 * Runs BEFORE ReactMarkdown so the renderer sees proper [text](href) syntax.
 */
function autoLinkText(md: string): string {
  // Skip content already inside markdown links [...](...) or <a> tags
  // 1. Auto-link bare URLs (https://... or http://...)
  md = md.replace(
    /(?<!\]\()(?<!\()(https?:\/\/[^\s)\]>,]+)/g,
    (url) => `[${url}](${url})`
  );
  // 2. Auto-link phone numbers: (503) 538-0666, 503-538-0666, +1-503-538-0666, etc.
  md = md.replace(
    /(?<!\[)(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})(?!\])/g,
    (phone) => {
      const digits = phone.replace(/[^\d+]/g, "");
      return `[${phone}](tel:${digits})`;
    }
  );
  return md;
}

/** Renders assistant replies as Markdown with auto-linked URLs and phone numbers. */
export function AssistantMarkdown({ text, accentColor, headingColor, textColor }: Props) {
  const linked = autoLinkText(text);
  return (
    <div className="ow-md-root">
      <style>{`
        .ow-md-root { font-size: 14px; line-height: 1.55; color: ${textColor}; }
        .ow-md-root h2 { font-size: 15px; font-weight: 600; color: ${headingColor}; margin: 14px 0 8px; line-height: 1.3; }
        .ow-md-root h2:first-child { margin-top: 0; }
        .ow-md-root h3 { font-size: 14px; font-weight: 600; color: ${headingColor}; margin: 12px 0 6px; }
        .ow-md-root p { margin: 0 0 10px; }
        .ow-md-root p:last-child { margin-bottom: 0; }
        .ow-md-root ul, .ow-md-root ol { margin: 8px 0; padding-left: 1.35em; }
        .ow-md-root li { margin: 4px 0; }
        .ow-md-root strong { color: ${headingColor}; font-weight: 600; }
        .ow-md-root em { color: #9a9a9a; font-size: 13px; }
        .ow-md-root a { color: ${accentColor}; text-decoration: underline; text-underline-offset: 2px; }
        .ow-md-root a:hover { opacity: 0.9; }
      `}</style>
      <ReactMarkdown
        components={{
          a: ({ href, children }: { href?: string; children?: ReactNode }) => {
            const isTel = href?.startsWith("tel:");
            return (
              <a
                href={href}
                target={isTel ? "_self" : "_blank"}
                rel={isTel ? undefined : "noreferrer"}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {linked}
      </ReactMarkdown>
    </div>
  );
}
