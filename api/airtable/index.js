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

  const defaultFieldGroups = [
    {
      title: "Speaking Experience",
      description:
        "Please link to any video of a prior talk you've given. If there is no video available we need another way of assessing your presentation skills, e.g. by an experienced speaker vouching for you. If you don't have any speaking experience we would love for you to apply for our <a href='/call-for-speakers-bootcamp-application'>Speakers Bootcamp</a>!",
      fields: [
        {
          name: "Speaking Experience",
          type: "textarea",
          required: true
        }
      ],
      cfsOnly: true
    },
    {
      title: "Talk",
      description: "Please tell us about your presentation.",
      fields: [
        {
          name: "Talk Title",
          type: "text",
          required: true
        },
        {
          name: "Talk Details",
          type: "textarea",
          description:
            "What is your talk about and what is the audience going to learn?",
          required: true,
          maxLength: 1000
        },
        {
          name: "Talk Abstract",
          type: "textarea",
          description: "How can the talk details be summarized.",
          required: true,
          maxLength: 250
        }
      ]
    },
    {
      title: "Personal Information",
      description:
        "Please provide some personal information so we get an idea about who you are.",
      fields: [
        { name: "Name", type: "text", required: true },
        {
          name: "Location",
          type: "text",
          description: "City and country",
          required: true
        },
        {
          name: "Biography",
          type: "textarea",
          label: "Biography",
          description:
            "What is your professional background? What would the audience need to know about you?",
          required: true,
          maxLength: 1000
        },
        {
          name: "Email",
          type: "email",
          description:
            "We will use this email address to communicate with you.",
          required: true
        }
      ]
    }
  ];
  const fieldGroups = {
    "Call for Speakers": defaultFieldGroups,
    "Speakers Bootcamp": defaultFieldGroups
      .filter(group => !group.cfsOnly)
      .map(group => ({
        ...group,
        fields: group.fields.filter(field => !field.cfsOnly)
      }))
  };

  const defaultHiddenFields = [
    { name: "Call for Speakers", value: "true", type: "hidden" }
  ];
  const hiddenFields = {
    "Call for Speakers": defaultHiddenFields,
    "Speakers Bootcamp": defaultHiddenFields.concat([
      { name: "Bootcamp", value: "true", type: "hidden" }
    ])
  };

  const { id } = req.query;

  if (req.method === "POST") {
    console.log("Airtable submission (raw data):", req.body);

    try {
      const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
        process.env.AIRTABLE_BASE
      );

      const fieldConfigs = fieldGroups[id]
        .reduce((acc, group) => {
          acc = acc.concat(group.fields);

          return acc;
        }, [])
        .concat(hiddenFields[id]);

      const data = Object.entries(req.body).reduce((acc, [key, value]) => {
        if (value) {
          const fieldConfig = fieldConfigs.find(field => field.name === key);

          if (!fieldConfig) {
            return acc;
          }

          acc[key] = value;
        }

        return acc;
      }, {});

      console.log("Airtable submission (data):", data);

      // Save to Airtable
      await base("Speakers").create([
        {
          fields: data
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
    fieldGroups: fieldGroups[id],
    hiddenFields: hiddenFields[id]
  });

  return res.end(response);
};
