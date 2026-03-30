import ReactMarkdown from "react-markdown";

type Props = {
  text: string;
  accentColor: string;
  textColor: string;
  headingColor: string;
};

/** Renders assistant replies as Markdown (headings, lists, bold). */
export function AssistantMarkdown({ text, accentColor, headingColor, textColor }: Props) {
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
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
