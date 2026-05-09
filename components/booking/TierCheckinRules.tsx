"use client";

import { TIERS } from "@/lib/booking-data";
import type { TierKey } from "@/lib/booking-types";

export function TierCheckinRules({ currentState }: { currentState: TierKey }) {
  const tier = TIERS[currentState];
  const perks: string[] = [];
  if (tier.earlyCheckin) perks.push("Priority early check-in from 10 AM");
  if (tier.lateCheckout) perks.push("Priority late check-out till 2 PM");
  if (perks.length === 0) return null;
  return (
    <div
      style={{
        padding: "8px 10px",
        background: "#FFFBF0",
        borderRadius: 6,
        color: "#9a7820",
        fontSize: "11px",
        marginTop: 6,
        borderLeft: "3px solid var(--ss-gold-dark)",
      }}
    >
      <strong style={{ fontWeight: 700 }}>Beyond {tier.label}:</strong>{" "}
      {perks.join(" · ")}
    </div>
  );
}
