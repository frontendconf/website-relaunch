import Link from "next/link";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { colors, mixins } from './styles/variables';

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
          <nav>
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
          <style jsx>{`
            header {
              display: flex;
              padding: 44px 0;
              align-items: center;
            }
            .home-link {
              display: flex;
              flex: 0 0 auto;
              text-decoration: none;
            }
            .home-link__image {
              height: 63px;
              width: 63px;
            }
            .home-link__text-wrap {
              padding: 17px 0 13px 23px;
              display: flex;
              flex-direction: column;
            }
            .home-link__slogan {
              ${mixins.textGradient()}
              text-transform: uppercase;
              font-size: 20px;
              line-height: 1;
              margin-bottom: 2px;
            }
            .home-link__date {
              text-transform: uppercase;
              font-size: 11px;
              line-height: 1;
              letter-spacing: 0.8px;
              color: #b3b3bc;
            }
            .flex-spacer {
              flex: 1 1 auto;
            }
            nav {
              flex: 0 0 auto;
              margin-right: 40px;
            }
            ul {
              padding: 0;
              margin: 0;
            }
            li {
              display: inline-block;
              list-style: none;
            }
            li:not(:last-child) {
              margin-right: 24px;
            }
            .menu-link {
              text-decoration: none;
              font-size: 14px;
              line-height: 1;
              letter-spacing: 1px;
              text-align: center;
              color: #b3b3bc;
              text-transform: uppercase;
            }
            .is-active {
              color: white;
            }
            .ticket-link {
              position: relative;
              top: -1px;
              display: block;
              text-decoration: none;
              background-color: ${colors.secondary};
              font-size: 13px;
              line-height: 1;
              text-align: center;
              color: #09001f;
              padding: 14px 37px 11px;
              border-radius: 100px;
              text-transform: uppercase;
            }
          `}</style>
        </header>
      );
    }}
  </Query>
);

export default withRouter(Header);
