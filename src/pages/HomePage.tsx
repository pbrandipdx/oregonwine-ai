import { Link } from "react-router-dom";
import { SEOHead, PAGE_SEO } from "../lib/seo";
import "./HowItWorksPage.css";

/** Legacy /home route — redirects users to the main chat or provides a simple info page. */
export function HomePage() {
  return (
    <div className="hiw">
      <SEOHead {...PAGE_SEO.home} />
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-badge">Built for wineries &amp; tasting rooms</p>
          <h1>Your 24/7 wine concierge that drives visits &amp; revenue</h1>
          <p>
            Crushpad.ai gives every winery an AI-powered chatbot trained on <em>your</em> wines, hours, and
            experiences — so visitors get instant answers and you get more bookings.
          </p>
        </div>
      </section>

      <footer className="page-footer">
        © 2026 <a href="https://crushpad.ai">Crushpad.ai</a> — AI-powered wine concierge for
        wineries
      </footer>
    </div>
  );
}
