import {defineFunction, secret} from "@aws-amplify/backend";

export const planTrip = defineFunction({
    name: "Plan-trip",
    entry: "./handler.ts",
    timeoutSeconds: 30,
    environment: {
        GROQ_API_KEY: secret("GROQ_API_KEY"),

    },

})