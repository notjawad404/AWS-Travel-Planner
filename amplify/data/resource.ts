import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { planTrip } from '../functions/plan-trip/resource';

const schema = a.schema({
  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

  askTrip: a
    .query()
    .arguments({ interests: a.string().array() })
    .returns(a.ref('BedrockResponse'))
    .authorization((allow) => [allow.authenticated()])

    // Bedrock function integration

    // .handler(
    //   a.handler.custom({ entry: "./bedrock.js", dataSource: "BedrockDataSource" })
    // ),

    // AWS Lambda function integration
    .handler(a.handler.function(planTrip)),
})

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
});