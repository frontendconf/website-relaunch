import { Component } from "react";
import ErrorMessage from "./ErrorMessage";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import FadeIn from "./FadeIn";
import { Row, Col } from "./shared/Grid";
import { FormattedDate } from "react-intl";

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

const NewsSummary = () => (
  <div className="news-summary">
    <FadeIn>
      <h3 className="news-summary__title">News</h3>
    </FadeIn>

    <Query query={newsQuery} skip={!process.browser}>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading pages." />;
        if (loading) return <div>Loading</div>;
        if (!data) return null;

        const news = data.newsCollection.items;

        return (
          <Row>
            {news.map((item, i) => (
              <Col
                className="news-summary__col xs-12 rg-6 lg-4"
                key={item.sys.id}
              >
                <FadeIn delay={150 * i}>
                  <Link
                    href={{
                      pathname: "/",
                      query: { slug: item.slug, category: "news" }
                    }}
                    as={`/news/${item.slug}`}
                  >
                    <a className="news-summary__link">
                      <span className="news-summary__link-title">
                        {item.title}
                      </span>
                      <span className="news-summary__link-date">
                        <FormattedDate
                          value={item.date}
                          day="numeric"
                          month="long"
                          year="numeric"
                        />
                      </span>
                    </a>
                  </Link>
                </FadeIn>
              </Col>
            ))}
          </Row>
        );
      }}
    </Query>
  </div>
);

export default NewsSummary;
