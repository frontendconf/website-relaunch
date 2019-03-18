import Link from "next/link";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { isTerminating } from "apollo-link/lib/linkUtils";

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
    <style jsx>{`
      li {
        list-style: none;
      }

      .menu--sponsors li,
      .menu--sponsors a {
        display: inline-block;
      }

      .menu--ctas a {
        display: block;
        border: 1px solid;
      }
    `}</style>
  </div>
);

export default function Footer() {
  return (
    <footer>
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
            <>
              <div className="sponsors">
                <h3>Contributing Sponsors</h3>

                <FooterMenu id="sponsors" items={sponsors} />
              </div>

              <div className="menus">
                <FooterMenu id="ctas" items={ctas} />
                <FooterMenu id="main" items={menuItems} />
                <FooterMenu id="social" items={socialMediaItems} />
              </div>

              <div className="copyright">
                <p>2011-2019 Frontend Conference Zürich</p>

                <FooterMenu id="meta" items={metaMenuItems} />
              </div>
            </>
          );
        }}
      </Query>
      <style jsx>{`
        .menus,
        .copyright {
          display: flex;
        }
      `}</style>
    </footer>
  );
}
