import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "etshyk9u",
  dataset: "production",
  apiVersion: "2025-3-20",
  useCdn: false,
});
