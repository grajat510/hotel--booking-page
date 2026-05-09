import { TIERS } from "./booking-data";
import type { DealInfo, LineItem, SelectionsMap, TierKey } from "./booking-types";
import { formatINR, getActiveDeal, getNights } from "./booking-logic";

export type PriceBarEmpty = {
  kind: "empty";
  pbNote: string;
};

export type PriceBarFull = {
  kind: "full";
  guestDual: boolean;
  subtotal: number;
  taxes: number;
  strikeTotal: number;
  total: number;
  discountPct?: number;
  discountAmount?: number;
  noteHTML: string;
  nights: number;
  deal: DealInfo | null;
  pbPills: { cls: string; label: string }[];
  strikeDisplay: string;
  totalDisplay: string;
  nightsLabel: string;
  nRooms: number;
  expandedLines: ExpandedLine[];
};

export type ExpandedLine =
  | { type: "room"; label: string; value: string }
  | {
      type: "deal";
      cls: string;
      label: string;
      value: string;
    }
  | { type: "meal"; label: string; value: string; valueStyle?: string }
  | { type: "taxes"; label: string; value: string }
  | { type: "discount"; label: string; value: string }
  | { type: "beyond-disc"; label: string; value: string; valueStyle?: string }
  | { type: "total"; label: string; value: string };

export function computePriceBar(
  items: LineItem[],
  selections: SelectionsMap,
  currentState: TierKey,
  checkin: Date | null,
  checkout: Date | null,
): PriceBarEmpty | PriceBarFull {
  const nights = getNights(checkin, checkout);
  const deal = getActiveDeal(checkin, checkout);

  if (items.length === 0) {
    return {
      kind: "empty",
      pbNote: 'Tap "Select room" to begin',
    };
  }

  const subtotal = items.reduce((s, it) => s + it.subtotal, 0);
  const strikeTotal = items.reduce(
    (s, it) => s + it.room.strikePrice * nights,
    0,
  );
  const taxes = Math.round(subtotal * 0.18);
  const tier = TIERS[currentState];

  let total: number;
  let discountAmount: number | undefined;
  let discountPct: number | undefined;
  let noteHTML: string;
  const guestDual = true;

  if (currentState === "guest") {
    const directDisc = Math.round(subtotal * 0.07);
    const beyondDisc = Math.min(Math.round(subtotal * 0.25), 1000 * nights);
    const directTotal = subtotal + taxes - directDisc;
    const beyondTotal = subtotal + taxes - beyondDisc;
    const beyondSavings = directTotal - beyondTotal;
    total = directTotal;
    discountAmount = directDisc;
    noteHTML = `Save <strong style="color:var(--gz-orange-deep);">₹${beyondSavings.toLocaleString("en-IN")} more</strong> with <em style="font-family: 'Lemon/Milk', 'Bebas Neue', Impact, sans-serif; font-style: italic; color: var(--gz-purple-deep); font-weight: 600;">Beyond</em> →`;
  } else {
    discountPct = Math.round(tier.discount * 100);
    discountAmount = Math.round(subtotal * tier.discount);
    const capScaled = tier.discountCap ? tier.discountCap * nights : null;
    if (capScaled && discountAmount > capScaled) discountAmount = capScaled;
    total = subtotal + taxes - discountAmount;
    const pct = Math.round(tier.cashback * 100);
    noteHTML = `${pct}% F&B cashback · free cancellation · 2× upgrades`;
    if (tier.beyondBreakfast) {
      noteHTML = `${pct}% F&B cashback · breakfast complimentary`;
    }
  }

  const pbPills: { cls: string; label: string }[] = [];
  if (deal) {
    const dealMeta: Record<string, { cls: string; label: string }> = {
      lastMinute: {
        cls: "pill-last-min",
        label: `⚡ LAST MINUTE · ${Math.round(deal.pct * 100)}% OFF`,
      },
      earlyBird: {
        cls: "pill-early-bird",
        label: `🐦 EARLY BIRD · ${Math.round(deal.pct * 100)}% OFF`,
      },
      longStay: {
        cls: "pill-long-stay",
        label: `🌙 LONG STAY · ${Math.round(deal.pct * 100)}% OFF`,
      },
    };
    const dm = dealMeta[deal.key];
    if (dm) pbPills.push(dm);
  }
  if (currentState !== "guest") {
    pbPills.push({
      cls: "pill-beyond",
      label: `✦ BEYOND ${tier.label.toUpperCase()} · ${Math.round(tier.discount * 100)}% OFF`,
    });
  }
  pbPills.push({ cls: "pill-direct", label: "DIRECT · 7% OFF" });

  const nRooms = items.length;
  const nightsTxt = `${nights} night${nights > 1 ? "s" : ""}`;
  const nightsLabel = `total · ${nightsTxt} · ${nRooms} room${nRooms > 1 ? "s" : ""}`;

  const expandedLines: ExpandedLine[] = [];
  items.forEach((it) => {
    const roomLabel =
      selections[it.room.key].length > 1
        ? `${it.room.name} #${it.idx + 1}`
        : it.room.name;
    expandedLines.push({
      type: "room",
      label: `${roomLabel} × ${nightsTxt}`,
      value: formatINR(it.roomTotalBase),
    });
    if (it.dealDiscount > 0 && deal) {
      expandedLines.push({
        type: "deal",
        cls: deal.cls,
        label: `↳ ${deal.emoji} ${deal.label} (${Math.round(deal.pct * 100)}% off)`,
        value: `− ${formatINR(it.dealDiscount)}`,
      });
    }
    if (it.inst.meal === "breakfast") {
      if (
        it.mealDeltaPerNight === 0 &&
        (currentState === "gold" || currentState === "platinum")
      ) {
        expandedLines.push({
          type: "meal",
          label: "↳ Breakfast · Beyond perk",
          value: "₹0",
          valueStyle: "color: var(--ss-gold-deep)",
        });
      } else if (it.mealTotal > 0) {
        expandedLines.push({
          type: "meal",
          label: `↳ Breakfast × ${nightsTxt}`,
          value: `+ ${formatINR(it.mealTotal)}`,
        });
      }
    } else if (it.inst.meal === "bf-lunch") {
      expandedLines.push({
        type: "meal",
        label: `↳ Breakfast + lunch × ${nightsTxt}`,
        value: `+ ${formatINR(it.mealTotal)}`,
      });
    } else if (it.inst.meal === "room-only-cp") {
      expandedLines.push({
        type: "meal",
        label: "↳ 🎁 Breakfast complimentary",
        value: "FREE",
        valueStyle: "color: var(--gz-lime-deep); font-weight: 600;",
      });
    } else if (it.inst.meal === "breakfast-map") {
      expandedLines.push({
        type: "meal",
        label: `↳ Breakfast × ${nightsTxt}`,
        value: `+ ${formatINR(it.mealTotal)}`,
      });
      expandedLines.push({
        type: "meal",
        label: "↳ 🎁 Lunch / Dinner complimentary",
        value: "FREE",
        valueStyle: "color: var(--gz-lime-deep); font-weight: 600;",
      });
    }
  });

  expandedLines.push({
    type: "taxes",
    label: "Taxes & fees (18%)",
    value: formatINR(taxes),
  });

  if (currentState === "guest") {
    const directDisc = Math.round(subtotal * 0.07);
    const beyondDisc = Math.min(Math.round(subtotal * 0.25), 1000 * nights);
    const beyondExtra = beyondDisc - directDisc;
    expandedLines.push({
      type: "discount",
      label: "Direct booking discount (7% off)",
      value: `− ${formatINR(directDisc)}`,
    });
    expandedLines.push({
      type: "beyond-disc",
      label: `Beyond · save ₹${beyondExtra.toLocaleString("en-IN")} more (free join)`,
      value: "optional",
      valueStyle: "opacity:0.7",
    });
  } else {
    const capScaled = tier.discountCap ? tier.discountCap * nights : null;
    const capText = capScaled
      ? `max ₹${capScaled.toLocaleString("en-IN")}`
      : "flat";
    const dPct = Math.round(tier.discount * 100);
    expandedLines.push({
      type: "beyond-disc",
      label: `Beyond ${tier.label} (${dPct}% off, ${capText})`,
      value: `− ${formatINR(discountAmount!)}`,
    });
  }

  expandedLines.push({
    type: "total",
    label: "Total payable",
    value: formatINR(total),
  });

  return {
    kind: "full",
    guestDual,
    subtotal,
    taxes,
    strikeTotal: strikeTotal + taxes,
    total,
    discountPct,
    discountAmount,
    noteHTML,
    nights,
    deal,
    pbPills,
    strikeDisplay: formatINR(strikeTotal + taxes),
    totalDisplay: formatINR(total),
    nightsLabel,
    nRooms,
    expandedLines,
  };
}
