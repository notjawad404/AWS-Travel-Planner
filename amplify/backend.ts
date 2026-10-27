import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

// Bedrock DataSource Integration 

// import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

// AWS Lambda function integration

import {planTrip} from './functions/plan-trip/resource';

const backend = defineBackend({
  auth,
  data,
  planTrip,
});

// Bedrock DataSource Integration

// const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
//   'BedrockDataSource',
//   'https://bedrock-runtime.us-east-1.amazonaws.com',
//   {
//     authorizationConfig: {
//       signingRegion: 'us-east-1',
//       signingServiceName: 'bedrock',
//     },
//   }
// );

// bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
//   new PolicyStatement({
//     resources: ['arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0'],
//     actions: ['bedrock:InvokeModel'],
//   })
// );

