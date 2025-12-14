import { createDirectus, rest, authentication } from "@directus/sdk";
import { Schema } from "@/types/api.types";

const client = createDirectus<Schema>(process.env.NEXT_PUBLIC_BACKEND_URL as string)
  .with(authentication("json"))
  .with(
    rest({
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  );

export default client;
