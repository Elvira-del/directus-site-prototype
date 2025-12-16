import { createDirectus, rest, authentication } from "@directus/sdk";

const client = createDirectus(process.env.NEXT_PUBLIC_BACKEND_URL as string)
  .with(authentication("json"))
  .with(
    rest({
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  );

export default client;
