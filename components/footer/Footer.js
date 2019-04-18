import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "../ErrorMessage";
import { Container, Row, Col } from "../shared/Grid";
import FooterMenu from "./components/FooterMenu";
import Newsletter from "./components/Newsletter";

const footerQuery = gql`
  query {
    configCollection {
      items {
        footerMenuCollection(limit: 20) {
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
        footerMenuMetaCollection(limit: 10) {
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
        footerCtasCollection(limit: 10) {
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
        footerSocialMediaCollection(limit: 10) {
          items {
            ... on SocialMedia {
              title
              link
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

export default function Footer({ showContributingSponsors = true }) {
  return (
    <footer className="footer">
      <Query query={footerQuery}>
        {({
          loading,
          error,
          data: {
            configCollection: {
              items: [
                {
                  footerMenuCollection: { items: menuItems },
                  footerMenuMetaCollection: { items: metaMenuItems },
                  footerCtasCollection: { items: ctas },
                  footerSocialMediaCollection: { items: socialMediaItems }
                }
              ]
            }
          }
        }) => {
          if (error) return <ErrorMessage message="Error loading pages." />;
          if (loading) return <div>Loading</div>;

          const sponsors = [].filter(
            item =>
              item.category.title === "CONTRIBUTING" &&
              item.tagCollection.items.find(tag => tag.title === "FEC19")
          );

          return (
            <Container>
              <Row>
                <Col className="xs-12">
                  <Row>
                    <Col className="footer__newsletter-col xs-12 md-5 lg-3">
                      <Newsletter className="footer__newsletter" />
                    </Col>
                    <Col className="footer__ctas-col xs-12 md-12 lg-2">
                      <div className="footer__ctas ctas">
                        <Row>
                          {ctas.map(item => (
                            <Col className="xs-6 md-4 lg-12" key={item.slug}>
                              <Link
                                href={{
                                  pathname: "/",
                                  query: { slug: item.slug }
                                }}
                                as={`/${item.slug}`}
                              >
                                <a className="ctas__link">{item.title}</a>
                              </Link>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Col>
                    <Col className="footer__menus-col xs-12 md-7 lg-6 offset-lg-1">
                      <div className="footer__menus">
                        <Row>
                          <Col className="xs-6">
                            <FooterMenu id="main" items={menuItems} />
                          </Col>
                          <Col className="xs-6">
                            <FooterMenu id="social" items={socialMediaItems} />
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <div className="copyright">
                    <p className="copyright__text">
                      2011-2019 Front Conference Zurich
                    </p>

                    <FooterMenu id="meta" items={metaMenuItems} />
                  </div>
                </Col>
              </Row>
            </Container>
          );
        }}
      </Query>
    </footer>
  );
}
