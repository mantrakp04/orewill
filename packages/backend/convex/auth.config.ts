import { getConvexProvidersConfig } from "@stackframe/react";

export default {
  providers: getConvexProvidersConfig({
    projectId: process.env.STACK_AUTH_PROJECT_ID!
  }),
}
