import Link from "next/link";
import FadeIn from "./FadeIn";
import { Container, Row, Col } from "./shared/Grid";
import React, { Component } from "react";

// Get index of the node within parent
const getNodeindex = elm => {
  const c = elm.parentNode.children;
  for (let i = 0; i < c.length; i++) if (c[i] == elm) return i;
};

// Check whether the title comes before the old title in the nav
const isReverseAnimation = (title, oldTitle) => {
  const navInfo = {};
  const navList = document.body.querySelector(".nav__list");
  if (!navList) {
    return false;
  }
  const navElements = navList.childNodes;
  navElements.forEach(navEl => {
    navInfo[navEl.childNodes[0].text] = getNodeindex(navEl);
  });
  const titleIndex = title in navInfo ? navInfo[title] : 999;
  const oldTitleIndex = oldTitle in navInfo ? navInfo[oldTitle] : -1;
  return titleIndex < oldTitleIndex;
};

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0,
      title: props.title
    };

    this.myRef = React.createRef();
  }

  scrollDown() {
    if (process.browser) {
      window.scrollBy({
        top: 950,
        left: 0,
        behavior: "smooth"
      });
    }
  }

  scrollHandler() {
    if (!document.querySelector(".hero__scroll")) return;
    if (window.scrollY > 50) {
      document
        .querySelector(".hero__scroll")
        .classList.add("hero__scroll--hidden");
    } else {
      document
        .querySelector(".hero__scroll")
        .classList.remove("hero__scroll--hidden");
    }
  }

  componentDidMount() {
    this.myRef.current.querySelectorAll("h1").forEach(item => {
      item.remove();
    });
    const newEl = document.createElement("h1");
    newEl.className = "hero__title";
    newEl.innerHTML = this.props.title;
    this.myRef.current.appendChild(newEl);

    window.addEventListener("scroll", this.scrollHandler);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.title !== this.state.title) {
      const isReverse = isReverseAnimation(nextProps.title, this.state.title);

      // Store title for comparison to detect navigation to the current page
      this.setState({ title: nextProps.title });

      // Flag old title to move out
      const currentTitle = this.myRef.current.querySelector("h1");
      currentTitle.classList.add("hero__title--out");
      if (isReverse) {
        currentTitle.classList.add("hero__title--out-reverse");
      }

      // In some situations an additional element is rendered, remove all but the old one
      this.myRef.current
        .querySelectorAll("h1:not(.hero__title--out)")
        .forEach(item => {
          item.remove();
        });

      // Add the new title
      const newEl = document.createElement("h1");
      newEl.className = "hero__title";
      if (isReverse) {
        newEl.classList.add("hero__title--in-reverse");
      }
      newEl.innerHTML = nextProps.title;
      this.myRef.current.appendChild(newEl);

      // Remove old title
      setTimeout(() => {
        currentTitle.parentNode.removeChild(currentTitle);
      }, 125);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
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
                <div className="hero__title-wrapper" ref={this.myRef}>
                  <noscript>
                    <h1 className="hero__title">{this.props.title}</h1>
                  </noscript>
                </div>
                {this.props.subTitle ? (
                  <FadeIn
                    key={`${this.props.subTitle}-fadein`}
                    style={{ display: "block" }}
                  >
                    <h2 className="hero__subtitle">{this.props.subTitle}</h2>
                  </FadeIn>
                ) : null}
                {this.props.lead ? (
                  <FadeIn
                    key={`${this.props.lead}-fadein`}
                    style={{ display: "block" }}
                    delay={this.props.subTitle ? 150 : 0}
                  >
                    <p className="hero__lead">{this.props.lead}</p>
                  </FadeIn>
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
        {/* {(this.props.isSpeakersOverview || this.props.isHome) && (
          <div className="hero__scroll">
            <div onClick={this.scrollDown}>
              <div className="mouse">
                <div className="wheel"></div>
              </div>
            </div>
          </div>
        )} */}
        <Container className="hero__container">
          <Row className="hero__container">
            <Col className="hero__col xs-12 md-11 lg-10 xxl-9">
              {this.props.ctas && (
                <div className="hero__ctas-wrapper">
                  <FadeIn
                    key={`${this.props.lead}-ctas`}
                    style={{ display: "block" }}
                    delay={this.props.subTitle ? 300 : 150}
                  >
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
