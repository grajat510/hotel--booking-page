import type { RoomDef, TierInfo, TierKey } from "./booking-types";

export const TODAY = new Date(2026, 4, 8);
TODAY.setHours(0, 0, 0, 0);

export const TIERS: Record<TierKey, TierInfo> = {
  guest: {
    label: "Guest",
    discount: 0.07,
    discountCap: null,
    cashback: 0,
    upgradesLeft: 0,
    upgradesTotal: 0,
    beyondBreakfast: false,
    earlyCheckin: false,
    lateCheckout: false,
  },
  bronze: {
    label: "Vibe Check",
    discount: 0.07,
    discountCap: 250,
    cashback: 0.03,
    upgradesLeft: 0,
    upgradesTotal: 0,
    beyondBreakfast: false,
    earlyCheckin: false,
    lateCheckout: false,
  },
  silver: {
    label: "Hype",
    discount: 0.1,
    discountCap: 300,
    cashback: 0.04,
    upgradesLeft: 2,
    upgradesTotal: 2,
    beyondBreakfast: false,
    earlyCheckin: false,
    lateCheckout: true,
  },
  gold: {
    label: "Cult Fav",
    discount: 0.12,
    discountCap: 400,
    cashback: 0.05,
    upgradesLeft: 5,
    upgradesTotal: 5,
    beyondBreakfast: true,
    earlyCheckin: true,
    lateCheckout: true,
  },
  platinum: {
    label: "G.O.A.T",
    discount: 0.15,
    discountCap: null,
    cashback: 0.06,
    upgradesLeft: 10,
    upgradesTotal: 10,
    beyondBreakfast: true,
    earlyCheckin: true,
    lateCheckout: true,
  },
};

export const ROOMS: RoomDef[] = [
  {
    key: "classic",
    name: "Classic room",
    tier: "STANDARD",
    tierClass: "",
    specs: "240 sq ft · 1 king bed",
    maxGuests: 2,
    maxAdults: 2,
    maxChildren: 1,
    stock: 3,
    stockWarnLabel: "Only 3 left",
    basePrice: 3299,
    strikePrice: 4200,
    features: ["City view", "In-room safe", "Work desk", "Non-smoking"],
    inclusions: "15% F&B discount · Free cancellation 24hrs",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=75",
  },
  {
    key: "deluxe",
    name: "Deluxe room",
    tier: "DELUXE",
    tierClass: "",
    specs: "320 sq ft · 1 king bed",
    maxGuests: 2,
    maxAdults: 2,
    maxChildren: 1,
    stock: 5,
    stockWarnLabel: null,
    basePrice: 4699,
    strikePrice: 5800,
    features: ["Pool view", "Bathtub", "Work desk"],
    inclusions:
      "Complimentary breakfast · 15% F&B · Free cancellation",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=75",
  },
  {
    key: "twin",
    name: "Deluxe twin",
    tier: "DELUXE",
    tierClass: "",
    specs: "320 sq ft · 2 twin beds",
    maxGuests: 2,
    maxAdults: 2,
    maxChildren: 1,
    stock: 4,
    stockWarnLabel: null,
    basePrice: 4799,
    strikePrice: 5800,
    features: ["City view", "Work desk", "Non-smoking"],
    inclusions:
      "Complimentary breakfast · 15% F&B · Free cancellation",
    image:
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=900&q=75",
  },
  {
    key: "suite",
    name: "Premium suite",
    tier: "SUITE",
    tierClass: "suite",
    specs: "540 sq ft · 1 king + living",
    maxGuests: 3,
    maxAdults: 3,
    maxChildren: 2,
    stock: 1,
    stockWarnLabel: "Only 1 left",
    basePrice: 7399,
    strikePrice: 9500,
    features: ["Rooftop view", "Jacuzzi", "Butler service"],
    inclusions:
      "Breakfast + evening cocktails · 20% F&B · Free cancellation 48hrs",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=75",
  },
];

export const DEAL_CONFIG = {
  lastMinute: {
    hoursThreshold: 24,
    pct: 0.1,
    label: "LAST MINUTE",
    emoji: "⚡",
    cls: "last-minute",
  },
  earlyBird: {
    daysThreshold: 30,
    pct: 0.05,
    label: "EARLY BIRD",
    emoji: "🐦",
    cls: "early-bird",
  },
  longStay: {
    nightsThreshold: 3,
    pct: 0.03,
    label: "LONG STAY",
    emoji: "🌙",
    cls: "long-stay",
  },
} as const;

export const INCLUSIONS_POPUP_DATA: Record<
  string,
  { title: string; items: { icon: string; label: string; sub: string }[] }
> = {
  classic: {
    title: "Classic Room · Inclusions",
    items: [
      { icon: "🛏️", label: "Free Linen Change", sub: "Every alternate day" },
      {
        icon: "🚕",
        label: "Free 1st Cab Transfer",
        sub: "Airport or railway — one way, on arrival",
      },
      { icon: "👕", label: "Free Laundry", sub: "Up to 4 clothes per stay" },
      {
        icon: "🏷️",
        label: "15% F&B Discount",
        sub: "Valid at all on-site restaurants & bar",
      },
      {
        icon: "🔓",
        label: "Free Cancellation",
        sub: "Up to 24 hrs before check-in",
      },
    ],
  },
  deluxe: {
    title: "Deluxe Room · Inclusions",
    items: [
      { icon: "🛏️", label: "Free Linen Change", sub: "Every alternate day" },
      {
        icon: "🌅",
        label: "Early Check-in — 8 AM",
        sub: "Subject to room availability",
      },
      {
        icon: "🌙",
        label: "Late Checkout — till 4 PM",
        sub: "Relax without the rush",
      },
      {
        icon: "🚕",
        label: "Free 1st Cab Transfer",
        sub: "Airport or railway — one way, on arrival",
      },
      { icon: "👕", label: "Free Laundry", sub: "Up to 4 clothes per stay" },
      {
        icon: "🏷️",
        label: "15% F&B Discount",
        sub: "Valid at all on-site restaurants & bar",
      },
      {
        icon: "🔓",
        label: "Free Cancellation",
        sub: "Up to 24 hrs before check-in",
      },
    ],
  },
  twin: {
    title: "Twin Room · Inclusions",
    items: [
      { icon: "🛏️", label: "Free Linen Change", sub: "Every alternate day" },
      {
        icon: "🌅",
        label: "Early Check-in — 8 AM",
        sub: "Subject to room availability",
      },
      {
        icon: "🌙",
        label: "Late Checkout — till 4 PM",
        sub: "Relax without the rush",
      },
      {
        icon: "🚕",
        label: "Free 1st Cab Transfer",
        sub: "Airport or railway — one way, on arrival",
      },
      { icon: "👕", label: "Free Laundry", sub: "Up to 4 clothes per stay" },
      {
        icon: "🏷️",
        label: "15% F&B Discount",
        sub: "Valid at all on-site restaurants & bar",
      },
      {
        icon: "🔓",
        label: "Free Cancellation",
        sub: "Up to 24 hrs before check-in",
      },
    ],
  },
  suite: {
    title: "Suite · Inclusions",
    items: [
      { icon: "🛏️", label: "Free Linen Change", sub: "Daily" },
      {
        icon: "🌅",
        label: "Early Check-in — 8 AM",
        sub: "Guaranteed · no availability caveat",
      },
      {
        icon: "🌙",
        label: "Late Checkout — till 4 PM",
        sub: "Guaranteed · no availability caveat",
      },
      {
        icon: "🚕",
        label: "Free 1st Cab Transfer",
        sub: "Airport or railway — one way, on arrival",
      },
      { icon: "👕", label: "Free Laundry", sub: "Up to 4 clothes per stay" },
      {
        icon: "🍸",
        label: "Evening Cocktails",
        sub: "Complimentary welcome drinks daily",
      },
      {
        icon: "🏷️",
        label: "20% F&B Discount",
        sub: "Valid at all on-site restaurants & bar",
      },
      {
        icon: "🔓",
        label: "Free Cancellation",
        sub: "Up to 48 hrs before check-in",
      },
    ],
  },
};
