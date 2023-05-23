import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import Speaker from "./SpeakerLink";
import ErrorMessage from "../ErrorMessage";
import { Row, Col } from "../shared/Grid";
import FadeIn from "../FadeIn";
import { Component } from "react";

const speakersQuery = gql`
  query speakers($limit: Int = 200, $yearTag: String = "FRONT23") {
    tags: tagCollection(limit: 1, where: { title: $yearTag }) {
      items {
        linkedFrom {
          speakers: speakerCollection(limit: $limit) {
            items {
              name
              role
              company
              description
              bio
              slug
              order
              photo {
                url(transform: { resizeStrategy: FILL })
              }
            }
          }
        }
      }
    }
  }
`;

const hostsQuery = gql`
  query hosts($limit: Int = 200, $yearTag: String = "FRONT23") {
    tags: tagCollection(limit: 1, where: { title: $yearTag }) {
      items {
        linkedFrom {
          hosts: hostCollection(limit: $limit) {
            items {
              name
              description
              bio
              slug
              order
              photo {
                url(transform: { resizeStrategy: FILL })
              }
            }
          }
        }
      }
    }
  }
`;

class SpeakersList extends Component {
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
          variables={{ limit: 200, yearTag: this.props.yearTag }}
        >
          {({ loading, error, data }) => {
            if (error) return <ErrorMessage message="Error loading speakers" />;
            if (loading) return <div>Loading</div>;

            let {
              tags: {
                items: [
                  {
                    linkedFrom: {
                      speakers: { items: speakers }
                    }
                  }
                ]
              }
            } = data;

            // Sort by name, since that's not possible in the query
            speakers.sort((a, b) => {
              if (a.order > b.order) return 1;
              else if (a.order < b.order) return -1;
              if (a.name > b.name) return 1;
              else return -1;
            });

            // Limit number
            if (this.props.limit) {
              speakers = speakers.slice(0, this.props.limit);
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

        {this.props.limit !== 6 ? (
          <></>
        ) : (
          <>
            <FadeIn>
              <Link
                href={{ pathname: "/", query: { slug: "speakers" } }}
                as={"/speakers"}
              >
                <a className="speakers-list__link">Discover more</a>
              </Link>
            </FadeIn>
            <FadeIn>
              <h2 className="speakers-list__title speakers-list__title--hosts">
                Hosts
              </h2>
            </FadeIn>
            <Query
              query={hostsQuery}
              variables={{ yearTag: this.props.yearTag }}
            >
              {({ loading, error, data }) => {
                if (error)
                  return <ErrorMessage message="Error loading hosts" />;
                if (loading) return <div>Loading</div>;

                let {
                  tags: {
                    items: [
                      {
                        linkedFrom: {
                          hosts: { items: hosts }
                        }
                      }
                    ]
                  }
                } = data;

                // Order
                hosts.sort((a, b) => a.order - b.order);

                // Limit number
                if (this.props.limit) {
                  hosts = hosts.slice(0, this.props.limit);
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
  yearTag: PropTypes.string,
  withHeading: PropTypes.bool,
  filterTags: PropTypes.array
};

SpeakersList.defaultProps = {
  limit: 0,
  withHeading: false,
  yearTag: "FRONT23",
  filterTags: ["FRONT23"]
};

export default SpeakersList;
