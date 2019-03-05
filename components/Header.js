import Link from "next/link";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

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

const Header = ({ router: { query } }) => (
  <header>
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
          <ul>
            <li>
              <Link href="/" as="/">
                <a className={!query.slug ? "is-active" : ""}>Home</a>
              </Link>
            </li>
            {menuItems.map(item => (
              <li key={item.sys.id}>
                <Link href={{ pathname: '/', query: { slug: item.slug } }} as={`/${item.slug}` }>
                  <a
                    className={query.slug === item.slug ? "is-active" : ""}
                  >
                    {item.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      li {
        list-style: none;
        display: inline;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
    `}</style>
  </header>
);

export default withRouter(Header);
