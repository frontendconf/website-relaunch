import React from "react";
import ErrorMessage from "./ErrorMessage";
import SpeakersList from "./SpeakersList";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Markdown from "markdown-to-jsx";
import NewsSummary from "./NewsSummary";
import { Container, Row, Col } from "./shared/Grid";
import VenueTeaser from "./VenueTeaser";
import Jobs from "./Jobs";
import Hero from "./Hero";
import Speaker from "./Speaker";

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
      }
    }
  }
`;

class Content extends React.Component {
  constructor(props) {
    super(props);
    const { router: { query } } = props;
    this.query = query;
    this.state = { frameNumber: 0, seconds: 0 };
    this.myRef = React.createRef();
  }

// Use requestAnimationFrame for smooth playback
  movePlay() {
    this.myRef.current.currentTime = this.state.frameNumber;
    this.render();
  }

  mouseMove(event) {
    const frameNumber = this.myRef.current.duration * event.clientX / window.innerWidth;
    this.setState({ frameNumber });
  }


  componentDidMount() {
    this.interval = setInterval(() => this.movePlay(), 350);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // window.requestAnimationFrame(scrollPlay);

  render() {
    const slug = this.query.slug || "/";
    let template = "default";
    let category = this.query.category;
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

    // this.addEventListener('mousemove', scrollPlay);

    return (
      <Query query={dataQuery} variables={{ slug }}>
        {({ loading, error, data }) => {
          if (error) return <ErrorMessage message="Error loading pages."/>;

          // Destructuring needs to be done outside the arguments to prevent mapping errors
          const {
            collection: {
              items: [currentPage]
            }
          } = data;
          if (!currentPage) return <Hero title="404 Page not found"/>;

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
                  <Container>
                    <Row>
                      <Col className="xs-12 rg-8">
                        <h1 className="content__title">{currentPage.title}</h1>
                        <p>{currentPage.lead}</p>
                        <div>
                          {currentPage.body ? (
                            <Markdown>{currentPage.body}</Markdown>
                          ) : null}
                        </div>
                        <div>{currentPage.showNews ? <NewsSummary/> : null}</div>
                        <div>
                          {currentPage.showSpeakers || isHome ? (
                            <SpeakersList speakerLimit={isHome ? 6 : 0}/>
                          ) : null}
                        </div>
                        {/* <div>
                        {currentPage.showVenue ? (
                          <VenueTeaser isVenue={isVenue} />
                        ) : null}
                      </div> */}
                        <div>{currentPage.showJobs ? <Jobs/> : null}</div>
                      </Col>
                      <Col className="xs-12 rg-4">
                        {isSpeaker ? <Speaker speaker={currentPage}/> : null}
                      </Col>
                    </Row>
                  </Container>
                </section>
              );
            case "default":
            default:
              return (
                <section
                  onMouseMove={this.mouseMove.bind(this)}
                  onTouchMove={this.mouseMove.bind(this)}
                  className={loading ? "content content--loading" : "content"}
                >
                  <Hero title={title} subTitle={subTitle} ctas={ctas}/>
                  <Container>
                    <Row>
                      <Col>
                        <video width="100%" ref={this.myRef}>
                          <source type="video/mp4"
                                  src="/static/vortex.mp4"/>
                          <p>Sorry, your browser does not support the &lt;video&gt; element.</p>
                        </video>
                        <p>{currentPage.lead}</p>
                        <div>
                          {currentPage.body ? (
                            <Markdown>{currentPage.body}</Markdown>
                          ) : null}
                        </div>
                        <div>{currentPage.showNews ? <NewsSummary/> : null}</div>
                        <div>
                          {currentPage.showSpeakers || isHome ? (
                            <SpeakersList speakerLimit={isHome ? 6 : 0}/>
                          ) : null}
                        </div>
                        {/* <div>
                        {currentPage.showVenue ? (
                          <VenueTeaser isVenue={isVenue} />
                        ) : null}
                      </div> */}
                        <div>{currentPage.showJobs ? <Jobs/> : null}</div>
                      </Col>
                    </Row>
                  </Container>
                </section>
              );
          }
        }}
      </Query>
    );
  }
};

export default withRouter(Content);
