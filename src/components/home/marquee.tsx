import { marqueeItems } from "@/data/site";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee" aria-label="Áreas de atuação">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="marquee-item"
            aria-hidden={index >= marqueeItems.length}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
