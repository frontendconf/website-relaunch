import FadeIn from "./FadeIn";
import SponsorCategory from "./SponsorCategory";

export default function Sponsors({ details = false }) {
  return (
    <div className="sponsors">
      {details ? null : (
        <FadeIn>
          <h3 className="sponsors__title">Sponsors</h3>
        </FadeIn>
      )}

      <FadeIn>
        <SponsorCategory category="DIAMOND" details={details} />
      </FadeIn>
      <FadeIn>
        <SponsorCategory category="PLATINUM" details={details} />
      </FadeIn>
      <FadeIn>
        <SponsorCategory category="GOLD" details={details} />
      </FadeIn>
      <FadeIn>
        <SponsorCategory category="SILVER" details={details} />
      </FadeIn>
      {details ? (
        <FadeIn>
          <SponsorCategory category="CONTRIBUTING" details={details} />
        </FadeIn>
      ) : null}
    </div>
  );
}
