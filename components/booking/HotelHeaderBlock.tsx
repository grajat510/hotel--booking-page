"use client";

export function HotelHeaderBlock() {
  return (
    <div className="hotel-header">
      <div className="hotel-header-inner">
        <div className="hotel-header-left">
          <div className="breadcrumbs">
            <a>Home</a>
            <span className="sep">›</span>
            <a>Destinations</a>
            <span className="sep">›</span>
            <a>Gurgaon</a>
            <span className="sep">›</span>
            <span className="current">Golf Course Road</span>
          </div>
          <div className="hotel-badges">
            <span className="autograph-badge">AUTOGRAPH</span>
            <span className="location-text">Golf Course Road, Gurgaon</span>
          </div>
          <h1 className="hotel-name">
            Saltstayz <em>Autograph</em>
          </h1>
          <div className="hotel-meta">
            <span className="rating-stars">★ 4.9</span>
            <span className="rating-meta">· 642 reviews · Exceptional</span>
          </div>
        </div>
      </div>
    </div>
  );
}
