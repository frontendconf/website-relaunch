const Airtable = require("airtable");

const {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE,
  AIRTABLE_TABLE
} = require("../../secrets.json");

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

const fieldConfig = [
  { name: "Title", type: "text" },
  { name: "Summary", type: "textarea" },
  {
    name: "Level",
    type: "select",
    options: ["Easy", "Intermediate", "Advanced"]
  },
  {
    name: "Topic",
    type: "select",
    options: [
      "Tech",
      "Design and/or UX",
      "Management and/or strategy",
      "Cross-disciplinary",
      "Other"
    ]
  },
  { name: "First name", type: "text" },
  { name: "Last name", type: "text" },
  { name: "Job title", type: "text" },
  { name: "Company", type: "text" },
  { name: "Country", type: "text" },
  { name: "Bio", type: "textarea" },
  { name: "Photo", type: "file", description: "URL" },
  { name: "Experience", type: "checkbox", value: "true" },
  { name: "Experience details", type: "textarea" },
  { name: "E-mail", type: "email" },
  { name: "Twitter", type: "text" },
  { name: "LinkedIn", type: "text" },
  { name: "Website", type: "text" },
  { name: "Notes", type: "textarea" }
];

module.exports = async (req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.method === "POST") {
    try {
      const fields = Object.entries(req.body).reduce((acc, [key, value]) => {
        if (value) {
          const config = fieldConfig.find(field => field.name === key);

          if (!config) {
            return acc;
          }

          if (config.type === "file") {
            acc[key] = [{ url: value }];
          } else {
            acc[key] = value;
          }
        }

        return acc;
      }, {});

      // Save to Airtable
      await base(AIRTABLE_TABLE).create([
        {
          fields
        }
      ]);

      const response = JSON.stringify({
        message: "Thank you for the submission!"
      });

      return res.status(201).end(response);
    } catch (err) {
      const response = JSON.stringify({ message: err.message, body: req.body });

      console.log(err);

      return res.status(500).end(response);
    }
  }

  const response = JSON.stringify({
    fields: fieldConfig
  });

  return res.end(response);
};
