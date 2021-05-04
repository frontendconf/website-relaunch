import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

const talksQuery = gql`
  query talks {
    collection: talkCollection(limit: 20) {
      items {
        title
        abstract
        speaker {
          slug
        }
        tagsCollection(limit: 20) {
          items {
            title
          }
        }
        duplicate
      }
    }
  }
`;

const Talks = ({ filterTag, speakerSlug }) => (
  <div className="talks">
    <Query query={talksQuery}>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading talks" />;
        if (loading) return <div>Loading</div>;

        // Destructuring needs to be done outside the arguments to prevent mapping errors
        let {
          collection: { items: talks }
        } = data;

        // Remove duplicates needed for schedule
        talks = talks.filter(item => !item.duplicate);

        // Filter by speaker
        if (speakerSlug) {
          talks = talks.filter(
            item => item.speaker && item.speaker.slug === speakerSlug
          );
        }

        // Filter by tag
        if (filterTag) {
          talks = talks.filter(item =>
            item.tagsCollection.items.find(tag => tag.title === filterTag)
          );
        }

        return (
          <>
            {talks.map((talk, i) => (
              <div className="talks__item" key={i}>
                <h2 className="talks__item-title">{talk.title}</h2>
                <p className="talks__item-abstract">{talk.abstract}</p>
              </div>
            ))}
          </>
        );
      }}
    </Query>
  </div>
);

Talks.propTypes = {
  filterTag: PropTypes.string,
  speakerSlug: PropTypes.string
};

Talks.defaultProps = {
  filterTag: "FRONT21",
  speakerSlug: null
};

export default Talks;
