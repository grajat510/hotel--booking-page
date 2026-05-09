"use client";

import { addDays, fmtISO, fmtSub, getNights } from "@/lib/booking-logic";
import { TODAY } from "@/lib/booking-data";

type Props = {
  checkin: Date;
  checkout: Date;
  onChange: (which: "checkin" | "checkout", val: string) => void;
  variant: "mobile" | "desktop";
};

export function DateSelectorBlock({
  checkin,
  checkout,
  onChange,
  variant,
}: Props) {
  const nights = getNights(checkin, checkout);
  const nightsLabel = `${nights} night${nights > 1 ? "s" : ""}`;
  const suffix = variant === "mobile" ? "mobile" : "desktop";

  return (
    <div className={variant === "mobile" ? "date-selector mobile-date" : ""}>
      <div className="date-row">
        <div className="date-field">
          <div className="date-label">CHECK-IN</div>
          <input
            type="date"
            id={`checkin-${suffix}`}
            value={fmtISO(checkin)}
            min={fmtISO(TODAY)}
            onChange={(e) => onChange("checkin", e.target.value)}
          />
          <div className="date-sub" id={`checkin-sub-${suffix}`}>
            {fmtSub(checkin, "")}
          </div>
        </div>
        <div className="date-field">
          <div className="date-label">CHECK-OUT</div>
          <input
            type="date"
            id={`checkout-${suffix}`}
            value={fmtISO(checkout)}
            min={fmtISO(addDays(checkin, 1))}
            onChange={(e) => onChange("checkout", e.target.value)}
          />
          <div className="date-sub" id={`checkout-sub-${suffix}`}>
            {fmtSub(checkout, nightsLabel)}
          </div>
        </div>
      </div>
    </div>
  );
}
