const Airtable = require("airtable");

module.exports = async (req, res) => {
  res.setHeader("content-type", "application/json");

  // Handle missing airtable env variables
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE) {
    const response = JSON.stringify({
      message: `Application error: Could not find Airtable API key.`
    });

    return res.status(500).end(response);
  }

  const fieldGroups = {
    "Call for Speakers": [
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
            // name: "Photo",
            // type: "file",
            name: "Photo URL",
            type: "text",
            description:
              "Please provide a link to a portrait of you. Min 512x512 px, color, entire head visible, indoor photo preferred.",
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
    ],
    "Invited Speakers": [
      {
        title: "About yourself",
        description:
          "Please tell us about yourself. We will use the information on our website and other communication channels to promote your talk.",
        fields: [
          { name: "Name", type: "text", required: true },
          { name: "Title / Role", type: "text", required: true },
          { name: "Website", type: "text" },
          { name: "Twitter", type: "text" },
          { name: "LinkedIn", type: "text" },
          {
            // name: "Photo",
            // type: "file",
            name: "Photo URL",
            type: "text",
            description:
              "Please provide a link to a portrait of you. Min 512x512 px, color, entire head visible, indoor photo preferred.",
            required: true
          },
          { name: "Bio", type: "textarea", required: true }
        ]
      },
      {
        title: "Your talk",
        description:
          "Please tell us about your talk. We will use the information on our website and other communication channels to promote your talk.",
        fields: [
          { name: "Title", type: "text", required: true },
          {
            name: "Short Abstract",
            type: "textarea",
            description: "Max 280 characters",
            required: true
          },
          { name: "Longer Description", type: "textarea", required: true },
          { name: "Intended Audience", type: "text", required: true },
          { name: "Tags", type: "text" }
        ]
      },
      {
        title: "Payment Details",
        description: `Please let us know your bank account details - we will use it to transfer your honorarium after the conference. If you prefer to send us an invoice after the event, that's totally fine too, and these would be our details (no worries, we will send it to you again later in an extensive pre-conference briefing):
  
  Frontend Conference Association, 8000 Zürich
          VAT Number: CHE-451.696.052`,
        fields: [
          {
            name: "Bank Account",
            type: "text",
            description: "Full name, IBAN, address (at least city and zip).",
            required: true
          }
        ]
      }
    ],
    Workshops: [
      {
        title: "About yourself",
        description:
          "Please tell us about yourself. We will use the information on our website and other communication channels to promote your talk.",
        fields: [
          { name: "Name", type: "text", required: true },
          { name: "Title / Role", type: "text", required: true },
          { name: "Website", type: "text" },
          { name: "Twitter", type: "text" },
          { name: "LinkedIn", type: "text" },
          {
            // name: "Photo",
            // type: "file",
            name: "Photo URL",
            type: "text",
            description:
              "Please provide a link to a portrait of you. Min 512x512 px, color, entire head visible, indoor photo preferred.",
            required: true
          },
          { name: "Bio", type: "textarea", required: true }
        ]
      },
      {
        title: "Your workshop",
        description: "Please tell us about your workshop.",
        fields: [
          { name: "Title", type: "text", required: true },
          {
            name: "Short Abstract",
            type: "textarea",
            description: "Max 280 characters",
            required: true
          },
          { name: "Longer Description", type: "textarea", required: true },
          {
            name: "Learning Outcomes",
            type: "textarea",
            description: "What will attendees learn.",
            required: true
          },
          { name: "Methodology", type: "text", required: true },
          { name: "Intended Audience", type: "text", required: true },
          { name: "Tags", type: "text" },
          {
            name: "Material Attendees",
            type: "textarea",
            description: "What will the attendees need to bring.",
            required: true
          },
          {
            name: "Material Organization",
            type: "textarea",
            description: "Material / equipment you will need us to organize.",
            required: true
          },
          { name: "Comments", type: "textarea" }
        ]
      },
      {
        title: "Payment Details",
        description: `Please let us know your bank account details - we will use it to transfer your honorarium after the conference. If you prefer to send us an invoice after the event, that's totally fine too, and these would be our details (no worries, we will send it to you again later in an extensive pre-conference briefing):<br><br>
  Frontend Conference Association, 8000 Zürich<br>
  VAT Number: CHE-451.696.052`,
        fields: [
          {
            name: "Bank Account",
            type: "text",
            description: "Full name, IBAN, address (at least city and zip).",
            required: true
          }
        ]
      }
    ]
  };

  const table = req.query.table || "Call for Speakers";

  if (req.method === "POST") {
    console.log("Airtable submission", req.body);

    try {
      const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
        process.env.AIRTABLE_BASE
      );

      const fieldConfig = fieldGroups[table].reduce((acc, group) => {
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
      await base(table).create([
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
      const message = `We are very sorry, but something went wrong. Please try again. If it still doesn't work, you can submit your proposal via e-mail. Clicking <a href="mailto:thomas@frontconference.com?subject=Proposal&body=${encodeURIComponent(
        JSON.stringify(req.body)
      )}">this link</a> will create a message with the data you already entered into the form below.`;

      const response = JSON.stringify({ message, body: req.body });

      console.log(err);

      return res.status(500).end(response);
    }
  }

  const response = JSON.stringify({
    fieldGroups: fieldGroups[table]
  });

  return res.end(response);
};
