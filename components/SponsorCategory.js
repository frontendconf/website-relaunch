import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { Row, Col } from "./shared/Grid";
import Sponsor from "./Sponsor";
import FadeIn from "./FadeIn";

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

        // Columns
        let columnClasses = "xs-12 rg-6 lg-4";

        switch (category) {
          case "PLATINUM":
            columnClasses = "xs-6 rg-4 lg-3";
            break;
          case "GOLD":
            columnClasses = "xs-4 rg-3 lg-2";
            break;
          case "SILVER":
            columnClasses = "xs-3 rg-2 lg-1";
            break;
          case "CONTRIBUTING":
            columnClasses = "xs-3 rg-2 lg-1";
            break;
        }

        return (
          <div
            className={`sponsor-category ${
              details ? "sponsor-category--detail" : ""
            }`}
          >
            <FadeIn>
              <h3>{title}</h3>
            </FadeIn>

            {details ? (
              sponsors.map((item, key) => (
                <FadeIn key={key}>
                  <Sponsor item={item} details={true} />
                </FadeIn>
              ))
            ) : (
              <Row hGutter={true}>
                {sponsors.map((item, key) => (
                  <Col
                    className={`sponsor-category__item ${columnClasses}`}
                    key={key}
                  >
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
