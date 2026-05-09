"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { LineItem } from "@/lib/booking-types";
import { formatINR } from "@/lib/booking-logic";

export type BeyondStep = "closed" | "mobile" | "otp" | "success";

type Props = {
  step: BeyondStep;
  setStep: (s: BeyondStep) => void;
  lineItems: LineItem[];
  bookDirect: () => void;
  onFlowComplete: () => void;
  isDev: boolean;
};

export function BeyondSheetFlow({
  step,
  setStep,
  lineItems,
  bookDirect,
  onFlowComplete,
  isDev,
}: Props) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const [resendSec, setResendSec] = useState(0);
  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const subtotal = lineItems.reduce((s, it) => s + it.subtotal, 0);
  const beyondDisc = Math.min(Math.round(subtotal * 0.25), 1000);

  const clearResend = useCallback(() => {
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
      resendTimerRef.current = null;
    }
  }, []);

  const startResend = useCallback(() => {
    clearResend();
    setResendSec(30);
    resendTimerRef.current = setInterval(() => {
      setResendSec((t) => {
        if (t <= 1) {
          clearResend();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [clearResend]);

  useEffect(() => {
    return () => clearResend();
  }, [clearResend]);

  useEffect(() => {
    if (step === "otp") startResend();
    else clearResend();
  }, [step, startResend, clearResend]);

  useEffect(() => {
    if (step !== "success") return;
    const t = setTimeout(() => {
      onFlowComplete();
    }, 1800);
    return () => clearTimeout(t);
  }, [step, onFlowComplete]);

  const validateMobileInput = (v: string) =>
    v.replace(/\D/g, "").slice(0, 10);

  const submitMobile = () => {
    if (mobile.length !== 10) return;
    setOtp(["", "", "", "", "", ""]);
    setOtpError(false);
    setStep("otp");
  };

  const submitOtp = () => {
    const code = otp.join("");
    if (code === "123456") {
      setOtpError(false);
      setStep("success");
    } else {
      setOtpError(true);
      setOtp(["", "", "", "", "", ""]);
    }
  };

  const resendOtp = () => {
    if (resendSec > 0) return;
    setOtp(["", "", "", "", "", ""]);
    setOtpError(false);
    startResend();
  };

  const skipBeyond = () => {
    setStep("closed");
    setMobile("");
    setOtp(["", "", "", "", "", ""]);
    bookDirect();
  };

  if (step === "closed") return null;

  if (step === "mobile") {
    return (
      <div className="beyond-sheet">
        <div className="beyond-sheet-head">
          <div>
            <div className="beyond-sheet-title">
              Join <em>Beyond</em> — it&apos;s free
            </div>
            <div className="beyond-sheet-sub">
              Enter your mobile to unlock your savings on this booking
            </div>
          </div>
          <button
            type="button"
            className="beyond-sheet-close"
            aria-label="Close"
            onClick={() => setStep("closed")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="beyond-benefit-row">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ color: "var(--ss-gold-deep)", flexShrink: 0 }}
          >
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
          </svg>
          You save <strong>{formatINR(beyondDisc)}</strong> on this booking +
          3% F&B cashback
        </div>

        <div className="beyond-input-group">
          <label className="beyond-input-label">MOBILE NUMBER</label>
          <div className="mobile-input-row">
            <div className="country-prefix">
              <span>🇮🇳</span> +91
            </div>
            <input
              type="tel"
              className="mobile-input"
              id="beyond-mobile-input"
              placeholder="10-digit mobile number"
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              value={mobile}
              onChange={(e) =>
                setMobile(validateMobileInput(e.target.value))
              }
            />
          </div>
        </div>

        <div className="beyond-action-row">
          <button
            type="button"
            className="beyond-submit-btn"
            id="beyond-mobile-submit"
            disabled={mobile.length !== 10}
            onClick={submitMobile}
          >
            Send OTP
          </button>
          <button type="button" className="beyond-skip-btn" onClick={skipBeyond}>
            Skip, book with 7% off
          </button>
        </div>
      </div>
    );
  }

  if (step === "otp") {
    const resendDisabled = resendSec > 0;
    const resendLabel = resendDisabled
      ? `Resend in ${resendSec}s`
      : "Resend OTP";
    const full = otp.every((d) => d.length === 1);

    const setDigit = (i: number, v: string) => {
      const d = v.replace(/\D/g, "").slice(-1);
      const next = [...otp];
      next[i] = d;
      setOtp(next);
      if (d && i < 5) {
        document.getElementById(`otp-${i + 1}`)?.focus();
      }
    };

    return (
      <div className="beyond-sheet">
        <div className="beyond-sheet-head">
          <div>
            <div className="beyond-sheet-title">Verify your number</div>
            <div className="beyond-sheet-sub">
              We sent a 6-digit code to your mobile
            </div>
          </div>
          <button
            type="button"
            className="beyond-sheet-close"
            aria-label="Close"
            onClick={() => setStep("closed")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="beyond-input-group">
          <div className="otp-row" id="otp-row">
            {otp.map((dig, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                className={`otp-box${dig ? " filled" : ""}`}
                value={dig}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    !otp[i] &&
                    i > 0
                  ) {
                    const prev = document.getElementById(
                      `otp-${i - 1}`,
                    ) as HTMLInputElement | null;
                    if (prev) {
                      prev.focus();
                      const n = [...otp];
                      n[i - 1] = "";
                      setOtp(n);
                    }
                  }
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const text = e.clipboardData
                    .getData("text")
                    .replace(/\D/g, "")
                    .slice(0, 6);
                  const boxes = text.split("");
                  const n = ["", "", "", "", "", ""];
                  boxes.forEach((ch, j) => {
                    if (j < 6) n[j] = ch;
                  });
                  setOtp(n);
                  document.getElementById(`otp-${Math.min(text.length, 5)}`)?.focus();
                }}
              />
            ))}
          </div>
          <div className="otp-meta">
            <span className="otp-mobile-display">
              OTP sent to <strong>+91 {mobile}</strong>{" "}
              <button
                type="button"
                className="otp-edit-link"
                onClick={() => {
                  setStep("mobile");
                  setOtp(["", "", "", "", "", ""]);
                }}
              >
                Change
              </button>
            </span>
            <button
              type="button"
              className="otp-resend-link"
              id="otp-resend-btn"
              disabled={resendDisabled}
              onClick={resendOtp}
            >
              {resendLabel}
            </button>
          </div>
          <div className={`otp-error${otpError ? " show" : ""}`} id="otp-error">
            Invalid OTP. Please try again.
          </div>
        </div>

        <div className="beyond-action-row">
          <button
            type="button"
            className="beyond-submit-btn"
            id="beyond-otp-submit"
            disabled={!full}
            onClick={submitOtp}
          >
            Verify & continue
          </button>
          <button type="button" className="beyond-skip-btn" onClick={skipBeyond}>
            Skip
          </button>
        </div>
        {isDev ? (
          <div
            style={{
              fontSize: 10,
              color: "#9a7820",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            💡 Dev hint: enter <strong>123456</strong> to verify, any other 6
            digits to see error
          </div>
        ) : null}
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="beyond-sheet">
        <div className="beyond-success">
          <div className="beyond-success-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="beyond-success-title">
            Welcome to <em>Beyond Vibe Check</em>
          </div>
          <div className="beyond-success-sub">
            Your savings have been applied to this booking
          </div>
        </div>
        <button
          type="button"
          className="beyond-submit-btn"
          style={{ width: "100%" }}
          onClick={onFlowComplete}
        >
          Continue to payment
        </button>
      </div>
    );
  }

  return null;
}
