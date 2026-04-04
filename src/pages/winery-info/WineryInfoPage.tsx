import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { REX_HILL_CONTENT } from "../../data/rex-hill-content";
import type {
  TastingOption,
  HoursDirections,
  ClubInfo,
  PairingInfo,
  Recipe,
} from "../../data/rex-hill-content";
import "./WineryInfoPage.css";

type Topic = "tastings" | "hours" | "club" | "pairings" | "recipes";

const TOPIC_TITLES: Record<Topic, string> = {
  tastings: "Tasting Experiences",
  hours: "Hours & Directions",
  club: "Wine Club",
  pairings: "Food Pairings",
  recipes: "Recipes",
};

/* ── Topic sections ────────────────────────────────────── */

function TastingsSection({ data }: { data: TastingOption[] }) {
  return (
    <div className="wi-section" key="tastings">
      <div className="wi-cards-grid">
        {data.map((t) => (
          <div
            key={t.name}
            className={`wi-card ${t.highlight ? "wi-card--highlight" : ""}`}
          >
            <div className="wi-card-header">
              <h3 className="wi-card-name">{t.name}</h3>
              <span className="wi-card-price">{t.price}</span>
            </div>
            <p className="wi-card-desc">{t.description}</p>
            <ul className="wi-card-details">
              {t.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="wi-note-box">
        <p className="wi-note-label">Reservations</p>
        <p className="wi-note-text">
          All tastings are seated with indoor and outdoor options. Advance
          reservations are required.
        </p>
      </div>
    </div>
  );
}

function HoursSection({ data }: { data: HoursDirections }) {
  return (
    <div className="wi-section" key="hours">
      <div className="wi-visit-card">
        <div className="wi-visit-grid">
          <div className="wi-visit-item">
            <span className="wi-visit-item-label">Address</span>
            <span className="wi-visit-item-value">{data.address}</span>
          </div>
          <div className="wi-visit-item">
            <span className="wi-visit-item-label">AVA</span>
            <span className="wi-visit-item-value">{data.ava}</span>
          </div>
          <div className="wi-visit-item">
            <span className="wi-visit-item-label">Hours</span>
            <span className="wi-visit-item-value">{data.hours}</span>
          </div>
          <div className="wi-visit-item">
            <span className="wi-visit-item-label">Phone</span>
            <span className="wi-visit-item-value">
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            </span>
          </div>
          <div className="wi-visit-item wi-visit-item--full">
            <span className="wi-visit-item-label">Website</span>
            <span className="wi-visit-item-value">
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.website.replace(/^https?:\/\//, "")}
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="wi-directions">
        <p className="wi-section-label">Directions from Portland</p>
        {data.directionsFromPortland.map((d, i) => (
          <div key={i} className="wi-direction-card">
            <p className="wi-direction-text">{d}</p>
          </div>
        ))}
      </div>

      <div className="wi-note-box">
        <p className="wi-note-label">Good to Know</p>
        <p className="wi-note-text">{data.note}</p>
      </div>
    </div>
  );
}

function ClubSection({ data }: { data: ClubInfo }) {
  return (
    <div className="wi-section" key="club">
      <div className="wi-tiers">
        {data.tiers.map((tier) => (
          <div
            key={tier.name}
            className={`wi-tier ${tier.highlight ? "wi-tier--featured" : ""}`}
          >
            {tier.highlight && (
              <span className="wi-tier-badge">Most Popular</span>
            )}
            <h3 className="wi-tier-name">{tier.name}</h3>
            <div className="wi-tier-meta">
              <span className="wi-tier-bottles">{tier.bottles}</span>
              <span className="wi-tier-sep">/</span>
              <span className="wi-tier-freq">{tier.frequency}</span>
            </div>
            <p className="wi-tier-discount">{tier.discount}</p>
            <ul className="wi-tier-perks">
              {tier.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PairingsSection({ data }: { data: PairingInfo }) {
  return (
    <div className="wi-section" key="pairings">
      <div className="wi-philosophy-box">
        <p className="wi-note-label">Our Philosophy</p>
        <p className="wi-philosophy-text">{data.philosophy}</p>
      </div>

      {data.pairings.map((p) => (
        <div key={p.wine} className="wi-pairing-block">
          <h3 className="wi-pairing-wine">{p.wine}</h3>
          <div className="wi-pairing-foods">
            {p.foods.map((f) => (
              <span key={f} className="wi-food-chip">
                {f}
              </span>
            ))}
          </div>
          <p className="wi-pairing-note">{p.note}</p>
        </div>
      ))}
    </div>
  );
}

function RecipesSection({ data }: { data: Recipe[] }) {
  return (
    <div className="wi-section" key="recipes">
      <div className="wi-recipes-grid">
        {data.map((r) => (
          <div key={r.title} className="wi-recipe-card">
            <h3 className="wi-recipe-title">
              {r.url ? (
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="wi-recipe-link">
                  {r.title}
                </a>
              ) : (
                r.title
              )}
            </h3>
            <p className="wi-recipe-desc">{r.description}</p>
            <div className="wi-recipe-meta">
              <span className="wi-recipe-meta-item">
                <span className="wi-recipe-meta-label">Serves</span>{" "}
                {r.serves}
              </span>
              <span className="wi-recipe-meta-item">
                <span className="wi-recipe-meta-label">Time</span> {r.time}
              </span>
            </div>
            <div className="wi-recipe-ingredients">
              <p className="wi-recipe-ing-label">Key Ingredients</p>
              <ul className="wi-recipe-ing-list">
                {r.keyIngredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
            <div className="wi-recipe-pairing">
              <span className="wi-recipe-pairing-label">Pair with</span>
              <span className="wi-recipe-pairing-wine">{r.winePairing}</span>
            </div>
            <p className="wi-recipe-wine-note">{r.wineNote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main page component ────────────────────────────────── */

export function WineryInfoPage() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";
  const topic = (searchParams.get("topic") ?? "tastings") as Topic;
  const wineryParam = searchParams.get("winery") ?? "rex-hill";

  const wineryDisplay =
    wineryParam === "rex-hill" ? "REX HILL" : wineryParam.replace(/-/g, " ").toUpperCase();

  const title = TOPIC_TITLES[topic] ?? "Winery Info";

  useEffect(() => {
    const prev = document.title;
    document.title = `${title} — ${wineryDisplay}`;
    return () => {
      document.title = prev;
    };
  }, [title, wineryDisplay]);

  const content = REX_HILL_CONTENT;

  return (
    <div className="wi">
      {/* Hero / header */}
      <div className="wi-hero">
        <p className="wi-badge">
          {wineryDisplay} &middot; Wine Agent
        </p>
        <h1 className="wi-title">{title}</h1>
      </div>

      {/* Content by topic */}
      {topic === "tastings" && <TastingsSection data={content.tastings} />}
      {topic === "hours" && <HoursSection data={content.hours} />}
      {topic === "club" && <ClubSection data={content.club} />}
      {topic === "pairings" && <PairingsSection data={content.pairings} />}
      {topic === "recipes" && <RecipesSection data={content.recipes} />}

      {!isEmbed && (
        <footer className="wi-footer">
          <Link
            to="/rex-hill/demo"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            &larr; Back to Rex Hill
          </Link>
        </footer>
      )}
    </div>
  );
}
