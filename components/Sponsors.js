import FadeIn from "./FadeIn";
import SponsorCategory from "./SponsorCategory";

export default function Sponsors({ details = false }) {
  return (
    <div className={`sponsors ${details ? "sponsors--detail" : ""}`}>
      {details ? null : (
        <FadeIn>
          <h3 className="sponsors__title">Sponsors</h3>
        </FadeIn>
      )}

      <SponsorCategory category="PRESENTING SPONSOR" details={details} />
      <SponsorCategory category="DIAMOND" details={details} />
      <SponsorCategory category="PLATINUM" details={details} />
      <SponsorCategory category="GOLD" details={details} />
      <SponsorCategory category="SILVER" details={details} />
      <SponsorCategory category="CONTRIBUTING" details={details} />
    </div>
  );
}
