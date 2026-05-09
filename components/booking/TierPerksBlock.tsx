"use client";

import { TIERS } from "@/lib/booking-data";
import type { TierKey } from "@/lib/booking-types";

type Perk = {
  label: string;
  sub: string;
  icon: string;
  highlight?: boolean;
};

export function TierPerksBlock({ currentState }: { currentState: TierKey }) {
  if (currentState === "guest") return null;
  const tier = TIERS[currentState];
  const perks: Perk[] = [];
  if (tier.upgradesTotal > 0) {
    perks.push({
      label: "Complimentary upgrade",
      sub: `${tier.upgradesLeft} of ${tier.upgradesTotal} left this year`,
      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11l5-5 5 5M7 17l5-5 5 5"/></svg>`,
      highlight: true,
    });
  }
  if (tier.cashback > 0) {
    const pct = Math.round(tier.cashback * 100);
    perks.push({
      label: `${pct}% cashback on stay`,
      sub: "Redeem on F&B during your stay",
      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>`,
    });
  }
  if (tier.beyondBreakfast) {
    perks.push({
      label: "Breakfast complimentary",
      sub: "All stays · worth ₹400/day",
      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`,
    });
  }
  if (tier.earlyCheckin) {
    perks.push({
      label: "Priority early check-in",
      sub: "From 10 AM",
      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    });
  }
  if (tier.lateCheckout) {
    perks.push({
      label: "Priority late check-out",
      sub: "Till 2 PM",
      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    });
  }

  return (
    <div className="tier-perks">
      <div className="tier-perks-header">
        <span className="tier-perks-header-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
          </svg>
        </span>
        <span className="tier-perks-title">
          Your <em>Beyond {tier.label}</em> perks unlocked
        </span>
      </div>
      <div className="tier-perks-grid">
        {perks.map((p, i) => (
          <div
            key={i}
            className={`perk-item ${
              p.highlight && tier.upgradesTotal >= 5 ? "full-width" : ""
            }`}
          >
            <span
              className="perk-icon"
              dangerouslySetInnerHTML={{ __html: p.icon }}
            />
            <div className="perk-text">
              <div className="perk-label">
                {p.label}
                {p.highlight ? (
                  <span className="perk-count-pill">{tier.upgradesLeft} left</span>
                ) : null}
              </div>
              <div className="perk-sub">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
