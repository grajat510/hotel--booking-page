"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 24 hours before check-in. Within 24 hours, a one-night charge applies. No-shows forfeit the full booking. Refunds process in 5–7 business days.",
  },
  {
    q: "Is breakfast included?",
    a: "Vibe Check and Hype Beyond members can add breakfast at ₹200 per person. Cult Fav and G.O.A.T members enjoy complimentary breakfast for two. Non-Beyond guests pay ₹250 per person.",
  },
  {
    q: "What is the Beyond loyalty program?",
    a: "Beyond is Saltstayz's free loyalty program with four tiers — Vibe Check, Hype, Cult Fav, and G.O.A.T. Members unlock room discounts, F&B cashback, free upgrades, priority check-in/check-out, and complimentary breakfast at higher tiers.",
  },
  {
    q: "Can I get early check-in or late check-out?",
    a: "Cult Fav and G.O.A.T Beyond members enjoy priority early check-in (from 12 PM) and late check-out (until 2 PM), subject to availability. Hype members get priority late check-out only. Other guests can request these for a small fee.",
  },
  {
    q: "Are unmarried couples welcome?",
    a: "Yes, absolutely. We welcome all guests with a valid government-issued photo ID at check-in. Both guests must carry ID.",
  },
  {
    q: "Can children stay in the room?",
    a: "Children under 12 stay free when using existing bedding. Extra bed available at ₹800/night. Children's meals are available at the restaurant.",
  },
  {
    q: "Is parking available?",
    a: "Complimentary self-parking is available for all guests. Valet parking is available on request at no additional charge.",
  },
  {
    q: "How do I redeem my F&B cashback?",
    a: "F&B cashback is credited to your Beyond account after checkout and can be redeemed on food and beverage purchases during any future stay at any Saltstayz property. Cashback never expires.",
  },
];

function FaqBlock() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="faq-section" id="faq-section">
      <div className="section-eyebrow">FREQUENTLY ASKED</div>
      <h2 className="section-heading">Common questions</h2>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className={`faq-item${openIdx === idx ? " open" : ""}`}
          >
            <button
              type="button"
              className="faq-q"
              onClick={() =>
                setOpenIdx(openIdx === idx ? null : idx)
              }
            >
              <span>{item.q}</span>
              <svg
                className="faq-chev"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LowerPageSections() {
  return (
    <>
      <FaqBlock />
      <div className="more-props-section">
        <div className="section-eyebrow">EXPLORE MORE</div>
        <h2 className="section-heading">More Saltstayz in Gurgaon</h2>
        <div className="props-scroll">
          <a className="prop-card">
            <div className="prop-img-wrap">
              <img
                className="prop-img"
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=75"
                alt="Saltstayz Premier Cyber City"
              />
              <span className="prop-tier-badge premier">PREMIER</span>
            </div>
            <div className="prop-body">
              <div className="prop-name">Saltstayz Premier</div>
              <div className="prop-loc">Cyber City · 6 km away</div>
              <div className="prop-rating">
                <span className="prop-rating-val">★ 4.8</span> · 428 reviews
              </div>
              <div className="prop-price">
                ₹4,200 <span className="night">/night</span>
              </div>
            </div>
          </a>
          <a className="prop-card">
            <div className="prop-img-wrap">
              <img
                className="prop-img"
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=75"
                alt="Saltstayz Autograph MG Road"
              />
              <span className="prop-tier-badge autograph">AUTOGRAPH</span>
            </div>
            <div className="prop-body">
              <div className="prop-name">Saltstayz Autograph</div>
              <div className="prop-loc">MG Road · 4 km away</div>
              <div className="prop-rating">
                <span className="prop-rating-val">★ 4.7</span> · 381 reviews
              </div>
              <div className="prop-price">
                ₹5,800 <span className="night">/night</span>
              </div>
            </div>
          </a>
          <a className="prop-card">
            <div className="prop-img-wrap">
              <img
                className="prop-img"
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=75"
                alt="Saltstayz Premier Sohna Road"
              />
              <span className="prop-tier-badge premier">PREMIER</span>
            </div>
            <div className="prop-body">
              <div className="prop-name">Saltstayz Premier</div>
              <div className="prop-loc">Sohna Road · 9 km away</div>
              <div className="prop-rating">
                <span className="prop-rating-val">★ 4.6</span> · 312 reviews
              </div>
              <div className="prop-price">
                ₹3,900 <span className="night">/night</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="footer seo-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col footer-col-brand">
              <div className="footer-logo">
                Salt<em>stayz</em>
              </div>
              <div className="footer-tag">
                Mid-premium hospitality across 31 hotels in India — built for
                business, leisure & celebrations.
              </div>
              <div className="footer-social">
                <a aria-label="Instagram" className="footer-social-link">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a aria-label="Facebook" className="footer-social-link">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a aria-label="LinkedIn" className="footer-social-link">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a aria-label="YouTube" className="footer-social-link">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-heading">Hotels by city</div>
              <ul className="footer-links-list">
                <li>
                  <a>Hotels in Gurgaon</a>
                </li>
                <li>
                  <a>Hotels in Delhi</a>
                </li>
                <li>
                  <a>Hotels in Mumbai</a>
                </li>
                <li>
                  <a>Hotels in Bengaluru</a>
                </li>
                <li>
                  <a>Hotels in Pune</a>
                </li>
                <li>
                  <a>Hotels in Jaipur</a>
                </li>
                <li>
                  <a>Hotels in Goa</a>
                </li>
                <li>
                  <a>Hotels in Hyderabad</a>
                </li>
                <li>
                  <a>Hotels in Chennai</a>
                </li>
                <li>
                  <a>Hotels in Kolkata</a>
                </li>
                <li>
                  <a>View all cities →</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <div className="footer-heading">Gurgaon by area</div>
              <ul className="footer-links-list">
                <li>
                  <a>Golf Course Road</a>
                </li>
                <li>
                  <a>Cyber City</a>
                </li>
                <li>
                  <a>MG Road</a>
                </li>
                <li>
                  <a>Sohna Road</a>
                </li>
                <li>
                  <a>Sector 29</a>
                </li>
                <li>
                  <a>Udyog Vihar</a>
                </li>
                <li>
                  <a>DLF Phase 1</a>
                </li>
                <li>
                  <a>Sushant Lok</a>
                </li>
              </ul>
              <div className="footer-heading" style={{ marginTop: 22 }}>
                Our brands
              </div>
              <ul className="footer-links-list">
                <li>
                  <a>Saltstayz Autograph</a>
                </li>
                <li>
                  <a>Saltstayz Premier</a>
                </li>
                <li>
                  <a>Saltstayz Signature</a>
                </li>
                <li>
                  <a>Saltstayz Select</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <div className="footer-heading">Experiences</div>
              <ul className="footer-links-list">
                <li>
                  <a>Business travel</a>
                </li>
                <li>
                  <a>Weekend getaways</a>
                </li>
                <li>
                  <a>Wedding venues</a>
                </li>
                <li>
                  <a>Banquet halls</a>
                </li>
                <li>
                  <a>Corporate offsites</a>
                </li>
                <li>
                  <a>Restaurants & bars</a>
                </li>
                <li>
                  <a>Spa & wellness</a>
                </li>
                <li>
                  <a>Group bookings</a>
                </li>
              </ul>
              <div className="footer-heading" style={{ marginTop: 22 }}>
                Beyond <em>loyalty</em>
              </div>
              <ul className="footer-links-list">
                <li>
                  <a>Join Beyond — it&apos;s free</a>
                </li>
                <li>
                  <a>Member benefits</a>
                </li>
                <li>
                  <a>Tier structure</a>
                </li>
                <li>
                  <a>F&B cashback</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <div className="footer-heading">Company</div>
              <ul className="footer-links-list">
                <li>
                  <a>About Saltstayz</a>
                </li>
                <li>
                  <a>Careers</a>
                </li>
                <li>
                  <a>Press</a>
                </li>
                <li>
                  <a>Partner with us</a>
                </li>
                <li>
                  <a>List your property</a>
                </li>
                <li>
                  <a>Media & investors</a>
                </li>
                <li>
                  <a>Sustainability</a>
                </li>
              </ul>
              <div className="footer-heading" style={{ marginTop: 22 }}>
                Help
              </div>
              <ul className="footer-links-list">
                <li>
                  <a>Contact us</a>
                </li>
                <li>
                  <a>FAQs</a>
                </li>
                <li>
                  <a>Cancellation policy</a>
                </li>
                <li>
                  <a>Booking support</a>
                </li>
                <li>
                  <a>Corporate enquiry</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-seo-text">
            <strong>Saltstayz Autograph, Golf Course Road, Gurgaon</strong> is a
            premium business hotel in the heart of Gurgaon&apos;s financial
            district, offering well-appointed rooms, a rooftop pool, fully
            equipped gym, on-site restaurants, and flexible banquet spaces for
            corporate events and weddings. Located minutes from Cyber City,
            Ambience Mall, and major corporate offices, with IGI Airport under
            40 minutes away. Our Beyond loyalty program rewards direct bookings
            with discounts up to 15%, complimentary breakfast, F&B cashback,
            priority check-in/check-out, and complimentary room upgrades across
            all Saltstayz properties.
          </div>

          <div className="footer-bottom">
            <div className="footer-legal-links">
              <a>Privacy policy</a>
              <span className="footer-sep">·</span>
              <a>Terms of service</a>
              <span className="footer-sep">·</span>
              <a>Cookie policy</a>
              <span className="footer-sep">·</span>
              <a>Accessibility</a>
              <span className="footer-sep">·</span>
              <a>Sitemap</a>
            </div>
            <div className="footer-copyright">
              © 2026 Saltstayz Hospitality Pvt. Ltd. · All rights reserved ·
              CIN: U55101DL2018PTC000001
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
