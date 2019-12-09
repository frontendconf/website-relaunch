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
    fields: [
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
      { name: "Photo", type: "file" },
      { name: "Experience", type: "checkbox", value: "true" },
      { name: "Experience details", type: "textarea" },
      { name: "E-mail", type: "email" },
      { name: "Twitter", type: "text" },
      { name: "LinkedIn", type: "text" },
      { name: "Website", type: "text" },
      { name: "Notes", type: "textarea" }
    ]
  });

  return res.end(response);
};
