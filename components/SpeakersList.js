import Speaker from "./Speaker";
import ErrorMessage from "./ErrorMessage";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col } from './shared/Grid';

const speakersAllQuery = gql`
  query speakersAll {
    collection: speakerCollection {
      items {
        name
        description
        photo {
          url(transform: { width: 294, height: 395, resizeStrategy: FILL })
        }
      }
    }
  }
`;

const speakersLimitedQuery = gql`
  query speakersLimited($maxOrder: Int) {
    collection: speakerCollection(where: { order_lt: $maxOrder }) {
      items {
        name
        description
        photo {
          url(transform: { width: 294, height: 395, resizeStrategy: FILL })
        }
      }
    }
  }
`;

export default ({ speakerLimit = 0 }) => {
  const variables = {};
  let query = speakersAllQuery;
  if (speakerLimit) {
    variables["maxOrder"] = speakerLimit;
    query = speakersLimitedQuery;
  }

  return (
    <>
      <Query query={query} variables={variables}>
        {({ loading, error, data }) => {
          if (error) return <ErrorMessage message="Error loading pages." />;
          if (loading) return <div>Loading</div>;

          const {
            collection: { items: speakers }
          } = data;

          return (
            <Row className="speakers-list">
              {speakers.map((speaker, key) => {
                return (
                  <Col key={key} className="speakers-list__col xs-12 md-4">
                    <Speaker speaker={speaker} />
                  </Col>
                );
              })}
            </Row>
          );
        }}
      </Query>
    </>
  );
};
