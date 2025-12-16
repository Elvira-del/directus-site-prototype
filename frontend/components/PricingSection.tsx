"use client";

import Link from "next/link";
import { Container } from "./Container";

export default function PricingSection({
  tagline,
  headline,
  pricing_cards = [],
}) {
  if (!pricing_cards || pricing_cards.length === 0) {
    return null;
  }

  return (
    <section className="pricing-section">
      <Container>
        <div className="pricing-header">
          {tagline && <p className="tagline">{tagline}</p>}
          {headline && <h2>{headline}</h2>}
        </div>

        <div className="pricing-plans">
          {pricing_cards.map((plan, index) => (
            <div
              className={`pricing-plan ${plan.is_highlighted ? "featured" : ""}`}
              key={index}
            >
              {plan.badge && <span className="badge">{plan.badge}</span>}
              <h3>{plan.title}</h3>
              <div className="price">{plan.price}</div>
              {plan.description && (
                <p className="plan-description">{plan.description}</p>
              )}

              {plan.features && (
                <ul className="features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature.trim()}</li>
                  ))}
                </ul>
              )}

              {plan.button && plan.button.label && (
                <Link
                  href={resolveButtonUrl(plan.button)}
                  className={`cta-button ${plan.is_highlighted ? "featured-cta" : ""}`}
                >
                  {plan.button.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Helper function to resolve button URLs
function resolveButtonUrl(button) {
  if (button.type === "page" && button.page) return `/pages/${button.page}`;
  if (button.type === "post" && button.post) return `/posts/${button.post}`;
  return button.url || "#";
}
