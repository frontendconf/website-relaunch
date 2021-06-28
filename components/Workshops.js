import PropTypes from "prop-types";
import { FormattedDate, FormattedTime } from "react-intl/dist";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import { Row, Col } from "./shared/Grid";
import FadeIn from "./FadeIn";
import Image from "./Image";

const workshopsQuery = gql`
  query workshops {
    collection: workshopCollection(limit: 20) {
      items {
        title
        lead
        from
        to
        slug
        teacher {
          name
        }
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

const Workshops = ({ filterTag = Workshops.defaultProps.filterTag }) => (
  <div className="workshops">
    <Query query={workshopsQuery}>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading workshops" />;
        if (loading) return <div>Loading</div>;

        // Destructuring needs to be done outside the arguments to prevent mapping errors
        let {
          collection: { items: workshops }
        } = data;

        // Filter by tag
        if (filterTag) {
          workshops = workshops.filter(item =>
            item.tagsCollection.items.find(tag => tag.title === filterTag)
          );
        }

        return (
          <Row>
            {workshops.map(workshop => {
              return (
                <Col key={workshop.slug} className="workshops__col xs-12 lg-6">
                  <FadeIn style={{ justifyContent: "center" }}>
                    <Link
                      href={{
                        pathname: "/",
                        query: { slug: workshop.slug, category: "workshops" }
                      }}
                      as={`/workshops/${workshop.slug}`}
                    >
                      <a className="workshops__item">
                        {workshop.photo ? (
                          <Image
                            className="workshops__item-image"
                            src={`${workshop.photo.url}&w=626&h=354`}
                          />
                        ) : null}
                        <h3 className="workshops__item-title">
                          {workshop.title}
                        </h3>
                        <p className="workshops__item-teacher">
                          with {workshop.teacher.name}
                        </p>
                        <p className="workshops__item-lead">{workshop.lead}</p>
                        <p className="workshops__item-details">
                          <FormattedDate
                            value={new Date(workshop.from)}
                            day="numeric"
                            month="long"
                            year="numeric"
                          />{" "}
                          {workshop.from && workshop.to ? (
                            <FormattedTime value={new Date(workshop.from)} />
                          ) : null}
                          {workshop.from && workshop.to ? " - " : null}
                          {workshop.from && workshop.to ? (
                            <FormattedTime value={new Date(workshop.to)} />
                          ) : null}
                        </p>
                      </a>
                    </Link>
                  </FadeIn>
                </Col>
              );
            })}
          </Row>
        );
      }}
    </Query>
  </div>
);

Workshops.propTypes = {
  filterTag: PropTypes.string
};

Workshops.defaultProps = {
  filterTag: "FRONT21"
};

export default Workshops;
