import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import Link from "next/link";
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
      }
    }
  }
`;

const Schedule = ({ filterTag }) => (
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
        if (filterTag) {
          talks = talks.filter(talk =>
            talk.tagsCollection.items.find(tag => tag.title === filterTag)
          );
        }

        // Create map of talks by day and time
        const scheduleMap = talks.reduce((acc, talk) => {
          // TODO: Remove year
          const day = dateFormatter.formatDate(talk.date, "dddd, D MMM (YYYY)");

          acc[day] = acc[day] || {
            title: day,
            sort: new Date(talk.date).getTime(),
            slots: []
          };
          acc[day].slots[talk.fromTime] = acc[day].slots[talk.fromTime] || {
            sort: parseInt(talk.fromTime.replace(/:/g, ""), 10),
            title: talk.fromTime,
            talks: []
          };
          acc[day].slots[talk.fromTime].talks.push(talk);

          return acc;
        }, {});

        // Build schedule by sorting data
        const schedule = Object.values(scheduleMap)
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

        return (
          <>
            {schedule.map((day, i) => (
              <div className="schedule__day">
                <h2 className="schedule__title">{day.title}</h2>
                <table className="schedule__slots" key={i}>
                  {day.slots.map((slot, ii) => (
                    <tr className="schedule__slot" key={ii}>
                      <th className="schedule__slot-time">{slot.title}</th>
                      {slot.talks.map((talk, iii) => (
                        <td
                          className="schedule__slot-talk"
                          key={iii}
                          colspan={slot.talks.length === 1 ? 2 : null}
                        >
                          {talk.speaker ? (
                            <Link
                              href={{
                                pathname: "/",
                                query: {
                                  category: "speakers",
                                  slug: talk.speaker.slug
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
                                    className={`schedule__item-title schedule__item-title--talk schedule__item-title--${
                                      talk.room
                                    }`}
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
                                className={`schedule__item-title schedule__item-title--${
                                  talk.room
                                }`}
                              >
                                {talk.title}
                              </span>
                              <span
                                className={`schedule__item-room schedule__item-room--${
                                  talk.room
                                }`}
                              >
                                {talk.room}
                              </span>
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </table>
              </div>
            ))}
          </>
        );
      }}
    </Query>
  </div>
);

Schedule.propTypes = {
  filterTag: PropTypes.string
};

Schedule.defaultProps = {
  filterTag: "FEC18"
};

export default Schedule;
