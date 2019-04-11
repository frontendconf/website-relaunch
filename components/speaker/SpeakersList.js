import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
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
      }
    }
  }
`;

const SpeakersList = ({ limit }) => (
  <Query query={speakersQuery} variables={{ limit }}>
    {({ loading, error, data }) => {
      if (error) return <ErrorMessage message="Error loading pages." />;
      if (loading) return <div>Loading</div>;

      // Destructuring needs to be done outside the arguments to prevent mapping errors
      const {
        collection: { items: speakers }
      } = data;

      return (
        <Row className="speakers-list">
          {speakers.map(speaker => {
            return (
              <Col key={speaker.slug} className="speakers-list__col xs-6 md-4">
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
);

SpeakersList.propTypes = {
  limit: PropTypes.number
};

SpeakersList.defaultProps = {
  limit: 100
};

export default SpeakersList;
