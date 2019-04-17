import Link from "next/link";
import FadeIn from "./FadeIn";
import { Container, Row, Col } from "./shared/Grid";
import React, { Component } from "react";

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0,
      title: props.title
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.myRef.current.querySelectorAll("h1").forEach(item => {
      item.remove();
    });
    const newEl = document.createElement("h1");
    newEl.className = "hero__title";
    newEl.innerHTML = this.props.title;
    this.myRef.current.appendChild(newEl);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.title !== this.state.title) {
      // Store title for comparison to detect navigation to the current page
      this.setState({ title: nextProps.title });

      // Flag old title to move out
      const currentTitle = this.myRef.current.querySelector("h1");
      currentTitle.classList.add("hero__title--out");

      // In some situations an additional element is rendered, remove all but the old one
      this.myRef.current
        .querySelectorAll("h1:not(.hero__title--out)")
        .forEach(item => {
          item.remove();
        });

      // Add the new title
      const newEl = document.createElement("h1");
      newEl.className = "hero__title";
      newEl.innerHTML = nextProps.title;
      this.myRef.current.appendChild(newEl);

      // Remove old title
      setTimeout(() => {
        currentTitle.remove();
      }, 1000);
    }
  }

  render() {
    return (
      <div
        className={
          this.props.template ? `hero hero--${this.props.template}` : "hero"
        }
      >
        <Container className="hero__container">
          <Row className="hero__container">
            <Col className="hero__col xs-12 md-11 lg-10 xxl-9">
              <div className="hero__inner">
                <FadeIn style={{ display: "block" }}>
                  <div className="hero__title-wrapper" ref={this.myRef} />
                  {this.props.subTitle ? (
                    <h2 className="hero__subtitle">{this.props.subTitle}</h2>
                  ) : null}
                </FadeIn>
                <FadeIn style={{ display: "block" }} delay={150}>
                  {this.props.lead && (
                    <p className="hero__lead">{this.props.lead}</p>
                  )}
                </FadeIn>
              </div>

              {this.props.ctas && (
                <div className="hero__ctas-wrapper">
                  <FadeIn style={{ display: "block" }} delay={300}>
                    <div className="hero__ctas">
                      {this.props.ctas.map((cta, i) => {
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
}

export default Hero;
