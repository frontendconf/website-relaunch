import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "../ErrorMessage";
import { Container, Row, Col } from "../shared/Grid";
import FooterMenu from "./components/FooterMenu";
import SocialIcons from "./components/SocialIcons";
import Newsletter from "./components/Newsletter";
import Vercel from "./../../static/powered-by-vercel.svg";

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
        {({ loading, error, data }) => {
          if (error) return <ErrorMessage message="Error loading footer." />;
          if (loading) return <div>Loading</div>;

          const {
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
          } = data;

          const sponsors = [].filter(
            item =>
              item.category.title === "CONTRIBUTING" &&
              item.tagCollection.items.find(tag => tag.title === "FRONT20")
          );

          return (
            <Container>
              <Row>
                <Col className="xs-12">
                  <Row>
                    <Col className="footer__newsletter-col xs-12 md-5 lg-3">
                      <div className="footer__newsletter">
                        <Newsletter className="" />
                        <SocialIcons id="social" items={socialMediaItems} />
                      </div>
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
                        <FooterMenu id="main" items={menuItems} />
                      </div>
                    </Col>
                  </Row>

                  <div className="copyright">
                    <p className="copyright__text">
                      2011-{new Date().getFullYear()} Front Conference Zurich
                    </p>

                    <FooterMenu id="meta" items={metaMenuItems} />
                    <a
                      href="https://vercel.com/?utm_source=frontendconf&utm_campaign=oss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vercel-banner"
                    >
                      <Vercel />
                    </a>
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
