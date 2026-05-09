"use client";

type Props = { scrollToSection: (id: string) => void };

export function SectionTabsRow({ scrollToSection }: Props) {
  const tabs: { id: string; label: string }[] = [
    { id: "photos-section", label: "Photos" },
    { id: "amenities-section", label: "Amenities" },
    { id: "rooms-section", label: "Rooms" },
    { id: "reviews-section", label: "Reviews" },
    { id: "location-section", label: "Location" },
    { id: "why-book-direct-section", label: "Why book direct" },
    { id: "rules-section", label: "Hotel rules" },
  ];
  return (
    <div className="section-tabs">
      <div className="section-tabs-inner">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="section-tab"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(t.id);
            }}
          >
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}
