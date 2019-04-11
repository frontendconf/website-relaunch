import FadeIn from "./FadeIn";
import SponsorCategory from "./SponsorCategory";

export default function Sponsors() {
  return (
    <div className="sponsors">
      <FadeIn>
        <h3 className="sponsors__title">Sponsors</h3>
      </FadeIn>

      <FadeIn>
        <SponsorCategory category="DIAMOND" filterTag="" />
      </FadeIn>
      <FadeIn>
        <SponsorCategory category="PLATINUM" filterTag="" />
      </FadeIn>
      <FadeIn>
        <SponsorCategory category="GOLD" filterTag="" />
      </FadeIn>
      <FadeIn>
        <SponsorCategory category="SILVER" filterTag="" />
      </FadeIn>
    </div>
  );
}
