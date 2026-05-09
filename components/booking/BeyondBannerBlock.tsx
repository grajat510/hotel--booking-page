"use client";

import { TIERS } from "@/lib/booking-data";
import type { TierKey } from "@/lib/booking-types";

type Props = { currentState: TierKey; onJoinBeyond: () => void };

export function BeyondBannerBlock({ currentState, onJoinBeyond }: Props) {
  if (currentState === "guest") {
    return (
      <div className="beyond-banner tier-nudge">
        <div className="beyond-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
          </svg>
        </div>
        <div className="beyond-copy">
          <div className="beyond-title">
            Unlock <em>Beyond</em> · first-booking offer
          </div>
          <div className="beyond-sub">
            Join free · get <strong>25% off up to ₹1,000</strong> on this stay
          </div>
        </div>
        <button type="button" className="beyond-cta" onClick={onJoinBeyond}>
          Join
        </button>
      </div>
    );
  }
  const tier = TIERS[currentState];
  const discPct = Math.round(tier.discount * 100);
  const capText = tier.discountCap ? `max ₹${tier.discountCap}` : "flat";
  return (
    <div className="beyond-banner tier-active">
      <div className="beyond-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
        </svg>
      </div>
      <div className="beyond-copy">
        <div className="beyond-title">
          Welcome back · <em>Beyond {tier.label}</em>
        </div>
        <div className="beyond-sub">
          Your <strong>{discPct}% member discount</strong> ({capText}) is
          auto-applied
        </div>
      </div>
    </div>
  );
}
