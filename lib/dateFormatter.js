import fecha from "fecha";

function getUtcString(timestamp) {
  const date = new Date(timestamp);
  const utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  return utc;
}

function formatDate(timestamp, format = "D MMM YYYY") {
  return timestamp ? fecha.format(getUtcString(timestamp), format) : null;
}

function formatTime(timestamp, format = "shortTime") {
  return timestamp ? fecha.format(getUtcString(timestamp), format) : null;
}

function formatYear(timestamp, format = "YY") {
  return timestamp ? fecha.format(getUtcString(timestamp), format) : null;
}

export default {
  parse: fecha.parse,
  format: fecha.format,
  formatDate,
  formatTime,
  formatYear
};
