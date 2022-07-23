import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { Row, Col } from "./shared/Grid";
import FadeIn from "./FadeIn";
import Image from "./Image";

const ImageTeaser = ({ teaser }) => (
  <Row>
    <Col className="xs-12 rg-6">
      <FadeIn style={{ display: "block" }}>
        <div className="teasers__image-wrapper">
          <Image
            className="teasers__image"
            src={`${teaser.photo.url}&w=1000&h=1000`}
            srcSet={`
              ${teaser.photo.url}&w=300&h=300 300w,
              ${teaser.photo.url}&w=400&h=400 400w,
              ${teaser.photo.url}&w=600&h=600 600w,
              ${teaser.photo.url}&w=800&h=800 800w,
              ${teaser.photo.url}&w=1000&h=1000 1000w,
              ${teaser.photo.url}&w=1200&h=1200 1200w
            `}
            sizes={`
              (min-width: 1680px) 625px,
              (min-width: 600px) 45vw,
              95vw
            `}
          />
        </div>
      </FadeIn>
    </Col>
    <Col className="xs-12 rg-5 offset-rg-1">
      <FadeIn delay={150} style={{ alignItems: "center", height: "100%" }}>
        <div className="markdown-wrapper">
          <Markdown options={{ forceBlock: true }}>{teaser.body}</Markdown>
          {teaser.link.slug ? (
            <Link
              href={{
                pathname: "/",
                query: { slug: teaser.link.slug }
              }}
              as={`/${teaser.link.slug}`}
            >
              <a className="special-link">
                <span className="special-link__text">
                  {teaser.ctaLabel || teaser.link.title || "Read more"}
                </span>
              </a>
            </Link>
          ) : null}
        </div>
      </FadeIn>
    </Col>
  </Row>
);

export default function Teasers({ teasers }) {
  return (
    <div className={`teasers`}>
      <Row>
        <Col className="xs-12">
          {teasers.map((teaserItem, i) => (
            <>
              {teaserItem.title ? (
                <FadeIn>
                  <h2 className="teasers__title">{teaserItem.title}</h2>
                </FadeIn>
              ) : null}
              <div className={`teasers__item ${i % 2 ? "teasers__odd" : ""}`}>
                <ImageTeaser teaser={teaserItem} />
              </div>
            </>
          ))}
        </Col>
      </Row>
    </div>
  );
}
