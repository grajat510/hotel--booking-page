"use client";

import { useEffect } from "react";
import { INCLUSIONS_POPUP_DATA } from "@/lib/booking-data";

type Props = {
  inclKey: string | null;
  onClose: (e?: React.MouseEvent) => void;
};

export function InclusionsModal({ inclKey, onClose }: Props) {
  const open = inclKey !== null;
  const data = inclKey
    ? INCLUSIONS_POPUP_DATA[inclKey] || INCLUSIONS_POPUP_DATA.classic
    : null;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`incl-popup-overlay${open ? " open" : ""}`}
      id="incl-popup-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(e);
      }}
    >
      <div className="incl-popup" id="incl-popup" role="dialog">
        <div className="incl-popup-handle" />
        <div className="incl-popup-head">
          <span className="incl-popup-title" id="incl-popup-title">
            {data?.title ?? "Room Inclusions"}
          </span>
          <button
            type="button"
            className="incl-popup-close"
            onClick={() => onClose()}
          >
            ✕
          </button>
        </div>
        <div className="incl-popup-list" id="incl-popup-list">
          {data?.items.map((item, i) => (
            <div key={i} className="incl-popup-item">
              <div className="incl-popup-icon">{item.icon}</div>
              <div>
                <div className="incl-popup-text">{item.label}</div>
                <div className="incl-popup-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
