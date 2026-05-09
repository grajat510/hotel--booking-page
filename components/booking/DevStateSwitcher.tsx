"use client";

import type { TierKey } from "@/lib/booking-types";

type Props = {
  currentState: TierKey;
  onStateChange: (s: TierKey) => void;
  onScenario: (s: string) => void;
};

export function DevStateSwitcher({
  currentState,
  onStateChange,
  onScenario,
}: Props) {
  return (
    <div className="state-switcher">
      <div className="state-switcher-title">User state</div>
      <select
        id="state-select"
        value={currentState}
        onChange={(e) => onStateChange(e.target.value as TierKey)}
      >
        <option value="guest">Guest (not logged in)</option>
        <option value="bronze">Beyond Vibe Check (7%, max ₹250)</option>
        <option value="silver">Beyond Hype (10%, max ₹300)</option>
        <option value="gold">Beyond Cult Fav (12%, max ₹400)</option>
        <option value="platinum">Beyond G.O.A.T (15% flat)</option>
      </select>
      <div className="scenario-block">
        <div className="state-switcher-title">Booking scenario</div>
        <select
          id="scenario-select"
          defaultValue="default"
          onChange={(e) => onScenario(e.target.value)}
        >
          <option value="default">Default (1 night, 15 days out)</option>
          <option value="longstay">Long Stay (5 nights)</option>
          <option value="earlybird">Early Bird (45 days out)</option>
          <option value="lastminute">Last Minute (today)</option>
        </select>
      </div>
    </div>
  );
}
