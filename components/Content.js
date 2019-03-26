import ErrorMessage from "./ErrorMessage";
import SpeakersList from "./SpeakersList";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Markdown from "markdown-to-jsx";
import NewsSummary from "./NewsSummary";
import VenueTeaser from "./VenueTeaser";
import Jobs from "./Jobs";

const currentPageQuery = gql`
  query($slug: String!) {
    collection: pageCollection(where: { slug: $slug }) {
      items {
        title
        lead
        body
        slug
        menu
        menuButton
        showIntro
        showNews
        showSpeakers
        showVenue
        showSponsorshipCategories
        showSponsors
        showSponsorsDetailed
        showWorkshops
        showTeam
        showJobs
        showJobsDetailed
        showSchedule
        showHotels
        showRestaurants
        bodyClass
        menuClass
        ctaText
        specialPage
        config
      }
    }
  }
`;

const currentNewsQuery = gql`
  query($slug: String!) {
    collection: newsCollection(where: { slug: $slug }) {
      items {
        title
        date
        body
        slug
      }
    }
  }
`;

export default withRouter(({ router: { query } }) => {
  const slug = query.slug || "/";
  let category = query.category;
  let dataQuery;

  switch (category) {
    case "news":
      dataQuery = currentNewsQuery;
      break;
    // case "speakers":
    // case "hosts":
    // case "workshops":
    default:
      dataQuery = currentPageQuery;
  }

  return (
    <Query query={dataQuery} variables={{ slug }}>
      {({
        loading,
        error,
        data: {
          collection: {
            items: [currentPage]
          }
        }
      }) => {
        if (error) return <ErrorMessage message="Error loading pages." />;
        if (loading) return <div>Loading</div>;
        if (!currentPage) return <section>404</section>;

        const title = category
          ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
          : currentPage.title;
        const subTitle = category ? currentPage.title : null;

        const isHome = slug === "/";
        const isVenue = slug === "venue";

        return (
          <section>
            <h1>{title}</h1>
            {subTitle ? <h2>{subTitle}</h2> : null}
            <p>{currentPage.lead}</p>
            {currentPage.body ? <Markdown>{currentPage.body}</Markdown> : null}
            {currentPage.showNews ? <NewsSummary /> : null}
            {currentPage.showSpeakers || isHome ? (
              <SpeakersList speakerLimit={isHome ? 6 : 0} />
            ) : null}
            {currentPage.showVenue ? <VenueTeaser isVenue={isVenue} /> : null}
            {currentPage.showJobs ? <Jobs /> : null}
          </section>
        );
      }}
    </Query>
  );
});
