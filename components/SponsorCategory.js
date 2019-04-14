import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { Row, Col } from "./shared/Grid";
import Sponsor from "./Sponsor";

const sponsorsQuery = gql`
  query {
    sponsorCollection {
      items {
        title
        link
        logo {
          url
        }
        logoSvg
        body
        twitter
        linkedin
        order
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
  filterTag = "FEC19",
  details = false
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

        // Sort by `order` property
        if (sponsors[0].order) {
          sponsors = sponsors.sort((a, b) => a.order - b.order);
        }

        // Default title
        if (!title && sponsors.length) {
          title = sponsors.find(item => item.category.title).category.title;
        }

        return (
          <div className="sponsor-category">
            <h3>{title}</h3>

            {details ? (
              sponsors.map((item, key) => (
                <Sponsor item={item} details={true} key={key} />
              ))
            ) : (
              <Row hGutter={true}>
                {sponsors.map((item, key) => (
                  <Col className="sponsor-category__item" key={key}>
                    <Sponsor item={item} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        );
      }}
    </Query>
  );
}
