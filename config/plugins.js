module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env(
        "SENDGRID_API_KEY",
        "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"
      ),
    },
    settings: {
      defaultFrom: "jhonsebastianmora@gmail.com",
      defaultReplyTo: "jhonsebastianmora@gmail.com",
      testAddress: "jhonsebastianmora@gmail.com",
    },
  },
  // ...
});
