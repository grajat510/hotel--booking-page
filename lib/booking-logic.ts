import {
  DEAL_CONFIG,
  ROOMS,
  TODAY,
  TIERS,
} from "./booking-data";
import type {
  DealInfo,
  LineItem,
  MealKey,
  RoomDef,
  RoomInstance,
  RoomKey,
  SelectionsMap,
  TierKey,
} from "./booking-types";

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function diffDays(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function diffHours(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return ms / (1000 * 60 * 60);
}

export function getNights(
  checkin: Date | null,
  checkout: Date | null,
): number {
  if (!checkin || !checkout) return 1;
  const n = diffDays(checkin, checkout);
  return Math.max(1, n);
}

export function getActiveDeal(
  checkin: Date | null,
  checkout: Date | null,
): DealInfo | null {
  if (!checkin || !checkout) return null;
  const nights = getNights(checkin, checkout);

  const checkinAt2pm = new Date(checkin);
  checkinAt2pm.setHours(14, 0, 0, 0);
  const todayAtNow = new Date(TODAY);
  todayAtNow.setHours(10, 0, 0, 0);
  const hoursToCheckin = diffHours(todayAtNow, checkinAt2pm);
  const daysToCheckin = diffDays(TODAY, checkin);

  if (
    hoursToCheckin >= 0 &&
    hoursToCheckin <= DEAL_CONFIG.lastMinute.hoursThreshold
  ) {
    return { ...DEAL_CONFIG.lastMinute, key: "lastMinute" };
  }
  if (daysToCheckin >= DEAL_CONFIG.earlyBird.daysThreshold) {
    return { ...DEAL_CONFIG.earlyBird, key: "earlyBird" };
  }
  if (nights >= DEAL_CONFIG.longStay.nightsThreshold) {
    return { ...DEAL_CONFIG.longStay, key: "longStay" };
  }
  return null;
}

export function isMealUpgradeActive(
  currentState: TierKey,
  checkin: Date | null,
  checkout: Date | null,
): boolean {
  const tierUpgrade =
    currentState === "silver" ||
    currentState === "gold" ||
    currentState === "platinum";
  const dealActive = getActiveDeal(checkin, checkout) !== null;
  return tierUpgrade || dealActive;
}

export function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function fmtISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fmtSub(d: Date, suffix: string): string {
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum = d.getDate();
  const monName = d.toLocaleDateString("en-US", { month: "short" });
  const yr = d.getFullYear();
  return `${dayName}, ${dayNum} ${monName} ${yr}${suffix ? " · " + suffix : ""}`;
}

export function calculateMealDelta(
  meal: MealKey,
  currentState: TierKey,
): number {
  const tier = TIERS[currentState];
  if (meal === "room-only-cp") return 0;
  if (meal === "breakfast-map") return 400;
  if (meal === "room-only") return 0;
  if (meal === "breakfast") {
    if (currentState === "guest") return 200;
    if (tier.beyondBreakfast) return 0;
    return 200;
  }
  if (meal === "bf-lunch") return 650;
  return 0;
}

export function calculateLineItems(
  selections: SelectionsMap,
  currentState: TierKey,
  checkin: Date | null,
  checkout: Date | null,
): LineItem[] {
  const items: LineItem[] = [];
  const nights = getNights(checkin, checkout);
  const deal = getActiveDeal(checkin, checkout);
  ROOMS.forEach((room) => {
    selections[room.key].forEach((inst, idx) => {
      const mealDeltaPerNight = calculateMealDelta(inst.meal, currentState);
      const roomTotalBase = room.basePrice * nights;
      const dealDiscount = deal ? Math.round(roomTotalBase * deal.pct) : 0;
      const roomTotalAfterDeal = roomTotalBase - dealDiscount;
      const mealTotal = mealDeltaPerNight * nights;
      const subtotal = roomTotalAfterDeal + mealTotal;
      items.push({
        room,
        inst,
        idx,
        nights,
        mealDeltaPerNight,
        mealTotal,
        roomTotalBase,
        dealDiscount,
        roomTotalAfterDeal,
        subtotal,
      });
    });
  });
  return items;
}

export function roomByKey(key: RoomKey): RoomDef | undefined {
  return ROOMS.find((r) => r.key === key);
}

export function getUpgradeTarget(
  roomKey: RoomKey,
  currentState: TierKey,
): RoomDef | null {
  const tier = TIERS[currentState];
  if (tier.upgradesLeft === 0) return null;
  if (roomKey === "classic") return ROOMS.find((r) => r.key === "deluxe") ?? null;
  if (roomKey === "deluxe" || roomKey === "twin")
    return ROOMS.find((r) => r.key === "suite") ?? null;
  return null;
}

export function getShownUpgradeOn(
  roomKey: RoomKey,
  selections: SelectionsMap,
  currentState: TierKey,
): boolean {
  const tier = TIERS[currentState];
  if (tier.upgradesLeft === 0) return false;
  const hasClassic = selections.classic.length > 0;
  const hasDeluxe =
    selections.deluxe.length > 0 || selections.twin.length > 0;
  if (roomKey === "deluxe" && hasClassic) return true;
  if (roomKey === "twin" && hasClassic) return true;
  if (roomKey === "suite" && (hasClassic || hasDeluxe)) return true;
  return false;
}

export function showUpgradeOfferInCard(
  roomKey: RoomKey,
  currentState: TierKey,
): boolean {
  const tier = TIERS[currentState];
  if (tier.upgradesLeft === 0) return false;
  return getUpgradeTarget(roomKey, currentState) !== null;
}

export function migrateMealsForUpgrade(
  selections: SelectionsMap,
  upgradeActive: boolean,
): SelectionsMap {
  const next: SelectionsMap = {
    classic: [],
    deluxe: [],
    twin: [],
    suite: [],
  };
  (Object.keys(selections) as RoomKey[]).forEach((k) => {
    next[k] = selections[k].map((inst) => {
      let meal = inst.meal;
      if (upgradeActive) {
        if (meal === "room-only") meal = "room-only-cp";
        else if (meal === "breakfast") meal = "breakfast-map";
        else if (meal === "bf-lunch") meal = "breakfast-map";
      } else {
        if (meal === "room-only-cp") meal = "room-only";
        else if (meal === "breakfast-map") meal = "breakfast";
      }
      return { ...inst, meal };
    });
  });
  return next;
}
