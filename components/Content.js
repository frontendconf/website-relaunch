import ErrorMessage from "./ErrorMessage";
import SpeakersList from "./SpeakersList";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Markdown from "markdown-to-jsx";
import NewsSummary from "./NewsSummary";
import { Container, Row, Col } from './shared/Grid';
import VenueTeaser from "./VenueTeaser";
import Jobs from "./Jobs";
import Hero from "./Hero";

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
	      leadCtasCollection {
	          items {
	              ctaText
	              slug
	          }
	      }
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

const currentSpeakerQuery = gql`
    query($slug: String!) {
        collection: speakerCollection(where: { slug: $slug }) {
            items {
                title: name
                body: description
                slug
                photo {
                    url(transform: { width: 294, height: 395, resizeStrategy: FILL })
                }
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
    case "speakers":
        dataQuery = currentSpeakerQuery;
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
        data,
      }) => {
        if (error) return <ErrorMessage message="Error loading pages." />;

        // Destructuring needs to be done outside the arguments to prevent mapping errors
        const { collection: { items: [currentPage] } } = data;
        if (!currentPage) return <Hero title="404 Page not found"/>;

        let title = category
          ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
          : currentPage.title;
        const subTitle = category ? currentPage.title : null;
        const ctas = currentPage.leadCtasCollection.items;
        // if (loading) title="Loading...";

        const isHome = slug === "/";
        const isVenue = slug === "venue";

        return (
          <section className={loading ? "content content--loading" : "content"}>
            <Hero title={title} subTitle={subTitle} ctas={ctas}></Hero>
            <Container>
              <Row>
                <Col>
                    <p>{currentPage.lead}</p>
                    <div>{currentPage.body ? <Markdown>{currentPage.body}</Markdown> : null}</div>
                    <div>{currentPage.showNews ? <NewsSummary /> : null}</div>
                    <div>{currentPage.showSpeakers || isHome ? (
                      <SpeakersList speakerLimit={isHome ? 6 : 0} />
                    ) : null}</div>
                    <div>{currentPage.showVenue ? <VenueTeaser isVenue={isVenue} /> : null}</div>
                    <div>{currentPage.showJobs ? <Jobs /> : null}</div>
                </Col>
              </Row>
            </Container>
          </section>
        );
      }}
    </Query>
  );
});
