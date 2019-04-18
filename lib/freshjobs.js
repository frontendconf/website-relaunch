const fetch = require("isomorphic-unfetch");
const { parseString } = require("xml2js");
const { promisify } = require("util");

const API = "https://freshjobs.ch/customfeed/frontendconf";

async function getJobs() {
  try {
    const response = await fetch(API);
    const xml = await response.text();
    const data = await promisify(parseString)(xml);

    const jobs = data.rss.channel[0].item.map(job => ({
      title: job.title,
      company: job.jobcompany,
      link: job.link
    }));

    return jobs;
  } catch (err) {
    return [];
  }
}

module.exports = {
  API,
  getJobs
};
