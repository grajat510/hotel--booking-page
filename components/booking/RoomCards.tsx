"use client";

import { useCallback, useMemo, useState } from "react";
import { ROOMS, TIERS } from "@/lib/booking-data";
import type {
  MealKey,
  RoomDef,
  RoomInstance,
  RoomKey,
  TierKey,
} from "@/lib/booking-types";
import {
  formatINR,
  getActiveDeal,
  getShownUpgradeOn,
  getUpgradeTarget,
  isMealUpgradeActive,
  showUpgradeOfferInCard,
} from "@/lib/booking-logic";

type SelMap = Record<RoomKey, RoomInstance[]>;

type Props = {
  selections: SelMap;
  setSelections: React.Dispatch<React.SetStateAction<SelMap>>;
  claimedUpgrades: Record<string, boolean>;
  setClaimedUpgrades: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  currentState: TierKey;
  checkin: Date | null;
  checkout: Date | null;
  openInclPopup: (roomKey: string) => void;
};

export function RoomCards({
  selections,
  setSelections,
  claimedUpgrades,
  setClaimedUpgrades,
  currentState,
  checkin,
  checkout,
  openInclPopup,
}: Props) {
  const upgradeActive = useMemo(
    () => isMealUpgradeActive(currentState, checkin, checkout),
    [currentState, checkin, checkout],
  );
  const deal = useMemo(
    () => getActiveDeal(checkin, checkout),
    [checkin, checkout],
  );
  const tier = TIERS[currentState];

  const [flipping, setFlipping] = useState<RoomKey | null>(null);
  const [flipBack, setFlipBack] = useState<RoomKey | null>(null);

  const flashError = useCallback((roomKey: RoomKey, msg: string) => {
    const id = `room-error-${roomKey}`;
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.add("show");
      setTimeout(() => el.classList.remove("show"), 3500);
    }
  }, []);

  const selectRoom = (roomKey: RoomKey) => {
    const room = ROOMS.find((r) => r.key === roomKey)!;
    setSelections((prev) => {
      const next = { ...prev, [roomKey]: [...prev[roomKey]] };
      if (next[roomKey].length === 0) {
        next[roomKey].push({
          meal: "breakfast",
          adults: Math.min(2, room.maxAdults),
          children: 0,
        });
      }
      return next;
    });
  };

  const changeRoomCount = (roomKey: RoomKey, delta: number) => {
    const room = ROOMS.find((r) => r.key === roomKey)!;
    setSelections((prev) => {
      const arr = [...prev[roomKey]];
      const target = arr.length + delta;
      if (target > room.stock) {
        flashError(
          roomKey,
          `Only ${room.stock} ${room.name.toLowerCase()}${room.stock > 1 ? "s" : ""} available for these dates`,
        );
        return prev;
      }
      if (target < 0) return prev;
      if (delta > 0) {
        arr.push({
          meal: "breakfast",
          adults: Math.min(2, room.maxAdults),
          children: 0,
        });
      } else {
        arr.pop();
      }
      return { ...prev, [roomKey]: arr };
    });
  };

  const guestCount = (
    roomKey: RoomKey,
    idx: number,
    field: "adults" | "children",
    delta: number,
  ) => {
    const room = ROOMS.find((r) => r.key === roomKey)!;
    setSelections((prev) => {
      const arr = prev[roomKey].map((x, i) => (i === idx ? { ...x } : x));
      const inst = arr[idx];
      const newVal = inst[field] + delta;
      const min = field === "adults" ? 1 : 0;
      const max = field === "adults" ? room.maxAdults : room.maxChildren;
      if (newVal < min || newVal > max) return prev;
      inst[field] = newVal;
      return { ...prev, [roomKey]: arr };
    });
  };

  const setMeal = (roomKey: RoomKey, idx: number, meal: MealKey) => {
    setSelections((prev) => {
      const arr = prev[roomKey].map((x, i) =>
        i === idx ? { ...x, meal } : x,
      );
      return { ...prev, [roomKey]: arr };
    });
  };

  const claimUpgradeFixed = (roomKey: RoomKey) => {
    setFlipping(roomKey);
    setTimeout(() => {
      setClaimedUpgrades((c) => {
        const n = { ...c };
        const len = selections[roomKey].length;
        for (let i = 0; i < len; i++) n[`${roomKey}-${i}`] = true;
        return n;
      });
      setFlipping(null);
    }, 240);
  };

  const revertUpgrade = (roomKey: RoomKey) => {
    setFlipBack(roomKey);
    setTimeout(() => {
      setClaimedUpgrades((c) => {
        const n = { ...c };
        Object.keys(n).forEach((k) => {
          if (k.startsWith(`${roomKey}-`)) delete n[k];
        });
        return n;
      });
      setFlipBack(null);
    }, 240);
  };

  return (
    <div id="rooms-container">
      {ROOMS.map((room) => (
        <RoomCard
          key={room.key}
          room={room}
          count={selections[room.key].length}
          isSel={selections[room.key].length > 0}
          selections={selections}
          claimedUpgrades={claimedUpgrades}
          currentState={currentState}
          upgradeActive={upgradeActive}
          deal={deal}
          tier={tier}
          flipping={flipping === room.key}
          flipBack={flipBack === room.key}
          triggerLabel={
            deal
              ? `${deal.label} DEAL`
              : `BEYOND ${tier.label.toUpperCase()} PERK`
          }
          getShownUpgradeOn={() =>
            getShownUpgradeOn(room.key, selections, currentState)
          }
          showUpgradeOffer={() =>
            showUpgradeOfferInCard(room.key, currentState)
          }
          getUpgradeTarget={() => getUpgradeTarget(room.key, currentState)}
          openInclPopup={openInclPopup}
          selectRoom={() => selectRoom(room.key)}
          changeRoomCount={(d) => changeRoomCount(room.key, d)}
          guestCount={(idx, f, d) => guestCount(room.key, idx, f, d)}
          setMeal={(idx, m) => setMeal(room.key, idx, m)}
          claimUpgrade={() => claimUpgradeFixed(room.key)}
          revertUpgrade={() => revertUpgrade(room.key)}
        />
      ))}
    </div>
  );
}

function RoomCard({
  room,
  count,
  isSel,
  selections,
  claimedUpgrades,
  currentState,
  upgradeActive,
  deal,
  tier,
  flipping,
  flipBack,
  triggerLabel,
  getShownUpgradeOn,
  showUpgradeOffer,
  getUpgradeTarget,
  openInclPopup,
  selectRoom,
  changeRoomCount,
  guestCount,
  setMeal,
  claimUpgrade,
  revertUpgrade,
}: {
  room: RoomDef;
  count: number;
  isSel: boolean;
  selections: SelMap;
  claimedUpgrades: Record<string, boolean>;
  currentState: TierKey;
  upgradeActive: boolean;
  deal: ReturnType<typeof getActiveDeal>;
  tier: (typeof TIERS)[TierKey];
  flipping: boolean;
  flipBack: boolean;
  triggerLabel: string;
  getShownUpgradeOn: () => boolean;
  showUpgradeOffer: () => boolean;
  getUpgradeTarget: () => RoomDef | null;
  openInclPopup: (k: string) => void;
  selectRoom: () => void;
  changeRoomCount: (d: number) => void;
  guestCount: (
    idx: number,
    f: "adults" | "children",
    d: number,
  ) => void;
  setMeal: (idx: number, m: MealKey) => void;
  claimUpgrade: () => void;
  revertUpgrade: () => void;
}) {
  const showUpgradeRibbon = getShownUpgradeOn();
  const upgradeTarget = getUpgradeTarget();
  const offerUpgrade = showUpgradeOffer();
  const anyClaimed = selections[room.key].some(
    (_, i) => claimedUpgrades[`${room.key}-${i}`],
  );
  const displayRoom =
    anyClaimed && upgradeTarget ? upgradeTarget : room;
  const isUpgradedCard = anyClaimed && !!upgradeTarget;

  const stockBadgeClass =
    room.stockWarnLabel && room.stock <= 1 ? "low" : "";

  const cardPills: { cls: string; label: string }[] = [];
  if (deal) {
    const dealPillMeta: Record<string, { cls: string; label: string }> = {
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
    const dm = dealPillMeta[deal.key];
    if (dm) cardPills.push(dm);
  }
  if (currentState !== "guest") {
    const beyondPct = Math.round(tier.discount * 100);
    cardPills.push({
      cls: "pill-beyond",
      label: `✦ BEYOND ${tier.label.toUpperCase()} · ${beyondPct}% OFF`,
    });
  }
  cardPills.push({
    cls: "pill-direct",
    label: "🔒 DIRECT ONLY · 7% OFF",
  });

  const breakfastPriceGuestBronze =
    currentState === "guest" || currentState === "bronze";

  return (
    <div
      className={`room-card${isSel ? " selected" : ""}${isUpgradedCard ? " upgrade-claimed" : ""}${flipping ? " flipping" : ""}${flipBack ? " flipping-back" : ""}`}
      data-room={room.key}
    >
      <div
        className="room-img"
        style={{ backgroundImage: `url('${displayRoom.image}')` }}
      >
        <span className={`room-tier-badge ${displayRoom.tierClass}`}>
          {displayRoom.tier}
        </span>
        {room.stockWarnLabel && !isUpgradedCard ? (
          <span className={`room-stock-badge ${stockBadgeClass}`}>
            {room.stockWarnLabel}
          </span>
        ) : null}
        {showUpgradeRibbon ? (
          <span className="upgrade-ribbon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 11l5-5 5 5" />
            </svg>
            Free upgrade
          </span>
        ) : null}
      </div>
      <div className="room-body">
        <div className="room-head">
          <div>
            <div className="room-name">
              {isUpgradedCard ? displayRoom.name : room.name}
              {isUpgradedCard ? (
                <span className="upgrade-active-badge">✦ UPGRADED</span>
              ) : null}
            </div>
            <div className="room-specs">
              {isUpgradedCard ? displayRoom.specs : room.specs} · up to{" "}
              {room.maxGuests} guests
            </div>
          </div>
          <div className="room-price">
            <div className="room-price-strike">
              {formatINR(room.strikePrice)}
            </div>
            <div className="room-price-main">{formatINR(room.basePrice)}</div>
            <div className="room-price-sub">+ taxes · per night</div>
            <div className="room-price-pills">
              {cardPills.map((p) => (
                <span key={p.label} className={`price-pill ${p.cls}`}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="room-features">
          {(isUpgradedCard ? displayRoom.features : room.features).map(
            (f) => (
              <span key={f} className="feature-chip">
                {f}
              </span>
            ),
          )}
        </div>
        <div className="room-inclusions-row">
          <div className="room-inclusions">
            <strong>✓</strong>{" "}
            {isUpgradedCard ? displayRoom.inclusions : room.inclusions}
          </div>
          <button
            type="button"
            className="incl-info-btn"
            onClick={(e) => {
              e.stopPropagation();
              openInclPopup(isUpgradedCard ? displayRoom.key : room.key);
            }}
          >
            i
          </button>
        </div>

        {isSel ? (
          <div className="room-expanded">
            {offerUpgrade && upgradeTarget ? (
              anyClaimed ? (
                <div className="upgrade-flipback-bar">
                  <div className="upgrade-flipback-text">
                    ✦ Now showing: {displayRoom.name}
                    <span>
                      Same price · your Beyond perk · tap to revert
                    </span>
                  </div>
                  <button
                    type="button"
                    className="upgrade-flipback-btn"
                    onClick={revertUpgrade}
                  >
                    Revert ↩
                  </button>
                </div>
              ) : (
                <div className="upgrade-congrats-bar">
                  <div className="upgrade-congrats-icon">🎉</div>
                  <div className="upgrade-congrats-copy">
                    <div className="upgrade-congrats-title">
                      Congratulations! Free Room Upgrade
                    </div>
                    <div className="upgrade-congrats-sub">
                      You&apos;re eligible for a complimentary upgrade to{" "}
                      <strong style={{ color: "#fff" }}>
                        {upgradeTarget.name}
                      </strong>{" "}
                      — at the same price.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="upgrade-claim-btn"
                    onClick={claimUpgrade}
                  >
                    Claim Now
                  </button>
                </div>
              )
            ) : null}

            <div className="room-count-selector">
              <div>
                <div className="rc-label">{displayRoom.name}s selected</div>
                <div className="rc-sub">
                  Max {room.stock} of this category available
                </div>
              </div>
              <div className="counter">
                <button
                  type="button"
                  className={`counter-btn${count > 0 ? " active" : ""}`}
                  disabled={count <= 0}
                  onClick={() => changeRoomCount(-1)}
                >
                  −
                </button>
                <span className="counter-val">{count}</span>
                <button
                  type="button"
                  className="counter-btn active"
                  onClick={() => changeRoomCount(1)}
                >
                  +
                </button>
              </div>
            </div>
            <div
              className="room-count-error"
              id={`room-error-${room.key}`}
            />

            {selections[room.key].map((inst, idx) => {
              const instRoom = ROOMS.find((r) => r.key === room.key)!;
              const adultsMin = 1;
              const adultsMax = instRoom.maxAdults;
              const childMin = 0;
              const childMax = instRoom.maxChildren;
              return (
                <div key={idx} className="room-instance">
                  {selections[room.key].length > 1 ? (
                    <div className="room-instance-header">
                      {room.name} #{idx + 1}
                    </div>
                  ) : null}
                  <div className="expanded-label">MEAL PLAN</div>
                  {upgradeActive ? (
                    <div
                      className="meal-options"
                      data-room={room.key}
                      data-idx={idx}
                    >
                      <button
                        type="button"
                        className={`meal-option upgrade${inst.meal === "room-only-cp" ? " active" : ""}`}
                        onClick={() => setMeal(idx, "room-only-cp")}
                      >
                        <div className="meal-left">
                          <span className="radio" />
                          <span className="meal-label">
                            Room Only
                            <span className="meal-comp-line">
                              <span className="gift-icon">🎁</span>Get
                              Breakfast complimentary
                            </span>
                          </span>
                        </div>
                        <div className="meal-price">
                          + ₹0
                          <span className="comp-tag">{triggerLabel}</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`meal-option upgrade${inst.meal === "breakfast-map" ? " active" : ""}`}
                        onClick={() => setMeal(idx, "breakfast-map")}
                      >
                        <div className="meal-left">
                          <span className="radio" />
                          <span className="meal-label">
                            With Breakfast
                            <span className="meal-comp-line">
                              <span className="gift-icon">🎁</span>Get Lunch /
                              Dinner complimentary
                            </span>
                          </span>
                        </div>
                        <div className="meal-price">
                          + ₹400
                          <span className="comp-tag">{triggerLabel}</span>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div
                      className="meal-options"
                      data-room={room.key}
                      data-idx={idx}
                    >
                      <button
                        type="button"
                        className={`meal-option${inst.meal === "room-only" ? " active" : ""}`}
                        onClick={() => setMeal(idx, "room-only")}
                      >
                        <div className="meal-left">
                          <span className="radio" />
                          <span className="meal-label">Room only</span>
                        </div>
                        <div className="meal-price">₹0</div>
                      </button>
                      <button
                        type="button"
                        className={`meal-option${inst.meal === "breakfast" ? " active" : ""}`}
                        onClick={() => setMeal(idx, "breakfast")}
                      >
                        <div className="meal-left">
                          <span className="radio" />
                          <span className="meal-label">
                            With breakfast{" "}
                            {currentState === "bronze" ? (
                              <span className="meal-badge">MEMBER RATE</span>
                            ) : null}
                          </span>
                        </div>
                        <div className="meal-price">
                          {breakfastPriceGuestBronze ? (
                            "+ ₹200"
                          ) : (
                            <>
                              <span className="strike">₹200</span>₹0
                              <span className="free-note">
                                Beyond complimentary
                              </span>
                            </>
                          )}
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`meal-option${inst.meal === "bf-lunch" ? " active" : ""}`}
                        onClick={() => setMeal(idx, "bf-lunch")}
                      >
                        <div className="meal-left">
                          <span className="radio" />
                          <span className="meal-label">Breakfast + lunch</span>
                        </div>
                        <div className="meal-price">+ ₹650</div>
                      </button>
                    </div>
                  )}

                  <div className="expanded-label">GUESTS IN THIS ROOM</div>
                  <div className="guest-counters">
                    <div className="guest-row">
                      <div>
                        <div className="guest-label">Adults</div>
                        <div className="guest-age">Age 13+</div>
                      </div>
                      <div className="counter">
                        <button
                          type="button"
                          className={`counter-btn${inst.adults > adultsMin ? " active" : ""}`}
                          disabled={inst.adults <= adultsMin}
                          onClick={() => guestCount(idx, "adults", -1)}
                        >
                          −
                        </button>
                        <span className="counter-val">{inst.adults}</span>
                        <button
                          type="button"
                          className={`counter-btn${inst.adults < adultsMax ? " active" : ""}`}
                          disabled={inst.adults >= adultsMax}
                          onClick={() => guestCount(idx, "adults", 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="guest-row">
                      <div>
                        <div className="guest-label">Children</div>
                        <div className="guest-age">
                          Below 12 · stay free
                        </div>
                      </div>
                      <div className="counter">
                        <button
                          type="button"
                          className={`counter-btn${inst.children > childMin ? " active" : ""}`}
                          disabled={inst.children <= childMin}
                          onClick={() => guestCount(idx, "children", -1)}
                        >
                          −
                        </button>
                        <span className="counter-val">{inst.children}</span>
                        <button
                          type="button"
                          className={`counter-btn${inst.children < childMax ? " active" : ""}`}
                          disabled={inst.children >= childMax}
                          onClick={() => guestCount(idx, "children", 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <button
            type="button"
            className="room-select-btn"
            onClick={selectRoom}
          >
            Select room
          </button>
        )}
      </div>
    </div>
  );
}
