import Link from "next/link";
import { Container, Row, Col } from "./shared/Grid";

export default function Hero(props) {
  return (
    <div className={props.template ? `hero hero--${props.template}` : "hero"}>
      <Container className="hero__container">
        <Row className="hero__container">
          <Col className="hero__col xs-12 md-9">
            <div className="hero__inner">
              <h1 className="hero__title">{props.title}</h1>
              {props.subTitle ? (
                <h2 className="hero__subtitle">{props.subTitle}</h2>
              ) : null}
              {props.lead && <p className="hero__lead">{props.lead}</p>}
            </div>

            {props.ctas ? (
              <div className="hero__ctas">
                {props.ctas.map((cta, key) => {
                  return (
                    <Link
                      href={{ pathname: "/", query: { slug: cta.slug } }}
                      as={`/${cta.slug}`}
                      key={key}
                    >
                      <a className="hero__cta">{cta.ctaText}</a>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
