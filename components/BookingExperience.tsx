"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TODAY, TIERS } from "@/lib/booking-data";
import type { RoomInstance, RoomKey, TierKey } from "@/lib/booking-types";
import { addDays, calculateLineItems } from "@/lib/booking-logic";
import { computePriceBar } from "@/lib/price-bar-compute";
import { BeyondBannerBlock } from "./booking/BeyondBannerBlock";
import { BeyondSheetFlow, type BeyondStep } from "./booking/BeyondSheetFlow";
import { DateSelectorBlock } from "./booking/DateSelectorBlock";
import { DesktopNav } from "./booking/DesktopNav";
import { DevStateSwitcher } from "./booking/DevStateSwitcher";
import { HotelHeaderBlock } from "./booking/HotelHeaderBlock";
import { InclusionsModal } from "./booking/InclusionsModal";
import { LowerPageSections } from "./booking/LowerPageSections";
import { MiddleStaticSections } from "./booking/MiddleStaticSections";
import { PriceBarUI } from "./booking/PriceBarUI";
import { RoomCards } from "./booking/RoomCards";
import { SectionTabsRow } from "./booking/SectionTabsRow";
import { TierCheckinRules } from "./booking/TierCheckinRules";
import { TierPerksBlock } from "./booking/TierPerksBlock";
import { TopChrome } from "./booking/TopChrome";

const initialSelections = (): Record<RoomKey, RoomInstance[]> => ({
  classic: [{ meal: "breakfast", adults: 2, children: 0 }],
  deluxe: [],
  twin: [],
  suite: [],
});

export function BookingExperience() {
  const [currentState, setCurrentState] = useState<TierKey>("guest");
  const [selections, setSelections] = useState(initialSelections);
  const [claimedUpgrades, setClaimedUpgrades] = useState<
    Record<string, boolean>
  >({});
  const [checkin, setCheckin] = useState(() => addDays(TODAY, 15));
  const [checkout, setCheckout] = useState(() => addDays(TODAY, 16));
  const [priceOpen, setPriceOpen] = useState(false);
  const [inclKey, setInclKey] = useState<string | null>(null);
  const [beyondStep, setBeyondStep] = useState<BeyondStep>("closed");
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const priceWrapRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const fn = () => setIsDesktop(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!window.matchMedia("(min-width: 900px)").matches) {
        document.body.classList.remove("scrolled");
        return;
      }
      if (window.scrollY > 80) document.body.classList.add("scrolled");
      else document.body.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (!mounted || !priceWrapRef.current) return;
    const wrap = priceWrapRef.current;
    const rail = railRef.current;
    if (isDesktop && rail) {
      rail.appendChild(wrap);
    } else {
      document.body.appendChild(wrap);
    }
  }, [mounted, isDesktop]);

  const lineItems = useMemo(
    () => calculateLineItems(selections, currentState, checkin, checkout),
    [selections, currentState, checkin, checkout],
  );

  const priceModel = useMemo(
    () => computePriceBar(lineItems, selections, currentState, checkin, checkout),
    [lineItems, selections, currentState, checkin, checkout],
  );

  const sheetActive = beyondStep !== "closed";

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const desk = window.matchMedia("(min-width: 900px)").matches;
    const offset = desk ? 80 : 20;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const onDateChange = useCallback(
    (which: "checkin" | "checkout", val: string) => {
      if (!val) return;
      const parts = val.split("-").map(Number);
      const newDate = new Date(parts[0], parts[1] - 1, parts[2]);
      newDate.setHours(0, 0, 0, 0);
      if (which === "checkin") {
        setCheckin(newDate);
        setCheckout((co) => {
          const diff =
            (co.getTime() - newDate.getTime()) / (1000 * 60 * 60 * 24);
          if (diff < 1) return addDays(newDate, 1);
          return co;
        });
      } else {
        setCheckout((co) => {
          const diff =
            (newDate.getTime() - checkin.getTime()) /
            (1000 * 60 * 60 * 24);
          if (diff < 1) return co;
          return newDate;
        });
      }
    },
    [checkin],
  );

  const applyScenario = useCallback((name: string) => {
    switch (name) {
      case "default":
        setCheckin(addDays(TODAY, 15));
        setCheckout(addDays(TODAY, 16));
        break;
      case "longstay":
        setCheckin(addDays(TODAY, 4));
        setCheckout(addDays(TODAY, 9));
        break;
      case "earlybird":
        setCheckin(addDays(TODAY, 45));
        setCheckout(addDays(TODAY, 46));
        break;
      case "lastminute":
        setCheckin(new Date(TODAY));
        setCheckout(addDays(TODAY, 1));
        break;
    }
  }, []);

  const switchState = useCallback((state: TierKey) => {
    setCurrentState(state);
    setClaimedUpgrades({});
    setBeyondStep("closed");
  }, []);

  const bookDirect = useCallback(() => {
    alert(
      "→ Proceeding without Beyond (7% direct discount)\n\nIn production: routes to checkout with 7% direct discount applied.",
    );
  }, []);

  const bookNow = useCallback(() => {
    alert(
      "→ Proceeding to checkout\n\nIn production: routes to payment with your Beyond member discount applied.",
    );
  }, []);

  const openInclPopup = useCallback((roomKey: string) => {
    setInclKey(roomKey);
  }, []);

  const closeInclPopup = useCallback(() => setInclKey(null), []);

  const completeBeyondFlow = useCallback(() => {
    setBeyondStep("closed");
    setCurrentState("bronze");
    setClaimedUpgrades({});
  }, []);

  const tierPillResolved =
    currentState === "guest" ? null : (
      <span className={`tier-pill tier-${currentState}`}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
        </svg>
        {TIERS[currentState].label}
      </span>
    );

  return (
    <>
      {process.env.NODE_ENV !== "production" ? (
        <DevStateSwitcher
          currentState={currentState}
          onStateChange={switchState}
          onScenario={applyScenario}
        />
      ) : null}

      <div className="app">
        <DesktopNav tierPill={tierPillResolved} scrollToSection={scrollToSection} />

        <TopChrome tierPill={tierPillResolved} currentState={currentState} />

        <HotelHeaderBlock />

        <SectionTabsRow scrollToSection={scrollToSection} />

        <DateSelectorBlock
          checkin={checkin}
          checkout={checkout}
          onChange={onDateChange}
          variant="mobile"
        />

        <div className="desktop-layout">
          <div className="desktop-main">
            <MiddleStaticSections
              tierCheckinSlot={<TierCheckinRules currentState={currentState} />}
            />

            <BeyondBannerBlock
              currentState={currentState}
              onJoinBeyond={() => {
                setBeyondStep("mobile");
                setPriceOpen(false);
              }}
            />

            <TierPerksBlock currentState={currentState} />

            <div className="rooms" id="rooms-section">
              <div className="section-eyebrow">CHOOSE YOUR ROOM</div>
              <h2 className="section-heading">Room categories</h2>
              <RoomCards
                selections={selections}
                setSelections={setSelections}
                claimedUpgrades={claimedUpgrades}
                setClaimedUpgrades={setClaimedUpgrades}
                currentState={currentState}
                checkin={checkin}
                checkout={checkout}
                openInclPopup={openInclPopup}
              />
            </div>

            {!isDesktop ? <LowerPageSections /> : null}
          </div>

          <aside
            className="desktop-rail"
            id="desktop-rail"
            ref={railRef}
          >
            <div className="rail-date-card">
              <DateSelectorBlock
                checkin={checkin}
                checkout={checkout}
                onChange={onDateChange}
                variant="desktop"
              />
            </div>
          </aside>
        </div>
      </div>

      {isDesktop ? <LowerPageSections /> : null}

      <div ref={priceWrapRef}>
        <PriceBarUI
          priceModel={priceModel}
          priceOpen={priceOpen}
          setPriceOpen={setPriceOpen}
          currentState={currentState}
          lineItems={lineItems}
          bookDirect={bookDirect}
          bookNow={bookNow}
          onOpenBeyondJoin={() => {
            setBeyondStep("mobile");
            setPriceOpen(false);
          }}
          onOpenBeyondPerks={() => {
            setBeyondStep("mobile");
            setPriceOpen(false);
          }}
          sheetActive={sheetActive}
          beyondSheet={
            <BeyondSheetFlow
              step={beyondStep}
              setStep={setBeyondStep}
              lineItems={lineItems}
              bookDirect={bookDirect}
              onFlowComplete={completeBeyondFlow}
              isDev={process.env.NODE_ENV !== "production"}
            />
          }
        />
      </div>

      <InclusionsModal inclKey={inclKey} onClose={() => closeInclPopup()} />
    </>
  );
}
