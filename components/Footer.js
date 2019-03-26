import Link from "next/link";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { isTerminating } from "apollo-link/lib/linkUtils";
import { Container, Row, Col } from "./shared/Grid";

const footerQuery = gql`
  query {
    sponsorCollection {
      items {
        title
        link
        logo {
          url(transform: { width: 80, height: 80 })
        }
        category {
          title
        }
      }
    }
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

const FooterMenu = props => (
  <div className={`menu menu--${props.id}`}>
    <ul>
      {props.items.map((item, i) => {
        const id = item.sys ? item.sys.id : i;

        return item.slug ? (
          <li key={id}>
            <Link
              href={{ pathname: "/", query: { slug: item.slug } }}
              as={`/${item.slug}`}
            >
              <a>{item.title}</a>
            </Link>
          </li>
        ) : (
          <li key={id}>
            <a href={item.link}>
              {item.logo ? (
                <img src={item.logo.url} alt={item.title} />
              ) : (
                item.title
              )}
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="footer">
      <Query query={footerQuery}>
        {({
          loading,
          error,
          data: {
            sponsorCollection: { items: allSponsors },
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

          const sponsors = allSponsors.filter(
            item => item.category.title === "CONTRIBUTING"
          );

          return (
            <Container>
              <Row>
                <Col className={"xs-12"}>
                  <div className="sponsors">
                    <h3>Contributing Sponsors</h3>

                    <Row>
                      {sponsors.map(item => (
                        <Col className="sponsors__item">
                          <a
                            className="sponsors__item-link"
                            href={item.link}
                            title={item.title}
                            target="_blank"
                          >
                            {item.logo ? (
                              <img src={item.logo.url} alt={item.title} />
                            ) : (
                              item.title
                            )}
                          </a>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  {/* <div className="menus">
                    <FooterMenu id="ctas" items={ctas} />
                    <FooterMenu id="main" items={menuItems} />
                    <FooterMenu id="social" items={socialMediaItems} />
                  </div>

                  <div className="copyright">
                    <p>2011-2019 Frontend Conference Zürich</p>

                    <FooterMenu id="meta" items={metaMenuItems} />
                  </div> */}
                </Col>
              </Row>
            </Container>
          );
        }}
      </Query>
    </footer>
  );
}
