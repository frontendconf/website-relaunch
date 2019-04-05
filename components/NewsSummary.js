import ErrorMessage from "./ErrorMessage";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import { Row, Col } from "./shared/Grid";

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

export default function NewsSummary() {
  return (<Query query={newsQuery} skip={!process.browser}>
    {({ loading, error, data }) => {
      if (error) return <ErrorMessage message="Error loading pages." />;
      if (loading) return <div>Loading</div>;
      if (!data) return null;

      const news = data.newsCollection.items;

      return (
        <div className="news-summary">
          <h3 className="news-summary__title">News</h3>
          <Row>
            {news.map(item => (
              <Col className="news-summary__col xs-12 rg-6 lg-4" key={item.sys.id}>
                <Link
                  href={{
                    pathname: "/",
                    query: { slug: item.slug, category: "news" }
                  }}
                  as={`/news/${item.slug}`}
                >
                  <a className="news-summary__link">
                    <span className="news-summary__link-title">{item.title}</span>
                    <span className="news-summary__link-date">Date here</span>
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      );
    }}
  </Query>
)};
