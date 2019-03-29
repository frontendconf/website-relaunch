import ErrorMessage from "./ErrorMessage";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

const newsQuery = gql`
  query {
    newsCollection(limit: 3, order: date_DESC) {
      items {
        title
        date
        slug
        sys {
          id
        }
      }
    }
  }
`;

export default () => (
  <Query query={newsQuery} skip={!process.browser}>
    {({ loading, error, data }) => {
      if (error) return <ErrorMessage message="Error loading pages." />;
      if (loading) return <div>Loading</div>;
      if (!data) return null;

      const news = data.newsCollection.items;

      return (
        <div className="news-summary">
          <h3>News</h3>
          <ul>
            {news.map(item => (
              <li key={item.sys.id}>
                <Link
                  href={{
                    pathname: "/",
                    query: { slug: item.slug, category: "news" }
                  }}
                  as={`/news/${item.slug}`}
                >
                  <a>{item.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);
