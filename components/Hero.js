import Link from "next/link";
import FadeIn from "./FadeIn";
import { Container, Row, Col } from "./shared/Grid";

export default function Hero(props) {
  return (
    <div className={props.template ? `hero hero--${props.template}` : "hero"}>
      <Container className="hero__container">
        <Row className="hero__container">
          <Col className="hero__col xs-12 md-11 lg-10 xxl-9">
            <div className="hero__inner">
              <FadeIn style={{ display: "block" }}>
                <h1 className="hero__title">{props.title}</h1>
                {props.subTitle ? (
                  <h2 className="hero__subtitle">{props.subTitle}</h2>
                ) : null}
              </FadeIn>
              <FadeIn style={{ display: "block" }} delay={150}>
                {props.lead && <p className="hero__lead">{props.lead}</p>}
              </FadeIn>
            </div>

            {props.ctas && (
              <div className="hero__ctas-wrapper">
                <FadeIn style={{ display: "block" }} delay={300}>
                  <div className="hero__ctas">
                    {props.ctas.map((cta, i) => {
                      return (
                        <Link
                          href={{ pathname: "/", query: { slug: cta.slug } }}
                          as={`/${cta.slug}`}
                          key={i}
                        >
                          <a className="hero__cta">{cta.ctaText}</a>
                        </Link>
                      );
                    })}
                  </div>
                </FadeIn>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
