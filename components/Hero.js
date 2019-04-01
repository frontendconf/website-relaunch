import Link from "next/link";
import { Container, Row, Col } from './shared/Grid';

export default function Hero(props) {
  return (
    <div className="hero">
      <Container className="hero__container">
        <Row className="hero__container">
          <Col className="hero__col xs-12 md-9">
            <div className="hero__inner">
              <h1 className="hero__title">{props.title}</h1>
              {props.subTitle ? <h2 className="hero__subtitle">{props.subTitle}</h2> : null}
            </div>

            {/* TODO: make not static */}
            <div className="hero__ctas">
              <a className="hero__cta" href="#">Call for Speakers</a>
              <a className="hero__cta" href="#">Become a Sponsor</a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}