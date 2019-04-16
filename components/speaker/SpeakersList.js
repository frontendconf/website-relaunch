import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import Speaker from "./SpeakerLink";
import ErrorMessage from "../ErrorMessage";
import { Row, Col } from "../shared/Grid";
import FadeIn from "../FadeIn";

const speakersQuery = gql`
  query speakers($limit: Int) {
    collection: speakerCollection(limit: $limit) {
      items {
        name
        description
        slug
        photo {
          url(transform: { resizeStrategy: FILL })
        }
        tagsCollection(limit: 20) {
          items {
            title
          }
        }
      }
    }
  }
`;

const SpeakersList = ({ limit, withHeading, filterTag = "FEC18" }) => (
  <div className="speakers-list">
    {withHeading && (
      <FadeIn>
        <h2 className="speakers-list__title">Industry Leading Speakers</h2>
      </FadeIn>
    )}
    <Query query={speakersQuery} variables={{ limit }}>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading pages." />;
        if (loading) return <div>Loading</div>;

        // Destructuring needs to be done outside the arguments to prevent mapping errors
        let {
          collection: { items: speakers }
        } = data;

        // Filter by tag
        if (filterTag) {
          speakers = speakers.filter(item =>
            item.tagsCollection.items.find(tag => tag.title === filterTag)
          );
        }

        return (
          <Row>
            {speakers.map(speaker => {
              return (
                <Col
                  key={speaker.slug}
                  className="speakers-list__col xs-6 md-4"
                >
                  <FadeIn style={{ justifyContent: "center" }}>
                    <Speaker
                      className="speakers-list__speaker"
                      speaker={speaker}
                    />
                  </FadeIn>
                </Col>
              );
            })}
          </Row>
        );
      }}
    </Query>

    {limit !== SpeakersList.defaultProps.limit && (
      <FadeIn>
        <Link
          href={{ pathname: "/", query: { slug: "speakers" } }}
          as={"/speakers"}
        >
          <a className="speakers-list__link">Discover more</a>
        </Link>
      </FadeIn>
    )}
  </div>
);

SpeakersList.propTypes = {
  limit: PropTypes.number,
  withHeading: PropTypes.bool
};

SpeakersList.defaultProps = {
  limit: 0,
  withHeading: false
};

export default SpeakersList;
