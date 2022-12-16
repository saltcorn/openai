const Workflow = require("@saltcorn/data/models/workflow");
const Form = require("@saltcorn/data/models/form");
const { Configuration, OpenAIApi } = require("openai");

const configuration_workflow = () =>
  new Workflow({
    steps: [
      {
        name: "API key",
        form: async (context) => {
          return new Form({
            fields: [
              {
                name: "api_key",
                label: "API key",
                sublabel: "From your OpenAI account",
                type: "String",
              },
            ],
          });
        },
      },
    ],
  });

const functions = ({ api_key }) => ({
  gpt_generate: {
    run: async (prompt) => {
      const configuration = new Configuration({
        apiKey: api_key,
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Hello world",
      });
      return completion;
    },
    isAsync: true,
    description: "Generate text with GPT",
    arguments: [{ name: "prompt", type: "String" }],
  },
});
module.exports = {
  sc_plugin_api_version: 1,
  configuration_workflow,
  functions,
};
