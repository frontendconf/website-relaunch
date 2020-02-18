import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import Speaker from "./SpeakerLink";
import ErrorMessage from "../ErrorMessage";
import { Row, Col } from "../shared/Grid";
import FadeIn from "../FadeIn";
import { Component } from "react";

const currentDate = new Date().toISOString();

// TODO: Find a way of matching items without `publicationDate`, too
const speakersQuery = gql`
  query speakers($limit: Int, $date: DateTime) {
    collection: speakerCollection(
      limit: $limit
      where: { publicationDate_lt: $date }
      order: order_ASC
    ) {
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

const hostsQuery = gql`
  query hosts($limit: Int) {
    collection: hostCollection(limit: $limit, order: order_ASC) {
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

class SpeakersList extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div className="speakers-list">
        {this.props.withHeading && (
          <FadeIn>
            <h2 className="speakers-list__title">Industry Leading Speakers</h2>
          </FadeIn>
        )}
        <Query
          query={speakersQuery}
          variables={{ limit: this.props.limit, date: currentDate }}
        >
          {({ loading, error, data }) => {
            if (error) return <ErrorMessage message="Error loading speakers" />;
            if (loading) return <div>Loading</div>;

            // Destructuring needs to be done outside the arguments to prevent mapping errors
            let {
              collection: { items: speakers }
            } = data;

            // Filter by tag
            if (this.props.filterTag) {
              speakers = speakers.filter(item =>
                item.tagsCollection.items.find(
                  tag => tag.title === this.props.filterTag
                )
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

        {this.props.limit !== SpeakersList.defaultProps.limit ? (
          <FadeIn>
            <Link
              href={{ pathname: "/", query: { slug: "speakers" } }}
              as={"/speakers"}
            >
              <a className="speakers-list__link">Discover more</a>
            </Link>
          </FadeIn>
        ) : (
          <>
            <FadeIn>
              <h2 className="speakers-list__title speakers-list__title--hosts">
                Hosts
              </h2>
            </FadeIn>
            <Query
              query={hostsQuery}
              variables={{ limit: this.props.limit, date: currentDate }}
            >
              {({ loading, error, data }) => {
                if (error)
                  return <ErrorMessage message="Error loading hosts" />;
                if (loading) return <div>Loading</div>;

                // Destructuring needs to be done outside the arguments to prevent mapping errors
                let {
                  collection: { items: hosts }
                } = data;

                // Filter by tag
                if (this.props.filterTag) {
                  hosts = hosts.filter(item =>
                    item.tagsCollection.items.find(
                      tag => tag.title === this.props.filterTag
                    )
                  );
                }

                return (
                  <Row>
                    {hosts.map(host => {
                      return (
                        <Col
                          key={host.slug}
                          className="speakers-list__col xs-6 md-4"
                        >
                          <FadeIn style={{ justifyContent: "center" }}>
                            <Speaker
                              className="speakers-list__speaker"
                              speaker={host}
                              isHost={true}
                            />
                          </FadeIn>
                        </Col>
                      );
                    })}
                  </Row>
                );
              }}
            </Query>
          </>
        )}
      </div>
    );
  }
}

SpeakersList.propTypes = {
  limit: PropTypes.number,
  withHeading: PropTypes.bool,
  filterTag: PropTypes.string
};

SpeakersList.defaultProps = {
  limit: 0,
  withHeading: false,
  filterTag: "FRONT20"
};

export default SpeakersList;
