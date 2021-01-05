import { Component } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { Container, Row, Col } from "./shared/Grid";

const menuQuery = gql`
  query menu {
    configCollection {
      items {
        menuCollection {
          items {
            ... on Page {
              title
              slug
              sys {
                id
              }
            }
          }
        }
      }
    }
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuOpen: false
    };
  }

  onRouteChange = () => {
    this.closeMobileMenu();
  };

  componentDidMount() {
    this.props.router.events.on("routeChangeStart", this.onRouteChange);
  }

  componentWillUnmount() {
    this.props.router.events.off("routeChangeStart", this.onRouteChange);
  }

  toggleMobileMenu(options = {}) {
    const newState = options.keepOpen
      ? true
      : options.keepClosed
      ? false
      : !this.state.mobileMenuOpen;

    this.setState({
      ...this.state,
      mobileMenuOpen: newState
    });
  }

  closeMobileMenu() {
    this.setState({
      ...this.state,
      mobileMenuOpen: false
    });
  }

  render() {
    const {
      router: { query }
    } = this.props;

    return (
      <Query query={menuQuery}>
        {({ loading, error, data }) => {
          if (error) return <ErrorMessage message="Error loading header." />;
          if (loading) return <div>Loading</div>;

          // Destructuring needs to be done outside the arguments to prevent mapping errors
          const {
            configCollection: {
              items: [
                {
                  menuCollection: { items: menuItems }
                }
              ]
            }
          } = data;

          return (
            <header className="header">
              <Container wide={true}>
                <Row>
                  <Col className={"header__col xs-12"}>
                    <div className="header__inner">
                      <Link href="/" as="/">
                        <a
                          className={
                            !query.slug ? "home-link is-active" : "home-link"
                          }
                        >
                          <img
                            className="home-link__image"
                            src="/static/neon.svg"
                          />
                          <div className="home-link__text-wrap">
                            <span className="home-link__slogan">
                              Front Conference
                            </span>
                            <span className="home-link__date">
                              26 – 27 August 2021
                              <br />
                              Alte Papierfabrik, Zurich
                            </span>
                          </div>
                        </a>
                      </Link>
                      <div className="header__flex-spacer" />
                      <nav
                        className={`nav ${
                          this.state.mobileMenuOpen ? "is-open" : ""
                        }`}
                        onFocus={() =>
                          this.toggleMobileMenu({ keepOpen: true })
                        }
                        onBlur={() =>
                          this.toggleMobileMenu({ keepClosed: true })
                        }
                      >
                        <ul className="nav__list">
                          {menuItems.map(item => (
                            <li className="nav__list-item" key={item.sys.id}>
                              <Link
                                href={{
                                  pathname: "/",
                                  query: { slug: item.slug }
                                }}
                                as={`/${item.slug}`}
                              >
                                <a
                                  className={
                                    query.slug === item.slug
                                      ? "nav__link is-active"
                                      : "nav__link"
                                  }
                                >
                                  {item.title}
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                      {/*
                        <Link
                          href={{
                            pathname: "/",
                            query: { slug: "tickets" }
                          }}
                          as="/tickets"
                        >
                          <a className="special-link">
                            <span className="special-link__text">
                              Buy tickets
                            </span>
                          </a>
                        </Link>
                      */}
                      {/* <Link
                        href={{
                          pathname: "/",
                          query: { slug: "live" }
                        }}
                        as="/live"
                      >
                        <a className="special-link">
                          <span className="special-link__text">Live</span>
                        </a>
                      </Link> */}
                      <button
                        onClick={() => this.toggleMobileMenu()}
                        className="burger"
                        tabIndex="-1"
                      >
                        <svg
                          className="burger__icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                        >
                          <path
                            fill="currentColor"
                            d="M1.217 2.613c-.331 0-.623-.147-.86-.383-.239-.235-.342-.585-.356-.923C-.011.983.147.61.357.384A1.21 1.21 0 0 1 1.217 0h.025c.201-.002.404 0 .607 0H16.783c.329 0 .623.148.86.383.239.235.342.585.356.923.012.324-.146.696-.356.923a1.21 1.21 0 0 1-.86.383h-.025c-.201.002-.404 0-.607 0H1.217zm0 5.692c-.331 0-.623-.148-.86-.383C.118 7.687.015 7.337.001 7c-.012-.324.146-.696.356-.923a1.21 1.21 0 0 1 .86-.383h.02c.466-.007.932 0 1.398 0H12.73c.33 0 .623.148.86.383.24.235.342.585.357.923.012.324-.146.697-.357.923a1.21 1.21 0 0 1-.86.383h-.02c-.466.007-.932 0-1.398 0H1.217zm0 5.693c-.331 0-.623-.148-.86-.383-.239-.235-.342-.585-.356-.923-.012-.324.146-.697.356-.923a1.21 1.21 0 0 1 .86-.383h.012c.303-.004.605 0 .91 0h6.536c.329 0 .623.148.86.383.239.235.342.585.356.923.012.324-.146.697-.356.923a1.21 1.21 0 0 1-.86.383h-.012c-.303.004-.605 0-.91 0H1.218z"
                          />
                        </svg>
                      </button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </header>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Header);
