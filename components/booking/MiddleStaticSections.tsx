"use client";

import type { ReactNode } from "react";

type Props = { tierCheckinSlot: ReactNode };

export function MiddleStaticSections({ tierCheckinSlot }: Props) {
  return (
    <>
      <div className="photo-gallery" id="photos-section">
        <div
          className="photo photo-main"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=75')",
          }}
        >
          <span className="photo-badge">NEW PROPERTY</span>
        </div>
        <div
          className="photo"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=75')",
          }}
        />
        <div
          className="photo photo-more"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=75')",
          }}
        >
          <div className="photo-more-content">
            <div className="photo-more-num">+14</div>
            <div className="photo-more-label">View all</div>
          </div>
        </div>
      </div>

      <div className="amenities" id="amenities-section">
        <div className="section-eyebrow">WHAT&apos;S AVAILABLE</div>
        <div className="amenities-grid">
          <div className="amenity-chip">
            <span className="amenity-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <circle cx="12" cy="20" r="1" fill="currentColor" />
              </svg>
            </span>
            High-speed WiFi
          </div>
          <div className="amenity-chip">
            <span className="amenity-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 16c3 0 3-2 6-2s3 2 6 2 3-2 6-2" />
                <path d="M2 21c3 0 3-2 6-2s3 2 6 2 3-2 6-2" />
                <circle cx="12" cy="7" r="3" />
                <path d="M5 11v-1a7 7 0 0 1 14 0v1" />
              </svg>
            </span>
            Rooftop pool
          </div>
          <div className="amenity-chip">
            <span className="amenity-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 4v16M18 4v16M6 8h12M6 16h12M2 12h2M20 12h2" />
              </svg>
            </span>
            Fully equipped gym
          </div>
          <div className="amenity-chip">
            <span className="amenity-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9" />
                <path d="M14 9h4a2 2 0 0 1 2 2v5" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
                <path d="M9 18h6" />
              </svg>
            </span>
            Complimentary parking
          </div>
        </div>
        <div className="amenities-more">+ 11 more amenities</div>
      </div>

      <div className="why-direct" id="why-book-direct-section">
        <div className="why-direct-eyebrow">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span>BOOK SMARTER</span>
        </div>
        <h2 className="section-heading" style={{ marginBottom: 12 }}>
          Why book direct?
        </h2>
        <div className="compare-table">
          <div className="compare-row header">
            <div className="compare-header-label">Benefit</div>
            <div className="compare-direct">Direct ✓</div>
            <div
              className="compare-header-label"
              style={{ textAlign: "center" }}
            >
              OTA
            </div>
          </div>
          <div className="compare-row">
            <div className="compare-label">Best price guarantee</div>
            <div className="compare-direct">
              <span className="tick">✓</span>
            </div>
            <div className="compare-ota">
              <span className="cross">✗</span>
            </div>
          </div>
          <div className="compare-row">
            <div className="compare-label">Complimentary breakfast</div>
            <div className="compare-direct">
              <span className="tick">✓</span>
            </div>
            <div className="compare-ota">
              <span className="cross">✗</span>
            </div>
          </div>
          <div className="compare-row">
            <div className="compare-label">F&B cashback</div>
            <div className="compare-direct">
              <span className="tick">✓</span>
            </div>
            <div className="compare-ota">
              <span className="cross">✗</span>
            </div>
          </div>
          <div className="compare-row">
            <div className="compare-label">Free cancellation</div>
            <div className="compare-direct">
              <span className="tick">✓</span>
            </div>
            <div className="compare-ota">Up to 20% fee</div>
          </div>
          <div className="compare-row">
            <div className="compare-label">OTA service fee</div>
            <div className="compare-direct">None</div>
            <div className="compare-ota">12–18%</div>
          </div>
        </div>
      </div>

      <div className="reviews" id="reviews-section">
        <div className="section-eyebrow">GUEST EXPERIENCES</div>
        <h2 className="section-heading">Reviews</h2>
        <div className="review-summary">
          <div className="review-score">
            <div className="review-num">4.9</div>
            <div className="review-stars">★★★★★</div>
            <div className="review-count">642 reviews</div>
          </div>
          <div className="review-bars">
            <div className="review-bar-row">
              <span>Service</span>
              <div className="review-bar">
                <div className="review-bar-fill" style={{ width: "98%" }} />
              </div>
              <span>4.9</span>
            </div>
            <div className="review-bar-row">
              <span>Cleanliness</span>
              <div className="review-bar">
                <div className="review-bar-fill" style={{ width: "96%" }} />
              </div>
              <span>4.8</span>
            </div>
            <div className="review-bar-row">
              <span>Location</span>
              <div className="review-bar">
                <div className="review-bar-fill" style={{ width: "94%" }} />
              </div>
              <span>4.7</span>
            </div>
            <div className="review-bar-row">
              <span>Value</span>
              <div className="review-bar">
                <div className="review-bar-fill" style={{ width: "92%" }} />
              </div>
              <span>4.6</span>
            </div>
          </div>
        </div>
        <div className="review-card">
          <div className="review-head">
            <div className="reviewer">
              <div className="avatar">AK</div>
              <div>
                <div className="reviewer-name">Arjun Kapoor</div>
                <div className="reviewer-meta">Golf Course Rd · Feb 2026</div>
              </div>
            </div>
            <div className="review-stars-small">★★★★★</div>
          </div>
          <div className="review-text">
            Stunning property on Golf Course Road. The glass facade is
            striking, breakfast was excellent, and the rooftop pool at sunset is
            unreal.
          </div>
        </div>
        <div className="review-card">
          <div className="review-head">
            <div className="reviewer">
              <div
                className="avatar"
                style={{ background: "#FBEAF0", color: "#72243E" }}
              >
                PS
              </div>
              <div>
                <div className="reviewer-name">Priya Sharma</div>
                <div className="reviewer-meta">Anniversary stay · Jan 2026</div>
              </div>
            </div>
            <div className="review-stars-small">★★★★★</div>
          </div>
          <div className="review-text">
            Booked for our anniversary. The team pre-decorated the room and set
            up a private dinner on the terrace. Felt truly special.
          </div>
        </div>
        <button type="button" className="see-all-btn">
          See all 642 reviews
        </button>
      </div>

      <div className="location" id="location-section">
        <div className="section-eyebrow">WHERE WE ARE</div>
        <h2 className="section-heading">Location & nearby</h2>
        <div className="location-address">
          Plot 22, Golf Course Road Extension, Sector 58, Gurgaon
        </div>
        <div className="map-placeholder">
          <svg
            className="map-pin"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="#fff"
            strokeWidth="1.5"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
          </svg>
        </div>
        <div className="nearby-list">
          <div className="nearby-row">
            <div>
              <div className="nearby-name">Golf Course Metro</div>
              <div className="nearby-sub">Yellow Line, DMRC</div>
            </div>
            <div className="nearby-dist">4 min walk</div>
          </div>
          <div className="nearby-row">
            <div>
              <div className="nearby-name">Cyber Hub</div>
              <div className="nearby-sub">DLF Cyber City</div>
            </div>
            <div className="nearby-dist">8 min drive</div>
          </div>
          <div className="nearby-row">
            <div>
              <div className="nearby-name">Ambience Mall</div>
              <div className="nearby-sub">Shopping & dining</div>
            </div>
            <div className="nearby-dist">12 min drive</div>
          </div>
          <div className="nearby-row">
            <div>
              <div className="nearby-name">IGI Airport Terminal 3</div>
              <div className="nearby-sub">International</div>
            </div>
            <div className="nearby-dist">35 min drive</div>
          </div>
          <div className="nearby-row">
            <div>
              <div className="nearby-name">Fortis Hospital</div>
              <div className="nearby-sub">Sector 62, Gurgaon</div>
            </div>
            <div className="nearby-dist">6 min drive</div>
          </div>
        </div>
      </div>

      <div className="rules" id="rules-section">
        <div className="section-eyebrow">GOOD TO KNOW</div>
        <h2 className="section-heading">Hotel rules</h2>
        <details className="rule-item">
          <summary className="rule-summary">
            <span>Check-in & check-out</span>
            <svg
              className="chev"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="rule-content">
            Standard check-in 2 PM · check-out 12 noon · Govt ID mandatory ·
            ₹2,000 refundable deposit at check-in.
            <div id="tier-checkin-rules" style={{ marginTop: 6 }}>
              {tierCheckinSlot}
            </div>
          </div>
        </details>
        <details className="rule-item">
          <summary className="rule-summary">
            <span>Cancellation policy</span>
            <svg
              className="chev"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="rule-content">
            Free cancellation up to 24hrs before check-in. Within 24hrs: 1 night
            charge. No-show: full forfeit. Refunds in 5–7 days.
          </div>
        </details>
        <details className="rule-item">
          <summary className="rule-summary">
            <span>Rules & guest policy</span>
            <svg
              className="chev"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="rule-content">
            Unmarried couples welcome with ID. Non-smoking property. No pets.
            Pool hours 7 AM–10 PM, children must be accompanied. Extra bed
            ₹800/night. Children below 12 stay free.
          </div>
        </details>
      </div>

      <div className="help">
        <div className="help-title">Need help with your booking?</div>
        <div className="help-buttons">
          <button type="button" className="wa-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 3.5A11 11 0 0 0 3.8 17L2 22l5.2-1.7a11 11 0 0 0 13.3-16.8zM12 20a8.3 8.3 0 0 1-4.3-1.2l-.3-.2-3.1 1 1-3-.2-.3A8.3 8.3 0 1 1 12 20zm4.8-6.2c-.3-.1-1.5-.8-1.8-.9s-.4-.1-.6.1c-.2.3-.7.9-.9 1.1s-.3.2-.6.1c-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5-.1-.1-.6-1.3-.8-1.8s-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4z" />
            </svg>
            WhatsApp
          </button>
          <button type="button" className="call-btn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L7.9 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6A2 2 0 0 1 22 16.9z" />
            </svg>
            Call +91 98765 43210
          </button>
        </div>
      </div>
    </>
  );
}
