import { Query } from "react-apollo";
import { FormattedDate } from "react-intl";
import Markdown from "markdown-to-jsx";
import gql from "graphql-tag";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import { Row, Col } from "./shared/Grid";
import Truncate from "react-truncate";

// TODO add pagination or load more
const newsQuery = gql`
  query {
    newsCollection(limit: 30, order: date_DESC) {
      items {
        title
        body
        date
        slug
        tagsCollection {
          items {
            title
          }
        }
      }
    }
  }
`;

export default function NewsList() {
  return (
    <Query query={newsQuery} skip={!process.browser}>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading pages." />;
        if (loading) return <div>Loading</div>;
        if (!data) return null;

        const news = data.newsCollection.items;

        return (
          <div className="news-list">
            {news.map(item => (
              <Row key={item.slug} className="news-list__row">
                <Col className="news-list__col xs-12">
                  <Link
                    href={{
                      pathname: "/",
                      query: { slug: item.slug, category: "news" }
                    }}
                    as={`/news/${item.slug}`}
                  >
                    <a className="news-list__title">
                      <h2>{item.title}</h2>
                    </a>
                  </Link>
                  <div className="news-list__body">
                    <Truncate lines={2} ellipsis="...">
                      <div className="markdown-wrapper">
                        <Markdown>{item.body}</Markdown>
                      </div>
                    </Truncate>
                    <Link
                      href={{
                        pathname: "/",
                        query: { slug: item.slug, category: "news" }
                      }}
                      as={`/news/${item.slug}`}
                    >
                      <a className="news-list__more">Read&nbsp;more</a>
                    </Link>
                  </div>

                  <div className="news-list__meta">
                    <span className="news-list__date">
                      <FormattedDate
                        value={item.date}
                        day="numeric"
                        month="long"
                        year="numeric"
                      />
                    </span>
                    <div className="news-list__tags">
                      {item.tagsCollection &&
                        item.tagsCollection.items.map((tag, i) => (
                          // TODO link tags
                          <span className="news-list__tag-item" key={i}>
                            #{tag.title}
                          </span>
                        ))}
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        );
      }}
    </Query>
  );
}
