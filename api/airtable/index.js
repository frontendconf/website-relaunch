var Airtable = require("airtable");

const {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE,
  AIRTABLE_TABLE
} = require("../../secrets.json");

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

module.exports = async (req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.method === "POST") {
    try {
      await base(AIRTABLE_TABLE).create([
        {
          fields: req.body
        }
      ]);

      const response = JSON.stringify({ success: true });

      return res.status(201).end(response);
    } catch (err) {
      const response = JSON.stringify({ message: err.message, body: req.body });

      console.log(err);

      return res.status(500).end(response);
    }
  }

  const response = JSON.stringify({
    message: "Nothing to see here"
  });

  return res.end(response);
};
