const Airtable = require("airtable");

const {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE,
  AIRTABLE_TABLE
} = require("../../secrets.json");

const fieldGroups = [
  {
    title: "Talk",
    description:
      "Please tell us about your presentation. Note: If your talk should be accepted, the provided info will be used to announce you as a speaker on the official Front channels (including conference website and booklet).",
    fields: [
      {
        name: "Title",
        type: "text",
        label: "What would be the title of your talk?",
        required: true
      },
      {
        name: "Summary",
        type: "textarea",
        label:
          "In 300 words or less, what is the audience going to learn from your talk?",
        required: true
      },
      {
        name: "Level",
        type: "select",
        options: ["Easy", "Intermediate", "Advanced"],
        label: "What's the level of difficulty of your talk?",
        required: true
      },
      {
        name: "Topic",
        type: "select",
        options: [
          "DESIGN",
          "TECHNOLOGY",
          "DESIGN meets TECH",
          "DESIGN Leadership",
          "TECH Leadership"
        ],
        label: "Which topic do you think fits best for your talk?",
        description:
          "This is just as a help for us to get an idea of how many tech, design, management and strategy, or cross-disciplinary talks we have.",
        required: true
      }
    ]
  },
  {
    title: "Personal info",
    description:
      "Please provide your personal info so we get an idea about who you are. (Info will also be used for the official channels.)",
    fields: [
      { name: "First name", type: "text", required: true },
      { name: "Last name", type: "text", required: true },
      { name: "Job title", type: "text", required: true },
      { name: "Company", type: "text" },
      {
        name: "Location",
        type: "text",
        label: "Where are you from?",
        description: "Please provide city and country.",
        required: true
      },
      {
        name: "Bio",
        type: "textarea",
        description: "Please provide a short biography. ",
        required: true
      },
      {
        name: "Photo",
        type: "file",
        description: "URL",
        description:
          "Please provide a link to a portrait of you. (Photos should be at least 800x800px and color)",
        required: true
      },
      {
        name: "Speaking experience",
        type: "textarea",
        label:
          "Have you spoken at any web technology/design conferences before?",
        description:
          "Please link to any video and/or slide set of a prior talk you’ve given",
        required: true
      },
      {
        name: "E-mail",
        type: "email",
        description:
          "We will not publish your email address. Other info might be used in the the official Front channels and/or conference materials.",
        required: true
      },
      { name: "Twitter", type: "text" },
      { name: "LinkedIn", type: "text" },
      { name: "Website", type: "text" },
      {
        name: "Notes",
        type: "textarea",
        description: "Anything you would like to add"
      }
    ]
  }
];

module.exports = async (req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.method === "POST") {
    console.log("Airtable submission", req.body);

    try {
      const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
        AIRTABLE_BASE
      );

      const fieldConfig = fieldGroups.reduce((acc, group) => {
        acc = acc.concat(group.fields);

        return acc;
      }, []);

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

      const message = "Thank you for the submission!";

      const response = JSON.stringify({
        message
      });

      return res.status(201).end(response);
    } catch (err) {
      const message = `We are very sorry, but something went wrong. Please submit your proposal via e-mail. Clicking <a href="mailto:thomas@frontconference.com?subject=Proposal&body=${encodeURIComponent(
        JSON.stringify(req.body)
      )}">this link</a> will pre-fill all the data you attempted to submit.`;

      const response = JSON.stringify({ message, body: req.body });

      console.log(err);

      return res.status(500).end(response);
    }
  }

  const response = JSON.stringify({
    fieldGroups
  });

  return res.end(response);
};
