export type TierKey = "guest" | "bronze" | "silver" | "gold" | "platinum";

export type RoomKey = "classic" | "deluxe" | "twin" | "suite";

export type MealKey =
  | "room-only"
  | "breakfast"
  | "bf-lunch"
  | "room-only-cp"
  | "breakfast-map";

export type RoomInstance = {
  meal: MealKey;
  adults: number;
  children: number;
};

export type DealKey = "lastMinute" | "earlyBird" | "longStay";

export type DealInfo = {
  hoursThreshold?: number;
  daysThreshold?: number;
  nightsThreshold?: number;
  pct: number;
  label: string;
  emoji: string;
  cls: string;
  key: DealKey;
};

export type TierInfo = {
  label: string;
  discount: number;
  discountCap: number | null;
  cashback: number;
  upgradesLeft: number;
  upgradesTotal: number;
  beyondBreakfast: boolean;
  earlyCheckin: boolean;
  lateCheckout: boolean;
};

export type RoomDef = {
  key: RoomKey;
  name: string;
  tier: string;
  tierClass: string;
  specs: string;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  stock: number;
  stockWarnLabel: string | null;
  basePrice: number;
  strikePrice: number;
  features: string[];
  inclusions: string;
  image: string;
};

/** Room selections: each category has an array of guest-room instances */
export type SelectionsMap = Record<RoomKey, RoomInstance[]>;

export type LineItem = {
  room: RoomDef;
  inst: RoomInstance;
  idx: number;
  nights: number;
  mealDeltaPerNight: number;
  mealTotal: number;
  roomTotalBase: number;
  dealDiscount: number;
  roomTotalAfterDeal: number;
  subtotal: number;
};
