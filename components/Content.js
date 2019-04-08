import ErrorMessage from "./ErrorMessage";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Markdown from "markdown-to-jsx";
import NewsSummary from "./NewsSummary";
import { Container, Row, Col } from "./shared/Grid";
import VenueTeaser from "./VenueTeaser";
import Jobs from "./Jobs";
import Hero from "./Hero";
import SpeakersList from "./speaker/SpeakersList";
import Speaker from "./speaker/SpeakerLink";
import Backlink from "./Backlink";
import { SpeakerImage, SpeakerSocials } from './speaker/SpeakerLink';

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

// TODO find better way to map content fields, instead duplicating it
const currentSpeakerQuery = gql`
  query($slug: String!) {
    collection: speakerCollection(where: { slug: $slug }) {
      items {
        title: name
        lead: description
        body: bio
        name
        description
        slug
        photo {
          url(transform: { width: 294, height: 395, resizeStrategy: FILL })
        }
        linkedin
        twitter
        website
      }
    }
  }
`;

export default withRouter(({ router: { query } }) => {
  const slug = query.slug || "/";
  let template = "default";
  let category = query.category;
  let dataQuery;
  let isSpeaker = false;

  switch (category) {
    case "news":
      dataQuery = currentNewsQuery;
      break;
    case "speakers":
      template = "content";
      isSpeaker = true;
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
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading pages." />;

        // Destructuring needs to be done outside the arguments to prevent mapping errors
        const {
          collection: {
            items: [currentPage]
          }
        } = data;
        if (!currentPage) return <Hero title="404 Page not found" />;

        let title = category
          ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
          : currentPage.title;
        const subTitle = category ? currentPage.title : null;
        const ctas = currentPage.leadCtasCollection
          ? currentPage.leadCtasCollection.items
          : null;
        // if (loading) title="Loading...";

        const isHome = slug === "/";
        const isVenue = slug === "venue";

        switch (template) {
          case "content":
            return (
              <section
                className={loading ? "content content--loading" : "content"}
              >
                <Hero
                  title={title}
                  subTitle={subTitle}
                  ctas={ctas}
                  template={template}
                />

                {isSpeaker && (
                  <div className="content__white-wrapper">
                    <Backlink text="Speakers" link={{
                      href: { pathname: '/', query: { slug: 'speakers' }},
                      as: '/speakers'
                    }}/>
                    <Container>
                      <Row className="content__floating-row">
                        <Col className="content__left xs-12 md-7 lg-6 offset-lg-1">
                          <div className="content-title">
                            <h1 className="content-title__title">{currentPage.title}</h1>
                            <p className="content-title__subtitle">{currentPage.lead}</p>
                          </div>
                        </Col>
                        <Col className="content__right xs-12 sm-10 rg-8 md-4 offset-right-lg-1 lg-3">
                          <Row>
                            <Col className="xs-7 offset-xs-1 md-12 offset-md-0">
                              <SpeakerImage speaker={currentPage} />
                            </Col>
                            <Col className="xs-3 offset-xs-1 md-12 offset-md-0">
                              <SpeakerSocials speaker={currentPage} />
                            </Col>
                          </Row>
                        </Col>
                        <Col className="content__left xs-12 md-7 lg-6 offset-lg-1">
                          <div>
                            <h2>About</h2>
                            {currentPage.body ? (
                              <Markdown options={{ forceBlock: true }}>{currentPage.body}</Markdown>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                ) || (
                  <Container>
                    <Row>
                      <Col className="xs-12 rg-8">
                        <h1 className="content__title">{currentPage.title}</h1>
                        <p>{currentPage.lead}</p>
                        <div>
                          {currentPage.body ? (
                            <Markdown options={{ forceBlock: true }}>{currentPage.body}</Markdown>
                          ) : null}
                        </div>
                        <div>{currentPage.showNews ? <NewsSummary /> : null}</div>
                        <div>
                          {currentPage.showSpeakers || isHome ? (
                            <SpeakersList limit={isHome ? 6 : 0} />
                          ) : null}
                        </div>
                        {/* <div>
                          {currentPage.showVenue ? (
                            <VenueTeaser isVenue={isVenue} />
                          ) : null}
                        </div> */}
                        <div>{currentPage.showJobs ? <Jobs /> : null}</div>
                      </Col>
                      <Col className="xs-12 rg-4">
                        {isSpeaker ? <Speaker speaker={currentPage} /> : null}
                      </Col>
                    </Row>
                  </Container>
                )}
              </section>
            );
          case "default":
          default:
            return (
              <section
                className={loading ? "content content--loading" : "content"}
              >
                <Hero title={title} subTitle={subTitle} ctas={ctas} />
                <Container>
                  <Row>
                    <Col>
                      <p>{currentPage.lead}</p>
                      <div>
                        {currentPage.body ? (
                          <Markdown options={{ forceBlock: true }}>{currentPage.body}</Markdown>
                        ) : null}
                      </div>
                      <div>{currentPage.showNews ? <NewsSummary /> : null}</div>
                      <div>
                        {currentPage.showSpeakers || isHome ? (
                          <SpeakersList limit={isHome ? 6 : 0} />
                        ) : null}
                      </div>
                      {/* <div>
                        {currentPage.showVenue ? (
                          <VenueTeaser isVenue={isVenue} />
                        ) : null}
                      </div> */}
                      <div>{currentPage.showJobs ? <Jobs /> : null}</div>
                    </Col>
                  </Row>
                </Container>
              </section>
            );
        }
      }}
    </Query>
  );
});
