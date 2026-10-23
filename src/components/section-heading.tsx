import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  id: string;
  number: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
};

export function SectionHeading({
  id,
  number,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="section-head">
      <div className="section-head-main">
        <p className="eyebrow">
          <span className="eyebrow-number">{number}</span>
          <span className="eyebrow-slash">/</span>
          {eyebrow}
        </p>
        <h2 id={id}>{title}</h2>
      </div>
      {description ? <div className="section-desc">{description}</div> : null}
    </Reveal>
  );
}
