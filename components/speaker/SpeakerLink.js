// TODO: Rename back to Speaker.js
import Link from "next/link";
import { withRouter } from "next/router";
import Head from "next/head";
import PropTypes from "prop-types";
import Image from "../Image";
import Socials from "../Socials";

export const SpeakerImage = ({ speaker, isMain }) => {
  // FIXME: find out why sometimes speaker.photo does not exist and the page reloads. Caching?
  return speaker.photo ? (
    <div className="speaker__image-wrapper">
      {isMain ? (
        <Head>
          <meta property="og:image" content={speaker.photo.url} />
        </Head>
      ) : null}
      <Image
        className="speaker__image"
        src={`${speaker.photo.url}&w=295&h=395`}
        srcSet={`
          ${speaker.photo.url}&w=200&h=269 200w,
          ${speaker.photo.url}&w=300&h=403 300w,
          ${speaker.photo.url}&w=400&h=538 400w,
          ${speaker.photo.url}&w=500&h=673 500w,
          ${speaker.photo.url}&w=600&h=807 600w
        `}
        // TODO: Set more acccurate sizes
        sizes={`(min-width: 600px) 290px, 40vw`}
        alt={speaker.name}
      />
    </div>
  ) : null;
};

export const SpeakerSocials = ({ speaker }) => {
  const socialItems = [];

  if (speaker.twitter) {
    socialItems.push({
      url: `https://twitter.com/${speaker.twitter}`,
      icon: "twitter",
      a11y: speaker.name + " Twitter profile"
    });
  }

  if (speaker.linkedin) {
    socialItems.push({
      url: `https://linkedin.com/${speaker.linkedin}`,
      icon: "linkedin",
      a11y: speaker.name + " Linkedin profile"
    });
  }

  if (speaker.website) {
    socialItems.push({
      url: speaker.website,
      icon: "website",
      a11y: speaker.name + " Website"
    });
  }
  return <Socials items={socialItems} mobileVertical={true} />;
};

const Speaker = ({
  speaker,
  linked,
  withName,
  withDescription,
  withSocials,
  className,
  isHost
}) => {
  const category = isHost ? "hosts" : "speakers";

  speaker.role = "Role";
  speaker.company = "Company";

  return (
    <div className={`speaker ${className}`}>
      {(linked && speaker.bio && (
        <Link
          href={{
            pathname: "/",
            query: { slug: speaker.slug, category }
          }}
          as={`/${category}/${speaker.slug}`}
        >
          <a className="speaker__link">
            <SpeakerImage speaker={speaker} />
            {withName && <p className="speaker__name">{speaker.name}</p>}
            {withDescription && speaker.description && isHost ? (
              <p className="speaker__description">{speaker.description}</p>
            ) : null}
            {withDescription && !isHost ? (
              <>
                {speaker.company ? (
                  <p className="speaker__company">{speaker.company}</p>
                ) : null}
                {speaker.role ? (
                  <p className="speaker__role">{speaker.role}</p>
                ) : null}
              </>
            ) : null}
          </a>
        </Link>
      )) || (
        <div>
          <SpeakerImage speaker={speaker} />
          {withName && <p className="speaker__name">{speaker.name}</p>}
          {withDescription && speaker.description && isHost ? (
            <p className="speaker__description">{speaker.description}</p>
          ) : null}
          {withDescription && !isHost ? (
            <>
              {speaker.company ? (
                <p className="speaker__company">{speaker.company}</p>
              ) : null}
              {speaker.role ? (
                <p className="speaker__role">{speaker.role}</p>
              ) : null}
            </>
          ) : null}
        </div>
      )}
      {withSocials && <SpeakerSocials speaker={speaker} />}
    </div>
  );
};

Speaker.propTypes = {
  speaker: PropTypes.object,
  className: PropTypes.string,
  linked: PropTypes.bool,
  withName: PropTypes.bool,
  withDescription: PropTypes.bool,
  withSocials: PropTypes.bool
};

// Same approach for defaultProps too
Speaker.defaultProps = {
  className: "",
  linked: true,
  withName: true,
  withDescription: true,
  withSocials: false
};

export default withRouter(Speaker);
