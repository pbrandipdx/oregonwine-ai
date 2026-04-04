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
  //    Skip URLs already inside markdown link syntax: [text](url) or [url](url)
  md = md.replace(
    /(\[[^\]]*\]\([^)]*\))|(https?:\/\/[^\s)\]>,]+)/g,
    (_match, mdLink, bareUrl) => {
      if (mdLink) return mdLink; // Already a markdown link, leave it alone
      return `[${bareUrl}](${bareUrl})`;
    }
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
        .ow-md-root {
          font-size: 14px;
          line-height: 1.65;
          color: ${textColor};
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 15px;
        }
        .ow-md-root h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 18px;
          font-weight: 600;
          color: ${headingColor};
          margin: 20px 0 10px;
          line-height: 1.25;
          letter-spacing: 0.01em;
        }
        .ow-md-root h2:first-child { margin-top: 0; }
        .ow-md-root h3 {
          font-family: 'Space Mono', ui-monospace, monospace;
          font-size: 10px;
          font-weight: 600;
          color: ${accentColor};
          margin: 18px 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ow-md-root p { margin: 0 0 12px; }
        .ow-md-root p:last-child { margin-bottom: 0; }
        .ow-md-root ul, .ow-md-root ol {
          margin: 10px 0;
          padding-left: 0;
          list-style: none;
        }
        .ow-md-root li {
          margin: 8px 0;
          padding: 8px 12px;
          background: rgba(255,255,255,0.03);
          border-left: 2px solid ${accentColor};
          border-radius: 0 6px 6px 0;
          font-size: 14px;
          line-height: 1.5;
        }
        .ow-md-root strong {
          color: ${headingColor};
          font-weight: 700;
        }
        .ow-md-root em {
          color: #a8a39e;
          font-style: italic;
        }
        .ow-md-root a {
          color: ${accentColor};
          text-decoration: none;
          border-bottom: 1px solid rgba(196,122,132,0.3);
          transition: border-color 0.15s;
        }
        .ow-md-root a:hover {
          border-bottom-color: ${accentColor};
        }
        .ow-md-root hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 16px 0;
        }
        .ow-md-root blockquote {
          margin: 12px 0;
          padding: 10px 16px;
          border-left: 3px solid ${accentColor};
          background: rgba(196,122,132,0.06);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #b8b3ae;
        }
      `}</style>
      <ReactMarkdown
        components={{
          a: ({ href, children }: { href?: string; children?: ReactNode }) => {
            const isTel = href?.startsWith("tel:");
            return isTel ? (
              <a href={href}>{children}</a>
            ) : (
              <a href={href} target="_blank" rel="noreferrer">{children}</a>
            );
          },
        }}
      >
        {linked}
      </ReactMarkdown>
    </div>
  );
}
