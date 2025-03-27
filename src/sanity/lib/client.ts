import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "etshyk9u",
  dataset: "production",

  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
