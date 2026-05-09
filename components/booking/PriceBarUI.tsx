"use client";

import type { CSSProperties, ReactNode } from "react";
import type { LineItem, TierKey } from "@/lib/booking-types";
import type { computePriceBar } from "@/lib/price-bar-compute";
import { TIERS } from "@/lib/booking-data";
import { formatINR } from "@/lib/booking-logic";

type Model = ReturnType<typeof computePriceBar>;

type Props = {
  priceModel: Model;
  priceOpen: boolean;
  setPriceOpen: (v: boolean) => void;
  currentState: TierKey;
  lineItems: LineItem[];
  bookDirect: () => void;
  bookNow: () => void;
  onOpenBeyondPerks: () => void;
  onOpenBeyondJoin: () => void;
  sheetActive: boolean;
  beyondSheet: ReactNode;
};

function ExpandedLines({
  lines,
}: {
  lines: Extract<Model, { kind: "full" }>["expandedLines"];
}) {
  return (
    <>
      {lines.map((line, i) => {
        if (line.type === "room") {
          return (
            <div key={i} className="price-line">
              <span className="price-line-label">{line.label}</span>
              <span className="price-line-val">{line.value}</span>
            </div>
          );
        }
        if (line.type === "deal") {
          return (
            <div key={i} className={`price-line deal-line ${line.cls}`}>
              <span
                className="price-line-label"
                style={{ paddingLeft: 10 }}
              >
                {line.label}
              </span>
              <span className="price-line-val">{line.value}</span>
            </div>
          );
        }
        if (line.type === "meal") {
          const st: CSSProperties = {};
          if (line.valueStyle?.includes("ss-gold-deep"))
            st.color = "var(--ss-gold-deep)";
          if (line.valueStyle?.includes("gz-lime-deep")) {
            st.color = "var(--gz-lime-deep)";
            st.fontWeight = 600;
          }
          return (
            <div key={i} className="price-line">
              <span
                className="price-line-label"
                style={{ paddingLeft: 10 }}
              >
                {line.label}
              </span>
              <span className="price-line-val" style={st}>
                {line.value}
              </span>
            </div>
          );
        }
        if (line.type === "taxes") {
          return (
            <div key={i} className="price-line">
              <span className="price-line-label">{line.label}</span>
              <span className="price-line-val">{line.value}</span>
            </div>
          );
        }
        if (line.type === "discount") {
          return (
            <div key={i} className="price-line discount">
              <span className="price-line-label">{line.label}</span>
              <span className="price-line-val">{line.value}</span>
            </div>
          );
        }
        if (line.type === "beyond-disc") {
          return (
            <div key={i} className="price-line beyond-disc">
              <span
                className="price-line-label"
                dangerouslySetInnerHTML={{
                  __html: line.label.replace(
                    /^Beyond/,
                    "<em style=\"font-family: 'Lemon/Milk', 'Bebas Neue', Impact, sans-serif;\">Beyond</em>",
                  ),
                }}
              />
              <span
                className="price-line-val"
                style={
                  line.valueStyle
                    ? { opacity: 0.7 }
                    : undefined
                }
              >
                {line.value}
              </span>
            </div>
          );
        }
        if (line.type === "total") {
          return (
            <div key={i} className="price-line total">
              <span className="price-line-label">{line.label}</span>
              <span className="price-line-val">{line.value}</span>
            </div>
          );
        }
        return null;
      })}
      <div className="pb-web-only-note">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Saltstayz Direct-Only Price · Exclusive to saltstayz.com
      </div>
    </>
  );
}

export function PriceBarUI({
  priceModel,
  priceOpen,
  setPriceOpen,
  currentState,
  lineItems,
  bookDirect,
  bookNow,
  onOpenBeyondPerks,
  onOpenBeyondJoin,
  sheetActive,
  beyondSheet,
}: Props) {
  const toggleBar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPriceOpen(!priceOpen);
  };

  if (priceModel.kind === "empty") {
    return (
      <div
        id="price-bar"
        className={`price-bar${sheetActive ? " sheet-active" : ""}${priceOpen ? " open" : ""}`}
      >
        <div className="price-bar-expanded" id="price-bar-expanded">
          <div
            style={{
              padding: "10px 0",
              fontSize: 12,
              color: "var(--ss-text-light)",
              textAlign: "center",
            }}
          >
            No rooms selected yet
          </div>
        </div>
        <div id="beyond-sheet-slot">{beyondSheet}</div>
        <div className="price-bar-collapsed" id="price-bar-collapsed">
          <div className="price-summary" onClick={toggleBar}>
            <div id="pb-pills-row" className="pb-pills-row">
              <span
                className="price-pill pill-direct"
                style={{ opacity: 0.5 }}
              >
                Select a room
              </span>
            </div>
            <div className="price-total-row">
              <span className="price-strike" id="pb-strike" />
              <span className="price-total" id="pb-total">
                ₹0
              </span>
              <span className="price-nights" id="pb-nights" />
              <svg
                className="chev-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            <div className="price-bottom-note" id="pb-note">
              {priceModel.pbNote}
            </div>
          </div>
          <div id="pb-action-slot">
            <button
              type="button"
              className="book-btn"
              disabled
              style={{ opacity: 0.4 }}
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const m = priceModel;
  const tier = TIERS[currentState];
  const subtotal = lineItems.reduce((s, it) => s + it.subtotal, 0);
  const nights = m.nights;

  let directTotal = 0;
  let beyondTotal = 0;
  if (currentState === "guest") {
    const directDisc = Math.round(subtotal * 0.07);
    const taxes = Math.round(subtotal * 0.18);
    const beyondDisc = Math.min(Math.round(subtotal * 0.25), 1000 * nights);
    directTotal = subtotal + taxes - directDisc;
    beyondTotal = subtotal + taxes - beyondDisc;
  }

  return (
    <div
      id="price-bar"
      className={`price-bar guest-dual${sheetActive ? " sheet-active" : ""}${priceOpen ? " open" : ""}`}
    >
      <div className="price-bar-expanded" id="price-bar-expanded">
        <ExpandedLines lines={m.expandedLines} />
      </div>
      <div id="beyond-sheet-slot">{beyondSheet}</div>
      <div className="price-bar-collapsed" id="price-bar-collapsed">
        <div className="price-summary" onClick={toggleBar}>
          <div id="pb-pills-row" className="pb-pills-row">
            {m.pbPills.map((p) => (
              <span key={p.label} className={`price-pill ${p.cls}`}>
                {p.label}
              </span>
            ))}
          </div>
          <div className="price-total-row">
            <span className="price-strike" id="pb-strike">
              {m.strikeDisplay}
            </span>
            <span className="price-total" id="pb-total">
              {m.totalDisplay}
            </span>
            <span className="price-nights" id="pb-nights">
              {m.nightsLabel}
            </span>
            <svg
              className="chev-sm"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <div
            className="price-bottom-note"
            id="pb-note"
            dangerouslySetInnerHTML={{ __html: m.noteHTML }}
          />
        </div>
        <div id="pb-action-slot">
          {currentState === "guest" ? (
            <div className="cta-dual">
              <button
                type="button"
                className="cta-btn cta-direct"
                onClick={bookDirect}
                aria-label={`Book now at ${formatINR(directTotal)} with 7 percent direct discount`}
              >
                <span className="cta-label">Book Now</span>
                <span className="cta-price">{formatINR(directTotal)}</span>
              </button>
              <button
                type="button"
                className="cta-btn cta-beyond"
                onClick={onOpenBeyondJoin}
                aria-label={`Book with Beyond at ${formatINR(beyondTotal)} after joining free`}
              >
                <span className="cta-label">
                  With <em>Beyond</em>
                </span>
                <span className="cta-price">{formatINR(beyondTotal)}</span>
              </button>
            </div>
          ) : (
            <div className="cta-dual">
              <button
                type="button"
                className="cta-btn cta-direct"
                onClick={bookNow}
                aria-label={`Book now with Beyond ${tier.label} discount`}
              >
                <span className="cta-label">Book Now</span>
                <span className="cta-price">{m.totalDisplay}</span>
              </button>
              <button
                type="button"
                className="cta-btn cta-beyond"
                onClick={onOpenBeyondPerks}
                aria-label="View your Beyond perks"
              >
                <span className="cta-label">
                  Your <em>Beyond</em>
                </span>
                <span className="cta-price">Perks →</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
