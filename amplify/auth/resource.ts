import { defineAuth } from '@aws-amplify/backend';


export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Welcome to Travel Planner',
      verificationEmailBody: (createCode) => 
          `Your verification code is for Travel Planner: ${createCode()}`,
    },
  },
});
