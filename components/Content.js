import ErrorMessage from "./ErrorMessage";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Markdown from "markdown-to-jsx";
import { Container, Row, Col } from './shared/Grid';

const currentPageQuery = gql`
  query currentPage($slug: String!) {
    pageCollection(where: { slug: $slug }) {
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

export default withRouter(({ router: { query } }) => (
  <Query query={currentPageQuery} variables={{ slug: query.slug || "/" }}>
    {({ loading, error, data }) => {
      if (error) return <ErrorMessage message="Error loading pages." />;
      if (loading) return <div>Loading</div>;

      const currentPage = data.pageCollection.items[0];

      return currentPage ? (
        <section>
          <Container>
            <Row>
              <Col>
                <h1>{currentPage.title}</h1>
                <p>{currentPage.lead}</p>
                {currentPage.body ? <Markdown>{currentPage.body}</Markdown> : null}
              </Col>
            </Row>
          </Container>
        </section>
      ) : null;
    }}
  </Query>
));
