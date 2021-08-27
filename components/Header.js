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
    if (!this.props.router || !this.props.router.query) {
      return null;
    }

    const {
      router: { query }
    } = this.props;

    return (
      query && (
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
                              src="/static/frontZRH_10y.svg"
                            />
                            <div className="home-link__text-wrap">
                              <span className="home-link__slogan">
                                Front Conference
                              </span>
                              <span className="home-link__date">
                                25 – 26 August 2022
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
                        <Link
                          href={{
                            pathname: "/",
                            query: { slug: "online-community" }
                          }}
                          as="/online-community"
                        >
                          <a className="special-link">
                            <span className="special-link__text">Online</span>
                          </a>
                        </Link>
                        {/*<Link
                          href={{
                            pathname: "/",
                            query: { slug: "tickets" }
                          }}
                          as="/tickets"
                        >
                          <a className="special-link special-link--ticket">
                            <span className="special-link__text">
                              Buy tickets
                            </span>
                          </a>
                        </Link>*/}
                        <button
                          onClick={() => this.toggleMobileMenu()}
                          className="burger"
                          tabIndex="-1"
                        >
                          <div
                            className={`burger__icon ${
                              this.state.mobileMenuOpen ? "open" : ""
                            }`}
                          >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </header>
            );
          }}
        </Query>
      )
    );
  }
}

Header.defaultProps = {
  router: { query: "" }
};

export default withRouter(Header);
