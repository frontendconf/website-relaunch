import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import Markdown from "markdown-to-jsx";
import { Row, Col } from "./shared/Grid";
import FadeIn from "./FadeIn";

const teaserQuery = gql`
  query {
    configCollection {
      items {
        venueTeaser {
          title
          body
          photo {
            url(transform: { width: 1000, height: 1000, resizeStrategy: FILL })
          }
        }
        map
      }
    }
  }
`;

export default function VenueTeaser({ isVenue = false }) {
  return (
    <Query query={teaserQuery}>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading pages." />;
        if (loading) return <div>Loading</div>;

        // Destructuring needs to be done outside the arguments to prevent mapping errors
        const {
          configCollection: {
            items: [{ venueTeaser: venueTeaser, map: map }]
          }
        } = data;

        return (
          <div className="venue-teaser">
            <Row>
              <Col className="xs-12">
                <FadeIn>
                  <h3 className="venue-teaser__title">{venueTeaser.title}</h3>
                </FadeIn>
                <Link
                  href={{ pathname: "/", query: { slug: "venue" } }}
                  as={`/venue`}
                >
                  <a className="venue-teaser__link">
                    <Row>
                      <Col className="xs-12 rg-6">
                        <FadeIn style={{ display: "block" }}>
                          <img
                            src={venueTeaser.photo.url}
                            className="venue-teaser__image"
                          />
                        </FadeIn>
                      </Col>
                      <Col className="xs-12 rg-5 offset-rg-1">
                        <FadeIn delay={150} style={{}}>
                          <Markdown options={{ forceBlock: true }}>
                            {venueTeaser.body}
                          </Markdown>
                        </FadeIn>
                      </Col>
                    </Row>
                  </a>
                </Link>
              </Col>
            </Row>
          </div>
        );
      }}
    </Query>
  );
}
