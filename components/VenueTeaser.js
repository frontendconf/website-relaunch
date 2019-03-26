import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import Markdown from "markdown-to-jsx";

const teaserQuery = gql`
  query {
    configCollection {
      items {
        venueTeaser {
          title
          body
          photo {
            url(transform: { width: 1000, height: 500, resizeStrategy: FILL })
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
      {({
        loading,
        error,
        data: {
          configCollection: {
            items: [{ venueTeaser: venueTeaser, map: map }]
          }
        }
      }) => {
        if (error) return <ErrorMessage message="Error loading pages." />;
        if (loading) return <div>Loading</div>;

        return (
          <div className="venue-teaser">
            <img src={venueTeaser.photo.url} className="venue-teaser__image" />

            <div className="venue-teaser__content">
              {isVenue ? (
                <div
                  className="venue-teaser__map"
                  dangerouslySetInnerHTML={{ __html: map }}
                />
              ) : (
                <>
                  <h3>
                    <Link
                      href={{ pathname: "/", query: { slug: "venue" } }}
                      as={`/venue`}
                    >
                      <a>{venueTeaser.title}</a>
                    </Link>
                  </h3>
                  <Markdown>{venueTeaser.body}</Markdown>
                </>
              )}
            </div>
          </div>
        );
      }}
    </Query>
  );
}
