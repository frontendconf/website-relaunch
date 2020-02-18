import { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { withRouter } from "next/router";
import Link from "next/link";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import Image from "./Image";
import dateFormatter from "../lib/dateFormatter";

const scheduleQuery = gql`
  query talks($limit: Int) {
    collection: talkCollection(limit: $limit) {
      items {
        title
        date
        fromTime
        toTime
        room
        speaker {
          slug
          name
          photo {
            url(transform: { width: 60, height: 60, resizeStrategy: FILL })
          }
        }
        tagsCollection(limit: 20) {
          items {
            title
          }
        }
        detailPage {
          slug
        }
      }
    }
  }
`;

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: -1
    };
  }

  componentDidMount() {
    if (!window.localStorage) {
      return;
    }

    const storedTab = parseInt(localStorage.getItem("scheduleTab") || 0, 10);

    if (storedTab) {
      this.setState({
        activeTab: storedTab
      });
    }
  }

  // Persist to both URL and localStorage
  onTabChange(index) {
    const { slug } = this.props.router.query;
    const day = index + 1;

    this.props.router.replace(
      {
        pathname: "/",
        query: { slug, day }
      },
      `/${slug}?day=${day}`,
      {
        shallow: true
      }
    );

    if (window.localStorage) {
      localStorage.setItem("scheduleTab", index);
    }

    this.setState({
      activeTab: index
    });
  }

  render() {
    return (
      <div className="schedule">
        <Query query={scheduleQuery}>
          {({ loading, error, data }) => {
            if (error) return <ErrorMessage message="Error loading schedule" />;
            if (loading) return <div>Loading</div>;

            // Destructuring needs to be done outside the arguments to prevent mapping errors
            let {
              collection: { items: talks }
            } = data;

            // Filter by tag
            if (this.props.filterTag) {
              talks = talks.filter(talk =>
                talk.tagsCollection.items.find(
                  tag => tag.title === this.props.filterTag
                )
              );
            }

            // Create map of talks by day and time
            const scheduleMap = talks.reduce((acc, talk) => {
              const day = dateFormatter.formatDate(talk.date, "dddd, D MMM");

              acc[day] = acc[day] || {
                title: day,
                sort: new Date(talk.date).getTime(),
                slots: []
              };

              if (talk.fromTime) {
                acc[day].slots[talk.fromTime] = acc[day].slots[
                  talk.fromTime
                ] || {
                  sort: parseInt(talk.fromTime.replace(/[^0-9.]/g, ""), 10),
                  title: talk.fromTime,
                  talks: []
                };
                acc[day].slots[talk.fromTime].talks.push(talk);
              }

              return acc;
            }, {});

            // Build schedule by sorting data
            const schedule = Object.values(scheduleMap)
              .filter(data => data.title)
              .map(data => {
                data.slots = Object.values(data.slots)
                  .sort((a, b) => a.sort - b.sort)
                  .map(slot => {
                    // TODO: Figure out whether the sorting order is correct
                    slot.talks = slot.talks.sort(
                      (a, b) => a.room.charCodeAt(0) - b.room.charCodeAt(0)
                    );

                    return slot;
                  });

                return data;
              })
              .sort((a, b) => a.sort - b.sort);

            // Select active tab, either via URL or localStorage or current date
            const queryTab = parseInt(this.props.router.query.day || 1, 10) - 1;
            const currentDayTab = schedule.findIndex(
              day =>
                day.title ===
                dateFormatter.formatDate(new Date(), "dddd, D MMM")
            );
            const activeTab = this.props.router.query.day
              ? queryTab
              : this.state.activeTab > -1
              ? this.state.activeTab
              : currentDayTab;

            return (
              <Tabs
                className="schedule__tabs"
                index={activeTab}
                onChange={index => this.onTabChange(index)}
              >
                <TabList className="schedule__tablist">
                  {schedule.map((day, i) => (
                    <Tab key={i} className="schedule__tablist-item">
                      {day.title}
                    </Tab>
                  ))}
                </TabList>
                <ul className="schedule__legend" role="presentation">
                  <li className="schedule__legend-item schedule__legend-item--Folium">
                    Lower floor
                  </li>
                  <li className="schedule__legend-item schedule__legend-item--Papiersaal">
                    Upper floor
                  </li>
                </ul>
                <TabPanels className="schedule__tabpanels">
                  {schedule.map((day, i) => (
                    <TabPanel key={i}>
                      <div className="schedule__day">
                        <h2 className="schedule__title visuallyhidden">
                          {day.title}
                        </h2>
                        <table className="schedule__slots">
                          <tbody>
                            {day.slots.map((slot, ii) => (
                              <tr
                                className="schedule__slot"
                                key={ii}
                                role="row"
                              >
                                <th
                                  className="schedule__slot-time"
                                  role="rowheader"
                                >
                                  {slot.title}
                                </th>
                                {slot.talks.map((talk, iii) => (
                                  <td
                                    className="schedule__slot-talk"
                                    key={iii}
                                    colSpan={slot.talks.length === 1 ? 2 : null}
                                    role="column"
                                  >
                                    {talk.speaker ? (
                                      <Link
                                        href={{
                                          pathname: "/",
                                          query: {
                                            category: "speakers",
                                            slug: talk.speaker.slug,
                                            referrer: "schedule"
                                          }
                                        }}
                                        as={`/speakers/${talk.speaker.slug}`}
                                      >
                                        <a className="schedule__item">
                                          <Image
                                            className="schedule__item-photo"
                                            src={`${talk.speaker.photo.url}`}
                                          />
                                          <span className="schedule__item-content">
                                            <span
                                              className={`schedule__item-title schedule__item-title--talk schedule__item-title--${talk.room}`}
                                            >
                                              {talk.speaker.name}
                                            </span>
                                            <span className="schedule__item-talk">
                                              {talk.title}
                                            </span>
                                          </span>
                                        </a>
                                      </Link>
                                    ) : (
                                      <span className="schedule__item">
                                        <span
                                          className={`schedule__item-title schedule__item-title--${talk.room}`}
                                        >
                                          {talk.detailPage ? (
                                            <Link
                                              href={{
                                                pathname: "/",
                                                query: {
                                                  slug: talk.detailPage.slug
                                                }
                                              }}
                                              as={`/${talk.detailPage.slug}`}
                                            >
                                              <a className="schedule__item-title schedule__item-title--custom">
                                                {talk.title}
                                              </a>
                                            </Link>
                                          ) : (
                                            talk.title
                                          )}
                                        </span>
                                        <span
                                          className={`schedule__item-room schedule__item-room--${talk.room}`}
                                        >
                                          {talk.room}
                                        </span>
                                      </span>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            );
          }}
        </Query>
      </div>
    );
  }
}

Schedule.propTypes = {
  filterTag: PropTypes.string
};

Schedule.defaultProps = {
  filterTag: "FRONT20"
};

export default withRouter(Schedule);
