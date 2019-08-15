import { Query } from "react-apollo";
import { FormattedDate } from "react-intl";
import Markdown from "markdown-to-jsx";
import gql from "graphql-tag";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import { Row, Col } from "./shared/Grid";
import Truncate from "react-truncate";
import FadeIn from "./FadeIn";

const currentDate = new Date().toISOString();

// TODO add pagination or load more
const newsQuery = gql`
  query($date: DateTime) {
    newsCollection(limit: 30, order: date_DESC, where: { date_lt: $date }) {
      items {
        title
        body
        summary
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
    <Query
      query={newsQuery}
      skip={!process.browser}
      variables={{ date: currentDate }}
    >
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading news" />;
        if (loading) return <div>Loading</div>;
        if (!data) return null;

        const news = data.newsCollection.items;

        return (
          <div className="news-list">
            {news.map(item => (
              <Row key={item.slug} className="news-list__row">
                <Col className="news-list__col xs-12 rg-10 offset-rg-1 lg-8 offset-lg-2">
                  <FadeIn style={{ display: "block" }}>
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
                      {item.summary ? (
                        <Markdown>{item.summary}</Markdown>
                      ) : (
                        <Truncate lines={2} ellipsis="...">
                          <Markdown>{item.body}</Markdown>
                        </Truncate>
                      )}
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
                          value={new Date(item.date)}
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
                  </FadeIn>
                </Col>
              </Row>
            ))}
          </div>
        );
      }}
    </Query>
  );
}
