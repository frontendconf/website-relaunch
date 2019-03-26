import { Component } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { Container, Row, Col } from './shared/Grid';

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
      mobileMenuOpen: false,
    }
  }

  onRouteChange = () => {
    this.closeMobileMenu();
  }

  componentWillMount() {
    this.props.router.events.on('routeChangeStart', this.onRouteChange);
  }

  componentWillUnmount() {
    this.props.router.events.off('routeChangeStart', this.onRouteChange);
  }

  toggleMobileMenu() {
    this.setState({
      ...this.state,
      mobileMenuOpen: !this.state.mobileMenuOpen,
    })
  }

  closeMobileMenu() {
    this.setState({
      ...this.state,
      mobileMenuOpen: false,
    })
  }

  render() {
    const { router: { query } } = this.props;

    return (
      <Query query={menuQuery}>
        {({
          loading,
          error,
          data: {
            configCollection: {
              items: [
                {
                  menuCollection: { items: menuItems }
                }
              ]
            }
          }
        }) => {
          if (error) return <ErrorMessage message="Error loading pages." />;
          if (loading) return <div>Loading</div>;
    
          return (
            <header>
              <Container wide={true}>
                <Row>
                  <Col className={'xs-12'}>
                    <div className="inner">
                      <Link href="/" as="/">
                        <a className={!query.slug ? "home-link is-active" : "home-link"}>
                          <img className="home-link__image" src="/static/neon.svg" />
                          <div className="home-link__text-wrap">
                            <span className="home-link__slogan">Front Zürich 2019</span>
                            <span className="home-link__date">August 28 29 30</span>
                          </div>
                        </a>
                      </Link>
                      <div className="flex-spacer"></div>
                      <nav className={`nav ${this.state.mobileMenuOpen ? 'is-open' : ''}`}>
                        <ul>
                          {menuItems.map(item => (
                            <li key={item.sys.id}>
                              <Link href={{ pathname: '/', query: { slug: item.slug } }} as={`/${item.slug}` }>
                                <a
                                  className={query.slug === item.slug ? "menu-link is-active" : "menu-link"}
                                >
                                  {item.title}
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                      <a href="" className="ticket-link">Buy Tickets</a>
                      <button onClick={() => this.toggleMobileMenu()} className="burger">
                        <svg className="burger__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14">
                          <path fill="currentColor" d="M1.217 2.613c-.331 0-.623-.147-.86-.383-.239-.235-.342-.585-.356-.923C-.011.983.147.61.357.384A1.21 1.21 0 0 1 1.217 0h.025c.201-.002.404 0 .607 0H16.783c.329 0 .623.148.86.383.239.235.342.585.356.923.012.324-.146.696-.356.923a1.21 1.21 0 0 1-.86.383h-.025c-.201.002-.404 0-.607 0H1.217zm0 5.692c-.331 0-.623-.148-.86-.383C.118 7.687.015 7.337.001 7c-.012-.324.146-.696.356-.923a1.21 1.21 0 0 1 .86-.383h.02c.466-.007.932 0 1.398 0H12.73c.33 0 .623.148.86.383.24.235.342.585.357.923.012.324-.146.697-.357.923a1.21 1.21 0 0 1-.86.383h-.02c-.466.007-.932 0-1.398 0H1.217zm0 5.693c-.331 0-.623-.148-.86-.383-.239-.235-.342-.585-.356-.923-.012-.324.146-.697.356-.923a1.21 1.21 0 0 1 .86-.383h.012c.303-.004.605 0 .91 0h6.536c.329 0 .623.148.86.383.239.235.342.585.356.923.012.324-.146.697-.356.923a1.21 1.21 0 0 1-.86.383h-.012c-.303.004-.605 0-.91 0H1.218z"/>
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
    )
  }
}

export default withRouter(Header);
