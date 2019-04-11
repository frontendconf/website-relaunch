import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { Row, Col } from "./shared/Grid";

const sponsorsQuery = gql`
  query {
    sponsorCollection {
      items {
        title
        link
        logo {
          url(transform: { width: 80, height: 80 })
        }
        logoSvg
        category {
          title
          color
        }
        tagCollection(limit: 20) {
          items {
            title
          }
        }
      }
    }
  }
`;

export default function SponsorCategory({
  category = "CONTRIBUTING",
  title,
  filterTag = "FEC19"
}) {
  return (
    <Query query={sponsorsQuery}>
      {({
        loading,
        error,
        data: {
          sponsorCollection: { items: allSponsors }
        }
      }) => {
        if (error) return <ErrorMessage message="Error loading sponsors." />;
        if (loading) return <div>Loading</div>;

        let sponsors = allSponsors.filter(
          item => item.category.title === category
        );

        // Filter by tag
        if (filterTag) {
          sponsors = sponsors.filter(item =>
            item.tagCollection.items.find(tag => tag.title === filterTag)
          );
        }

        // Default title
        if (!title && sponsors.length) {
          title = sponsors.find(item => item.category.title).category.title;
        }

        return (
          <div className="sponsor-category">
            <h3>{title}</h3>

            <Row hGutter={true}>
              {sponsors.map((item, key) => (
                <Col className="sponsor-category__item" key={key}>
                  <a
                    className="sponsor-category__item-link"
                    href={item.link}
                    title={item.title}
                    target="_blank"
                  >
                    {item.logoSvg ? (
                      <span
                        className="sponsor-category__item-svg"
                        dangerouslySetInnerHTML={{
                          __html: item.logoSvg
                        }}
                        style={
                          item.category.color
                            ? { fill: item.category.color }
                            : {}
                        }
                      />
                    ) : item.logo ? (
                      <img
                        className="sponsor-category__item-img"
                        src={item.logo.url}
                        alt={item.title}
                      />
                    ) : (
                      item.title
                    )}
                  </a>
                </Col>
              ))}
            </Row>
          </div>
        );
      }}
    </Query>
  );
}
