"use client";

import type { ReactNode } from "react";

type Props = {
  tierPill: ReactNode;
  scrollToSection: (id: string) => void;
};

export function DesktopNav({ tierPill, scrollToSection }: Props) {
  return (
    <nav className="desktop-nav">
      <div className="desktop-nav-inner">
        <div className="desktop-nav-logo">
          Salt<em>stayz</em>
        </div>
        <div className="desktop-nav-links">
          <a>Cities</a>
          <a>Hotels</a>
          <a>Restaurants</a>
          <a>Banquets</a>
          <a className="nav-beyond">
            Beyond <em>Loyalty</em>
          </a>
        </div>
        <div className="desktop-nav-actions">
          <div id="tier-pill-top-desktop">{tierPill}</div>
          <button type="button" className="login-btn">
            Log in
          </button>
          <button
            type="button"
            className="book-btn-nav"
            onClick={() => scrollToSection("rooms-section")}
          >
            Book now
          </button>
        </div>
      </div>
    </nav>
  );
}
