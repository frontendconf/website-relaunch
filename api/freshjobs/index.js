const { getJobs } = require("../../lib/freshjobs");

module.exports = async (req, res) => {
  const jobs = await getJobs();
  const response = JSON.stringify(jobs);

  res.setHeader("content-type", "application/json");

  return res.end(response);
};
