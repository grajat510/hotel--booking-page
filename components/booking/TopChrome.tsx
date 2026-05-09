"use client";

import type { ReactNode } from "react";
import type { TierKey } from "@/lib/booking-types";

type Props = { tierPill: ReactNode; currentState: TierKey };

export function TopChrome({ tierPill, currentState }: Props) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button type="button" className="icon-btn" aria-label="Back">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="logo">
          Salt<em>stayz</em>
        </div>
      </div>
      <div className="topbar-right">
        <div id="tier-pill-top">{tierPill}</div>
        <button
          id="login-btn"
          type="button"
          className={`login-btn${currentState === "guest" ? "" : " hidden"}`}
        >
          Log in
        </button>
        <button type="button" className="icon-btn" aria-label="Menu">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
