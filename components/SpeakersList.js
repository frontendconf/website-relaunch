import { Query } from "react-apollo";
import gql from "graphql-tag";
import Speaker from "./Speaker";
import ErrorMessage from "./ErrorMessage";
import { Container, Row, Col } from './shared/Grid';

const speakersAllQuery = gql`
  query speakersAll {
    collection: speakerCollection {
      items {
        name
        description
        slug
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
        slug
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

          // Destructuring needs to be done outside the arguments to enable variable queries
          const {
            collection: { items: speakers }
          } = data;

          return (
                <Row>
                    {speakers.map((speaker, key) => {
                      return <Col className={'xs-12 rg-6 lg-4 speakers-list__item--'+ key%3}><Speaker key={key} speaker={speaker} /> </Col>;
                    })}
                </Row>
          );
        }}
      </Query>
    </>
  );
};
